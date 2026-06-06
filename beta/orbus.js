const crypto = require('crypto');

function rv() {
  return '_0x' + crypto.randomBytes(2).toString('hex');
}

const TG_LINK = "https://t.me/krkshs";

function generateOrbusStub(eArr, okey, fridahash, byahash) {
  const vk = rv(), vp = rv(), vs = rv(), vi = rv(), vj = rv(), vt = rv(), vy = rv(), vb = rv(), vraw = rv();
  const vOrbus = rv(), vH = rv(), vC = rv(), vV = rv(), vE = rv(), vraw2 = rv(), vd = rv(), vl = rv();

  // The decryption key in the generated stub will be exactly:
  // okey + fridahash + byahash + TG_LINK
  
  const scode = `// by obf @krkshs
// libscompile 0.1.3.4 (Orbus Real Compile)
var ${vOrbus} = (function(){
  var ${vH} = { f: "${fridahash}", b: "${byahash}" };
  var ${vl} = "${TG_LINK}";
  var ${vp} = [${eArr.join(',')}];
  
  // assemble the true key string
  var ${vk} = "${okey}" + ${vH}.f + ${vH}.b + ${vl};
  
  function ${vC}(k, p) {
    var ${vs}=[], ${vj}=0, ${vt}, ${vraw}='';
    for(var ${vi}=0; ${vi}<256; ${vi}++) ${vs}[${vi}]=${vi};
    for(var ${vi}=0; ${vi}<256; ${vi}++){
      ${vj}=(${vj}+${vs}[${vi}]+k.charCodeAt(${vi}%k.length))%256;
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
    try {
      var ${vraw2} = ${vC}(${vk}, ${vp});
      if(${vraw2}.substring(0,11) === "LIBSMETA_OK") {
        return ${vraw2}.substring(11);
      }
    } catch(e) {}
    return false;
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

  return scode;
}

module.exports = { generateOrbusStub, TG_LINK };
