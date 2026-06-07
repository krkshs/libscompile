const crypto = require('crypto');

function rv() {
  return '_0x' + crypto.randomBytes(2).toString('hex');
}

const TG_LINK_BYTES = [104, 116, 116, 112, 115, 58, 47, 47, 116, 46, 109, 101, 47, 107, 114, 107, 115, 104, 115];
const TG_LINK = String.fromCharCode(...TG_LINK_BYTES);

function dkey(okey, fridahash, byahash) {
  const baseStr = okey + fridahash + byahash + TG_LINK;
  const keyArr = [];
  for(let i=0; i<baseStr.length; i++) {
    keyArr.push(baseStr.charCodeAt(i) ^ (i % 256));
  }
  return keyArr;
}

function generateOrbusStub(eArr, okey, fridahash, byahash) {
  const vk = rv(), vp = rv(), vs = rv(), vi = rv(), vj = rv(), vt = rv(), vy = rv(), vb = rv(), vraw = rv();
  const vOrbus = rv(), vH = rv(), vC = rv(), vV = rv(), vE = rv(), vraw2 = rv(), vd = rv(), vl = rv(), vbase = rv();
  
  const scode = `// by obf @krkshs
// libscompile 0.1.3.(1)
var ${vOrbus} = (function(){
  var ${vH} = { f: "${fridahash}", b: "${byahash}" };
  var ${vl} = String.fromCharCode(${TG_LINK_BYTES.join(',')});
  var ${vp} = [${eArr.join(',')}];
  
  var ${vk} = [];
  var ${vbase} = "${okey}" + ${vH}.f + ${vH}.b + ${vl};
  for(var ${vi}=0; ${vi}<${vbase}.length; ${vi}++){
    ${vk}.push(${vbase}.charCodeAt(${vi}) ^ (${vi} % 256));
  }
  
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

module.exports = { generateOrbusStub, dkey };
