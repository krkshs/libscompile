const fs = require('fs');
const crypto = require('crypto');
const JavaScriptObfuscator = require('javascript-obfuscator');

//core rc4 cipher stream
function gstream(khex, olen) {
  const sbox = Array.from({ length: 256 }, (_, i) => i);
  let mx = 0;
  for (let i = 0; i < 256; i++) {
    mx = (mx + sbox[i] + khex.charCodeAt(i % khex.length)) % 256;
    [sbox[i], sbox[mx]] = [sbox[mx], sbox[i]];
  }
  
  let i = 0, j = 0;
  const strm = [];
  for (let n = 0; n < olen; n++) {
    i = (i + 1) % 256;
    j = (j + sbox[i]) % 256;
    [sbox[i], sbox[j]] = [sbox[j], sbox[i]];
    strm.push(sbox[(sbox[i] + sbox[j]) % 256]);
  }
  return strm;
}

//encrypt payload
function encdata(rbuf, kstr) {
  const cbytes = gstream(kstr, rbuf.length);
  const p = [];
  for (let i = 0; i < rbuf.length; i++) {
    p.push(rbuf[i] ^ cbytes[i]);
  }
  return p;
}

//process file routine
function bfridobf(tpath) {
  try {
    if (!fs.existsSync(tpath)) {
      throw new Error(`cannot find script: ${tpath}`);
    }
    
    //read script bytes
    const magic = Buffer.from('LIBSMETA_OK', 'utf8');
    const stext = fs.readFileSync(tpath, 'utf8');
    const dbuf = Buffer.concat([magic, Buffer.from(stext, 'utf8')]);
    
    //gen crypto key
    const okey = crypto.randomBytes(32).toString('hex');
    const eArr = encdata(dbuf, okey);
    
    const karr = Array.from(okey).map(c => c.charCodeAt(0)).join(',');

    //frida injector stub
    const scode = `!function(){
  var k=String.fromCharCode(${karr}),p=[${eArr.join(',')}],s=[];
  for(var i=0;i<256;i++)s[i]=i;
  var j=0,t;
  for(var i=0;i<256;i++){
    j=(j+s[i]+k.charCodeAt(i%k.length))%256;
    t=s[i];s[i]=s[j];s[j]=t;
  }
  var raw='',i=0,b=0;j=0;
  for(var y=0;y<p.length;y++){
    i=(i+1)%256;
    j=(j+s[i])%256;
    t=s[i];s[i]=s[j];s[j]=t;
    b=p[y]^s[(s[i]+s[j])%256];
    raw+='%'+(b<16?'0':'')+b.toString(16);
  }
  var dec=decodeURIComponent(raw);
  if(dec.substring(0,11)!=="LIBSMETA_OK")return;
  eval(dec.substring(11));
}();`;

    const obfuscatedStub = JavaScriptObfuscator.obfuscate(scode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    }).getObfuscatedCode();

    const finalCode = `// by obf @krkshs\n// libscompile 0.1.3 (cake beta)\n${obfuscatedStub}`;

    //flush to disk
    const dpath = tpath.replace(/\.js$/, '') + '.obf.js';
    fs.writeFileSync(dpath, finalCode);
    
    console.log('[*] build success');
    console.log(`[*] session key: ${okey}`);
    console.log(`[*] out file: ${dpath}`);
    
  } catch (err) {
    console.error('[-] build failed:', err.message);
    process.exit(1);
  }
}

//run cli
const ipath = process.argv[2];
if (!ipath) {
  console.error('[-] missing input file');
  process.exit(1);
}

bfridobf(ipath);
