const { bfridobf } = require('./compiler.js');

const ipath = process.argv[2];
if (!ipath) {
  console.error('[-] missing input file');
  process.exit(1);
}

bfridobf(ipath);
