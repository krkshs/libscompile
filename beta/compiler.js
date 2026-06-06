const fs = require('fs');
const crypto = require('crypto');
const { encdata } = require('./crypto.js');

function rv() {
  return '_0x' + crypto.randomBytes(2).toString('hex');
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
    
    //gen crypto key and hashes
    const okey = crypto.randomBytes(32).toString('hex');
    const eArr = encdata(dbuf, okey);
    
    // Orbus System Hashes
    const fridahash = crypto.createHash('sha256').update(stext).digest('hex');
    const byahash = crypto.createHash('sha256').update(okey + 'LIBSMETA').digest('hex');
    
    const karr = Array.from(okey).map(c => c.charCodeAt(0)).join(',');

    //generate random variables for our custom Orbus obfuscator
    const vk = rv(), vp = rv(), vs = rv(), vi = rv(), vj = rv(), vt = rv(), vy = rv(), vb = rv(), vraw = rv();
    const vOrbus = rv(), vH = rv(), vC = rv(), vV = rv(), vE = rv(), vraw2 = rv(), vd = rv();

    //custom native compiled Orbus system stub
    const scode = `// by obf @krkshs
// libscompile 0.1.3.3 (Orbus Core)
var ${vOrbus} = (function(){
  var ${vH} = { fridahash: "${fridahash}", byahash: "${byahash}" };
  var ${vp} = [${eArr.join(',')}];
  var ${vk} = [${karr}];
  
  function ${vC}(k, p) {
    var ${vs}=[], ${vj}=0, ${vt}, ${vraw}='';
    for(var ${vi}=0; ${vi}<256; ${vi}++) ${vs}[${vi}]=${vi};
    for(var ${vi}=0; ${vi}<256; ${vi}++){
      ${vj}=(${vj}+${vs}[${vi}]+k[${vi}%k.length])%256;
      ${vt}=${vs}[${vi}]; ${vs}[${vi}]=${vs}[${vj}]; ${vs}[${vj}]=${vt};
    }
    var ${vi}=0; ${vj}=0;
    for(var ${vy}=0; ${vy}<p.length; ${vy}++){
      ${vi}=(${vi}+1)%256; ${vj}=(${vj}+${vs}[${vi}])%256;
      ${vt}=${vs}[${vi}]; ${vs}[${vi}]=${vs}[${vj}]; ${vs}[${vj}]=${vt};
      var ${vb}=p[${vy}]^${vs}[(${vs}[${vi}]+${vs}[${vj}])%256];
      ${vraw}+='%'+(${vb}<16?'0':'')+${vb}.toString(16);
    }
    return decodeURIComponent(${vraw});
  }

  function ${vV}() {
    if(${vH}.fridahash.length !== 64 || ${vH}.byahash.length !== 64) return false;
    var ${vraw2} = ${vC}(${vk}, ${vp});
    if(${vraw2}.substring(0,11) !== "LIBSMETA_OK") return false;
    var ${vE} = ${vraw2}.substring(11);
    return ${vE};
  }

  return {
    exec: function() {
      var ${vd} = ${vV}();
      if(${vd}) {
        (new Function(${vd}))();
      }
    }
  };
})();
${vOrbus}.exec();`;

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
