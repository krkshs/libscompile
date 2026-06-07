const acorn = require('acorn');
const { generate } = require('astring');

const globals = new Set([
  'console', 'Process', 'Memory', 'Interceptor', 'Module', 'NativeFunction', 'NativeCallback', 
  'ptr', 'require', 'module', 'exports', 'Buffer', 'Array', 'String', 'Object', 'Function', 
  'Math', 'JSON', 'undefined', 'null', 'NaN', 'Error', 'Uint8Array', 'Int32Array', 
  'Int16Array', 'Uint16Array', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'
]);

function obfast(code, seed) {
    const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script' });

    let nameMap = new Map();
    let counter = 0;

    let seedInt = 0;
    for (let i = 0; i < seed.length; i++) {
        seedInt = (seedInt + seed.charCodeAt(i)) % 100000;
    }

    function randomHex() {
        seedInt = (seedInt * 9301 + 49297) % 233280;
        let val = Math.floor((seedInt / 233280) * 16777215);
        return '_0x' + val.toString(16).padStart(6, '0');
    }

    function collectIdentifiers(node) {
        if (!node || typeof node !== 'object') return;
        
        if (node.type === 'VariableDeclarator' && node.id.type === 'Identifier') {
            if (!globals.has(node.id.name) && !nameMap.has(node.id.name)) {
                nameMap.set(node.id.name, randomHex() + (counter++));
            }
        }
        if (node.type === 'FunctionDeclaration' && node.id && node.id.type === 'Identifier') {
            if (!globals.has(node.id.name) && !nameMap.has(node.id.name)) {
                nameMap.set(node.id.name, randomHex() + (counter++));
            }
        }
        if ((node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') && node.params) {
            for (let p of node.params) {
                if (p.type === 'Identifier' && !globals.has(p.name) && !nameMap.has(p.name)) {
                    nameMap.set(p.name, randomHex() + (counter++));
                }
            }
        }

        for (let key in node) {
            if (key !== 'type' && key !== 'start' && key !== 'end') {
                if (Array.isArray(node[key])) {
                    node[key].forEach(n => collectIdentifiers(n));
                } else {
                    collectIdentifiers(node[key]);
                }
            }
        }
    }

    collectIdentifiers(ast);

    let strings = [];
    
    function transform(node, parent, parentKey) {
        if (!node || typeof node !== 'object') return;

        if (node.type === 'MemberExpression') {
            transform(node.object, node, 'object');
            if (node.computed) {
                transform(node.property, node, 'property');
            }
            return;
        }

        if (node.type === 'Property') {
            if (node.computed) {
                transform(node.key, node, 'key');
            }
            transform(node.value, node, 'value');
            return;
        }

        if (node.type === 'Identifier') {
            if (nameMap.has(node.name)) {
                node.name = nameMap.get(node.name);
            }
        }

        if (node.type === 'Literal' && typeof node.value === 'string') {
             if (node.value === 'use strict') return;
             if (node.value === 'LIBSMETA_OK') return; // Do not touch magic

             let hex = Buffer.from(node.value).toString('hex');
             let index = strings.indexOf(hex);
             if (index === -1) {
                 strings.push(hex);
                 index = strings.length - 1;
             }
             
             if (parent && parentKey) {
                 parent[parentKey] = {
                     type: 'CallExpression',
                     callee: { type: 'Identifier', name: '_0xdec' },
                     arguments: [{ type: 'Literal', value: index }]
                 };
             }
        }

        for (let key in node) {
            if (key !== 'type' && key !== 'start' && key !== 'end') {
                if (Array.isArray(node[key])) {
                    node[key].forEach((n, i) => transform(n, node[key], i));
                } else {
                    transform(node[key], node, key);
                }
            }
        }
    }

    transform(ast, null, null);

    let stringArrayNode = acorn.parse(`
        const _0xstrs = ${JSON.stringify(strings)};
        function _0xdec(index) {
            let hex = _0xstrs[index];
            let str = '';
            for (let i = 0; i < hex.length; i += 2) {
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return str;
        }
    `, { ecmaVersion: 'latest' });

    ast.body = [...stringArrayNode.body, ...ast.body];

    const out = generate(ast, { indent: '  ', lineEnd: '\n' });
    return out;
}

module.exports = { obfast };
