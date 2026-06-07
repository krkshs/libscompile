const crypto = require('crypto');

function getFridaHash(stext) {
  return crypto.createHash('sha256').update(stext).digest('hex');
}

function getByaHash(okey) {
  return crypto.createHash('sha256').update(okey + 'LIBSMETA').digest('hex');
}

module.exports = { getFridaHash, getByaHash };
