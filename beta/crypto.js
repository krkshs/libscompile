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

function encdata(rbuf, kstr) {
  const cbytes = gstream(kstr, rbuf.length);
  const p = [];
  for (let i = 0; i < rbuf.length; i++) {
    p.push(rbuf[i] ^ cbytes[i]);
  }
  return p;
}

module.exports = { gstream, encdata };
