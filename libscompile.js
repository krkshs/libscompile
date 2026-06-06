const fs = require('fs');
const crypto = require('crypto');

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

//generate random var name
function rv() {
  return '_0x' + crypto.randomBytes(2).toString('hex');
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

    //generate random variables for our custom obfuscator
    const vk = rv(), vp = rv(), vs = rv(), vi = rv(), vj = rv(), vt = rv(), vy = rv(), vb = rv(), vraw = rv(), vdec = rv();

    //custom native obfuscated stub
    const scode = `// by obf @krkshs
// libscompile 0.1.3 (cake beta)
!function(){
  var ${vk}=String.fromCharCode(${karr}),
      ${vp}=[${eArr.join(',')}],
      ${vs}=[];
  for(var ${vi}=0;${vi}<256;${vi}++)${vs}[${vi}]=${vi};
  var ${vj}=0,${vt};
  for(var ${vi}=0;${vi}<256;${vi}++){
    ${vj}=(${vj}+${vs}[${vi}]+${vk}.charCodeAt(${vi}%${vk}.length))%256;
    ${vt}=${vs}[${vi}];${vs}[${vi}]=${vs}[${vj}];${vs}[${vj}]=${vt};
  }
  var ${vraw}='',${vi}=0,${vb}=0;${vj}=0;
  for(var ${vy}=0;${vy}<${vp}.length;${vy}++){
    ${vi}=(${vi}+1)%256;
    ${vj}=(${vj}+${vs}[${vi}])%256;
    ${vt}=${vs}[${vi}];${vs}[${vi}]=${vs}[${vj}];${vs}[${vj}]=${vt};
    ${vb}=${vp}[${vy}]^${vs}[(${vs}[${vi}]+${vs}[${vj}])%256];
    ${vraw}+='%'+(${vb}<16?'0':'')+${vb}.toString(16);
  }
  var ${vdec}=decodeURIComponent(${vraw});
  if(${vdec}.substring(0,11)!=="LIBSMETA_OK")return;
  eval(${vdec}.substring(11));
}();`;

    //flush to disk
    const dpath = tpath.replace(/\.js$/, '') + '.obf.js';
    fs.writeFileSync(dpath, scode);
    
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
