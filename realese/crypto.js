function gstream(khex, olen) {
  const sbox = Array.from({ length: 256 }, (_, i) => i);
  let mx = 0;
  for (let i = 0; i < 256; i++) {
    const kByte = typeof khex === 'string' ? khex.charCodeAt(i % khex.length) : khex[i % khex.length];
    mx = (mx + sbox[i] + kByte) % 256;
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

function encdata(rbuf, kstr) {
  const cbytes = gstream(kstr, rbuf.length);
  const out = [];
  for (let i = 0; i < rbuf.length; i++) {
    out.push(rbuf[i] ^ cbytes[i]);
  }
  return out;
}

module.exports = { gstream, encdata };
