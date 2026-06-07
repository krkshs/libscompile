const crypto = require('crypto');

function fhash(stext) {
  return crypto.createHash('sha256').update(stext).digest('hex');
}

function bhash(okey) {
  return crypto.createHash('sha256').update(okey + 'LIBSMETA').digest('hex');
}

module.exports = { fhash, bhash };
