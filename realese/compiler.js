const fs = require('fs');
const crypto = require('crypto');
const { encdata } = require('./crypto.js');
const { getFridaHash, getByaHash } = require('./hash.js');
const { generateOrbusStub, deriveKey } = require('./orbus.js');

function bfridobf(tpath) {
  try {
    if (!fs.existsSync(tpath)) {
      throw new Error(`cannot find script: ${tpath}`);
    }
    
    const magic = Buffer.from('LIBSMETA_OK', 'utf8');
    const stext = fs.readFileSync(tpath, 'utf8');
    const dbuf = Buffer.concat([magic, Buffer.from(stext, 'utf8')]);
    
    const okey = crypto.randomBytes(32).toString('hex');
    const fridahash = getFridaHash(stext);
    const byahash = getByaHash(okey);
    
    const trueKeyArr = deriveKey(okey, fridahash, byahash);
    const eArr = encdata(dbuf, trueKeyArr);
    
    const scode = generateOrbusStub(eArr, okey, fridahash, byahash);

    const dpath = tpath.replace(/\.js$/, '') + '.obf.js';
    fs.writeFileSync(dpath, scode);
    
    console.log('[*] build success');
    console.log(`[*] out file: ${dpath}`);
    
  } catch (err) {
    console.error('[-] build failed:', err.message);
    process.exit(1);
  }
}

module.exports = { bfridobf };
