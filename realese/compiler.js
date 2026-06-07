const fs = require('fs');
const crypto = require('crypto');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { fhash, bhash } = require('./hash.js');

function bfridobf(tpath) {
  try {
    if (!fs.existsSync(tpath)) {
      throw new Error(`cannot find script: ${tpath}`);
    }
    
    const stext = fs.readFileSync(tpath, 'utf8');
    
    const okey = crypto.randomBytes(32).toString('hex');
    const fridahash = fhash(stext);
    const byahash = bhash(okey);
    
    const payload = `
      var _fH = "${fridahash}";
      var _bH = "${byahash}";
      var _magic = "LIBSMETA_OK";
      ${stext}
    `;

    const obfuscationResult = JavaScriptObfuscator.obfuscate(payload, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
        seed: okey 
    });
    
    // To ensure okey string works as a seed, wait, let's just use string since docs say "number or string"

    const scode = `// by obf @krkshs\n// libscompile 0.1.3(2)\n${obfuscationResult.getObfuscatedCode()}`;

    const dpath = tpath.replace(/\.js$/, '') + '.obf.js';
    fs.writeFileSync(dpath, scode);
    
    console.log('[*] build success');
    console.log(`[*] session key: ${okey}`);
    console.log(`[*] byahash: ${byahash}`);
    console.log(`[*] fridahash: ${fridahash}`);
    console.log(`[*] out file: ${dpath}`);
    
  } catch (err) {
    console.error('[-] build failed:', err.message);
    process.exit(1);
  }
}

module.exports = { bfridobf };
