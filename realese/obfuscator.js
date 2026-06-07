const acorn = require('acorn');
const { generate } = require('astring');

const globals = new Set([
  'console', 'Process', 'Memory', 'Interceptor', 'Module', 'NativeFunction', 'NativeCallback', 
  'ptr', 'NULL', 'require', 'module', 'exports', 'Buffer', 'Array', 'String', 'Object', 'Function', 
  'Math', 'JSON', 'undefined', 'null', 'NaN', 'Error', 'Uint8Array', 'Int32Array', 
  'Int16Array', 'Uint16Array', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval',
  'Java', 'ObjC', 'send', 'recv', 'rpc', 'Number', 'Boolean', 'Date', 'RegExp', 'Map', 'Set', 'Promise', 'Symbol'
]);

function obfast(code, seed) {
    const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script' });

    let nmap = new Map();
    let cnt = 0;

    let sint = 0;
    for (let i = 0; i < seed.length; i++) {
        sint = (sint + seed.charCodeAt(i)) % 100000;
    }

    function rndmhex() {
        sint = (sint * 9301 + 49297) % 233280;
        let val = Math.floor((sint / 233280) * 16777215);
        return '_0x' + val.toString(16).padStart(6, '0');
    }

    let strs = [];
    
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
            if (!globals.has(node.name)) {
                if (!nmap.has(node.name)) {
                    nmap.set(node.name, rndmhex() + (cnt++));
                }
                node.name = nmap.get(node.name);
            }
        }

        if (node.type === 'Literal') {
             if (typeof node.value === 'string') {
                 if (node.value === 'use strict') return;
                 if (node.value === 'LIBSMETA_OK') return;

                 let hex = Buffer.from(node.value).toString('hex');
                 let idx = strs.indexOf(hex);
                 if (idx === -1) {
                     strs.push(hex);
                     idx = strs.length - 1;
                 }
                 
                 if (parent && parentKey !== undefined && parentKey !== null) {
                     parent[parentKey] = {
                         type: 'CallExpression',
                         callee: { type: 'Identifier', name: '_0xdec' },
                         arguments: [{ type: 'Literal', value: idx }]
                     };
                 }
                 return;
             } else if (typeof node.value === 'number') {
                 if (Number.isInteger(node.value)) {
                     node.raw = (node.value < 0 ? '-0x' : '0x') + Math.abs(node.value).toString(16);
                 }
             }
        }

        for (let key in node) {
            if (key !== 'type' && key !== 'start' && key !== 'end' && key !== 'raw') {
                if (Array.isArray(node[key])) {
                    node[key].forEach((n, i) => transform(n, node[key], i));
                } else {
                    transform(node[key], node, key);
                }
            }
        }
    }

    transform(ast, null, null);

    let strnode = acorn.parse(`
        const _0xstrs = ${JSON.stringify(strs)};
        function _0xdec(idx) {
            let hex = _0xstrs[idx];
            let str = '';
            for (let i = 0; i < hex.length; i += 2) {
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return str;
        }
    `, { ecmaVersion: 'latest' });

    ast.body = [...strnode.body, ...ast.body];

    const out = generate(ast, { indent: '  ', lineEnd: '\n' });
    return out;
}

module.exports = { obfast };
