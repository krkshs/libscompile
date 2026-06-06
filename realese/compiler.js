const fs = require('fs');
const crypto = require('crypto');
const { encdata } = require('./crypto.js');

//process file routine
function bfridobf(tpath) {
  try {
    if (!fs.existsSync(tpath)) {
      throw new Error(`cannot find script: ${tpath}`);
    }
    
    //read script bytes
    const stext = fs.readFileSync(tpath, 'utf8');
    const dbuf = Buffer.from(stext, 'utf8');
    
    //gen crypto key
    const okey = crypto.randomBytes(32).toString('hex');
    const ehex = encdata(dbuf, okey);
    
    //frida injector stub
    const scode = `// by obf @krkshs
// libscompile 0.1.2 (jake)
!function(){
  var k=typeof libskey!=='undefined'?libskey:'',h="${ehex}",s=[];
  for(var i=0;i<256;i++)s[i]=i;
  var j=0,t;
  for(var i=0;i<256;i++){
    j=(j+s[i]+k.charCodeAt(i%k.length))%256;
    t=s[i];s[i]=s[j];s[j]=t;
  }
  var raw='',i=0,b=0;j=0;
  for(var y=0;y<h.length;y+=2){
    i=(i+1)%256;
    j=(j+s[i])%256;
    t=s[i];s[i]=s[j];s[j]=t;
    b=parseInt(h.substr(y,2),16)^s[(s[i]+s[j])%256];
    raw+='%'+(b<16?'0':'')+b.toString(16);
  }
  eval(decodeURIComponent(raw));
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

module.exports = { bfridobf };
