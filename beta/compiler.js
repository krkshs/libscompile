const fs = require('fs');
const crypto = require('crypto');
const { encdata } = require('./crypto.js');
const { getFridaHash, getByaHash } = require('./hash.js');
const { generateOrbusStub, TG_LINK } = require('./orbus.js');

function bfridobf(tpath) {
  try {
    if (!fs.existsSync(tpath)) {
      throw new Error(`cannot find script: ${tpath}`);
    }
    
    //read script bytes
    const magic = Buffer.from('LIBSMETA_OK', 'utf8');
    const stext = fs.readFileSync(tpath, 'utf8');
    const dbuf = Buffer.concat([magic, Buffer.from(stext, 'utf8')]);
    
    //gen crypto base key
    const okey = crypto.randomBytes(32).toString('hex');
    
    //generate Orbus System Hashes
    const fridahash = getFridaHash(stext);
    const byahash = getByaHash(okey);
    
    // Derived true key: okey + fridahash + byahash + TG_LINK
    const trueKey = okey + fridahash + byahash + TG_LINK;
    
    // encrypt with the true key
    const eArr = encdata(dbuf, trueKey);
    
    // generate the Orbus runtime stub
    const scode = generateOrbusStub(eArr, okey, fridahash, byahash);

    //flush to disk
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
