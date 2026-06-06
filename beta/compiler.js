const fs = require('fs');
const crypto = require('crypto');
const { encdata } = require('./crypto.js');

function rv() {
  return '_0x' + crypto.randomBytes(2).toString('hex');
}

function neiroslop() {
  return '\n//PMDRK YA NEIROSLOPER!!!';
}

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
// libscompile 0.1.3.1 (cake beta)
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
}();${neiroslop()}`;

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

module.exports = { bfridobf };
