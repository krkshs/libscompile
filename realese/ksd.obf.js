//by obf @krkshs
//libscompile 0.1.3(3)
const _0xstrs = ["65396438633064353635346430663738313163316565643833393333663661303434373465336230613337363230346264356431613239376163623164643239", "61336436393961393662303135353933353563323966356333643838363365373239353231666462303738623863383664636137626633633830393464653564", "6c6962632e736f", "6d616c6c6f63", "706f696e746572", "696e74", "66726565", "766f6964", "707468726561645f6d757465785f6c6f636b", "707468726561645f6d757465785f756e6c6f636b", "707468726561645f636f6e645f7369676e616c", "73656c656374", "6d656d6d6f7665", "6e746f6873", "75696e743136", "696e65745f61646472", "73656e64", "72656376", "68746f6e73", "6c6962672e736f", "6c696233393238354546412e736f", "636f6e6e656374", "38372e3132302e3138372e39"];
function _0xdec(index) {
  let hex = _0xstrs[index];
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}
var _0x6f52190 = _0xdec(0);
var _0xb80d7b1 = _0xdec(1);
var _0x3807052 = "LIBSMETA_OK";
var _0xcd45093 = {
  modules: {},
  options: {}
};
const _0x136f094 = 0xc86d10;
const _0x475bef5 = 0x80e5a2 + 0x8 + 0x1;
const _0xd54aef6 = 0x4a7ee4;
const _0x91c71b7 = 0x41c8d4;
const _0x9d35958 = 0x4;
var _0xf20e769 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(3)), _0xdec(4), [_0xdec(5)]);
var _0x9dc05d10 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(6)), _0xdec(7), [_0xdec(4)]);
var _0xa43ea511 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(8)), _0xdec(5), [_0xdec(4)]);
var _0x8e3a4a12 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(9)), _0xdec(5), [_0xdec(4)]);
var _0xa2057913 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(10)), _0xdec(5), [_0xdec(4)]);
var _0xc721c714 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(11)), _0xdec(5), [_0xdec(5), _0xdec(4), _0xdec(4), _0xdec(4), _0xdec(4)]);
var _0x14791415 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(12)), _0xdec(4), [_0xdec(4), _0xdec(4), _0xdec(5)]);
var _0x09411b16 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(13)), _0xdec(14), [_0xdec(14)]);
var _0x7089a717 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(15)), _0xdec(5), [_0xdec(4)]);
var _0xef757f18 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(16)), _0xdec(5), [_0xdec(5), _0xdec(4), _0xdec(5), _0xdec(5)]);
var _0x3e1deb19 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(17)), _0xdec(5), [_0xdec(5), _0xdec(4), _0xdec(5), _0xdec(5)]);
var _0x0b20f020 = new NativeFunction(Module.findExportByName(_0xdec(2), _0xdec(18)), _0xdec(14), [_0xdec(14)]);
var _0x89da3621 = {
  _getByteStream: function (_0xab469422) {
    return _0xab469422.add(0x8);
  },
  _getVersion: function (_0xab469422) {
    return Memory.readInt(_0xab469422.add(0x4));
  },
  _setVersion: function (_0xab469422, _0x01924b23) {
    Memory.writeInt(_0xab469422.add(0x4), _0x01924b23);
  },
  _getMessageType: function (_0xab469422) {
    return new NativeFunction(Memory.readPointer(Memory.readPointer(_0xab469422).add(0x14)), _0xdec(5), [_0xdec(4)])(_0xab469422);
  },
  _encode: function (_0xab469422) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0xab469422).add(0x8)), _0xdec(7), [_0xdec(4)])(_0xab469422);
  },
  _decode: function (_0xab469422) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0xab469422).add(0xc)), _0xdec(7), [_0xdec(4)])(_0xab469422);
  },
  _free: function (_0xab469422) {
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0xab469422).add(0x18)), _0xdec(7), [_0xdec(4)])(_0xab469422);
    new NativeFunction(Memory.readPointer(Memory.readPointer(_0xab469422).add(0x4)), _0xdec(7), [_0xdec(4)])(_0xab469422);
  }
};
var _0x4e51e424 = {
  _getOffset: function (_0xbb65c325) {
    return Memory.readInt(_0xbb65c325.add(0x10));
  },
  _getByteArray: function (_0xbb65c325) {
    return Memory.readPointer(_0xbb65c325.add(0x1c));
  },
  _setByteArray: function (_0xbb65c325, _0xbe886326) {
    Memory.writePointer(_0xbb65c325.add(0x1c), _0xbe886326);
  },
  _getLength: function (_0xbb65c325) {
    return Memory.readInt(_0xbb65c325.add(0x14));
  },
  _setLength: function (_0xbb65c325, _0xa7873227) {
    Memory.writeInt(_0xbb65c325.add(0x14), _0xa7873227);
  }
};
var Buffer = {
  _getEncodingLength: function (_0xd9262228) {
    return Memory.readU8(_0xd9262228.add(0x2)) << 0x10 | Memory.readU8(_0xd9262228.add(0x3)) << 0x8 | Memory.readU8(_0xd9262228.add(0x4));
  },
  _setEncodingLength: function (_0xd9262228, _0xa7873227) {
    Memory.writeU8(_0xd9262228.add(0x2), _0xa7873227 >> 0x10 & 0xff);
    Memory.writeU8(_0xd9262228.add(0x3), _0xa7873227 >> 0x8 & 0xff);
    Memory.writeU8(_0xd9262228.add(0x4), _0xa7873227 & 0xff);
  },
  _setMessageType: function (_0xd9262228, _0xacade529) {
    Memory.writeU8(_0xd9262228.add(0x0), _0xacade529 >> 0x8 & 0xff);
    Memory.writeU8(_0xd9262228.add(0x1), _0xacade529 & 0xff);
  },
  _getMessageVersion: function (_0xd9262228) {
    return Memory.readU8(_0xd9262228.add(0x5)) << 0x8 | Memory.readU8(_0xd9262228.add(0x6));
  },
  _setMessageVersion: function (_0xd9262228, _0x01924b23) {
    Memory.writeU8(_0xd9262228.add(0x5), _0x01924b23 >> 0x8 & 0xff);
    Memory.writeU8(_0xd9262228.add(0x6), _0x01924b23 & 0xff);
  },
  _getMessageType: function (_0xd9262228) {
    return Memory.readU8(_0xd9262228) << 0x8 | Memory.readU8(_0xd9262228.add(0x1));
  }
};
var _0x0024cd30 = {
  _getCapacity: function (_0x6f325b31) {
    return Memory.readInt(_0x6f325b31.add(0x4));
  },
  _get: function (_0x6f325b31, _0x36ad7932) {
    return Memory.readPointer(Memory.readPointer(_0x6f325b31).add(_0x9d35958 * _0x36ad7932));
  },
  _set: function (_0x6f325b31, _0x36ad7932, _0xab469422) {
    Memory.writePointer(Memory.readPointer(_0x6f325b31).add(_0x9d35958 * _0x36ad7932), _0xab469422);
  },
  _count: function (_0x6f325b31) {
    return Memory.readInt(_0x6f325b31.add(0x8));
  },
  _decrementCount: function (_0x6f325b31) {
    Memory.writeInt(_0x6f325b31.add(0x8), Memory.readInt(_0x6f325b31.add(0x8)) - 0x1);
  },
  _incrementCount: function (_0x6f325b31) {
    Memory.writeInt(_0x6f325b31.add(0x8), Memory.readInt(_0x6f325b31.add(0x8)) + 0x1);
  },
  _getDequeueIndex: function (_0x6f325b31) {
    return Memory.readInt(_0x6f325b31.add(0xc));
  },
  _getEnqueueIndex: function (_0x6f325b31) {
    return Memory.readInt(_0x6f325b31.add(0x10));
  },
  _setDequeueIndex: function (_0x6f325b31, _0x36ad7932) {
    Memory.writeInt(_0x6f325b31.add(0xc), _0x36ad7932);
  },
  _setEnqueueIndex: function (_0x6f325b31, _0x36ad7932) {
    Memory.writeInt(_0x6f325b31.add(0x10), _0x36ad7932);
  },
  _enqueue: function (_0x6f325b31, _0xab469422) {
    _0xa43ea511(_0x6f325b31.sub(0x4));
    var _0x36ad7932 = _0x0024cd30._getEnqueueIndex(_0x6f325b31);
    _0x0024cd30._set(_0x6f325b31, _0x36ad7932, _0xab469422);
    _0x0024cd30._setEnqueueIndex(_0x6f325b31, (_0x36ad7932 + 0x1) % _0x0024cd30._getCapacity(_0x6f325b31));
    _0x0024cd30._incrementCount(_0x6f325b31);
    _0x8e3a4a12(_0x6f325b31.sub(0x4));
  },
  _dequeue: function (_0x6f325b31) {
    var _0xab469422 = null;
    _0xa43ea511(_0x6f325b31.sub(0x4));
    if (_0x0024cd30._count(_0x6f325b31)) {
      var _0x36ad7932 = _0x0024cd30._getDequeueIndex(_0x6f325b31);
      _0xab469422 = _0x0024cd30._get(_0x6f325b31, _0x36ad7932);
      _0x0024cd30._setDequeueIndex(_0x6f325b31, (_0x36ad7932 + 0x1) % _0x0024cd30._getCapacity(_0x6f325b31));
      _0x0024cd30._decrementCount(_0x6f325b31);
    }
    _0x8e3a4a12(_0x6f325b31.sub(0x4));
    return _0xab469422;
  }
};
function _0xc2d55d33() {
  Interceptor.attach(_0xcd45093.base.add(0x44cebc), {
    onLeave(_0xe8351734) {
      _0xe8351734.replace(ptr(0x1));
    }
  });
  Interceptor.attach(_0xcd45093.base.add(0xc88108), {
    onLeave(_0xe8351734) {
      _0xe8351734.replace(ptr(0x1));
    }
  });
  Interceptor.attach(_0xcd45093.base.add(0x67febc), {
    onEnter: function (_0xc731ca35) {
      _0xc731ca35[0x3] = ptr(0x3);
    }
  });
}
function _0x5a439036() {
  const _0xaed90437 = Process.findModuleByName(_0xdec(19)).base;
  _0xcd45093.base = Process.findModuleByName(_0xdec(19)).base;
  _0xcd45093.pthreadReturn = _0xcd45093.base.add(_0x475bef5);
  _0xcd45093.serverConnection = Memory.readPointer(_0xcd45093.base.add(_0x136f094));
  _0xcd45093.messaging = Memory.readPointer(_0xcd45093.serverConnection.add(0x4));
  _0xcd45093.messageFactory = Memory.readPointer(_0xcd45093.messaging.add(0x34));
  _0xcd45093.recvQueue = _0xcd45093.messaging.add(0x3c);
  _0xcd45093.sendQueue = _0xcd45093.messaging.add(0x54);
  _0xcd45093.state = _0xcd45093.messaging.add(0xd0);
  _0xcd45093.loginMessagePtr = _0xcd45093.messaging.add(0xd4);
  _0xcd45093.createMessageByType = new NativeFunction(_0xcd45093.base.add(_0xd54aef6), _0xdec(4), [_0xdec(4), _0xdec(5)]);
  _0xcd45093.sendMessage = function (_0xab469422) {
    _0x89da3621._encode(_0xab469422);
    var _0xbb65c325 = _0x89da3621._getByteStream(_0xab469422);
    var _0xc8e58438 = _0x4e51e424._getOffset(_0xbb65c325);
    var _0x311a0e39 = _0xf20e769(_0xc8e58438 + 0x7);
    _0x14791415(_0x311a0e39.add(0x7), _0x4e51e424._getByteArray(_0xbb65c325), _0xc8e58438);
    Buffer._setEncodingLength(_0x311a0e39, _0xc8e58438);
    Buffer._setMessageType(_0x311a0e39, _0x89da3621._getMessageType(_0xab469422));
    Buffer._setMessageVersion(_0x311a0e39, _0x89da3621._getVersion(_0xab469422));
    _0xef757f18(_0xcd45093.fd, _0x311a0e39, _0xc8e58438 + 0x7, 0x0);
    _0x9dc05d10(_0x311a0e39);
  };
  function _0x2dc8cb40() {
    var _0xab469422 = _0x0024cd30._dequeue(_0xcd45093.sendQueue);
    while (_0xab469422) {
      var _0xa6735241 = _0x89da3621._getMessageType(_0xab469422);
      if (_0xa6735241 === 0x2774) {
        _0xab469422 = Memory.readPointer(_0xcd45093.loginMessagePtr);
        Memory.writePointer(_0xcd45093.loginMessagePtr, ptr(0x0));
      }
      if (_0xa6735241 == 0x371d) {
        var _0xb2038242 = Module.findBaseAddress(_0xdec(20));
        var _0xcfaf1643 = new NativeFunction(_0xb2038242.add(0x6ff4), _0xdec(5), []);
        _0xcfaf1643();
      }
      _0xcd45093.sendMessage(_0xab469422);
      _0xab469422 = _0x0024cd30._dequeue(_0xcd45093.sendQueue);
    }
  }
  function _0xca85dc44() {
    Interceptor.attach(_0xcd45093.base.add(0x38c6fc), {
      onEnter(_0xc731ca35) {
        _0xc731ca35[0x7] = ptr(0x1);
      }
    });
  }
  function _0x47aa9845() {
    var _0xff369146 = _0xf20e769(0x7);
    _0x3e1deb19(_0xcd45093.fd, _0xff369146, 0x7, 0x100);
    var _0xa6735241 = Buffer._getMessageType(_0xff369146);
    if (_0xa6735241 === 0x4e88) {
      Memory.writeInt(_0xcd45093.state, 0x5);
      _0xc2d55d33();
      _0xca85dc44();
    }
    var _0x9fc7cf47 = Buffer._getEncodingLength(_0xff369146);
    var _0x5cb9f948 = Buffer._getMessageVersion(_0xff369146);
    _0x9dc05d10(_0xff369146);
    var _0x311a0e39 = _0xf20e769(_0x9fc7cf47);
    _0x3e1deb19(_0xcd45093.fd, _0x311a0e39, _0x9fc7cf47, 0x100);
    var _0xab469422 = _0xcd45093.createMessageByType(_0xcd45093.messageFactory, _0xa6735241);
    _0x89da3621._setVersion(_0xab469422, _0x5cb9f948);
    var _0xbb65c325 = _0x89da3621._getByteStream(_0xab469422);
    _0x4e51e424._setLength(_0xbb65c325, _0x9fc7cf47);
    if (_0x9fc7cf47) {
      var _0x2709e649 = _0xf20e769(_0x9fc7cf47);
      _0x14791415(_0x2709e649, _0x311a0e39, _0x9fc7cf47);
      _0x4e51e424._setByteArray(_0xbb65c325, _0x2709e649);
    }
    _0x89da3621._decode(_0xab469422);
    _0x0024cd30._enqueue(_0xcd45093.recvQueue, _0xab469422);
    _0x9dc05d10(_0x311a0e39);
  }
  Interceptor.attach(Module.findExportByName(_0xdec(2), _0xdec(10)), {
    onEnter: function (_0xc731ca35) {
      _0x2dc8cb40();
    }
  });
  Interceptor.attach(Module.findExportByName(_0xdec(2), _0xdec(11)), {
    onEnter: function (_0xc731ca35) {
      _0x47aa9845();
    }
  });
}
function _0x90e3d550(_0x5bdc5151, _0xb1d3c052) {
  Interceptor.attach(Module.findExportByName(_0xdec(2), _0xdec(21)), {
    onEnter: function (_0xc731ca35) {
      if (_0x09411b16(Memory.readU16(_0xc731ca35[0x1].add(0x2))) === 0x247b) {
        _0xcd45093.fd = _0xc731ca35[0x0].toInt32();
        Memory.writeInt(_0xc731ca35[0x1].add(0x4), _0x7089a717(Memory.allocUtf8String(_0x5bdc5151)));
        Memory.writeU16(_0xc731ca35[0x1].add(0x2), _0x09411b16(_0xb1d3c052));
        _0x5a439036();
      }
    }
  });
}
function _0x08849953() {
  const _0xaed90437 = Module.findBaseAddress(_0xdec(20));
  Interceptor.replace(_0xaed90437.add(0xc0d0), new NativeCallback(function (_0xafbc4a54) {
    return 0x0;
  }, _0xdec(5), [_0xdec(5)]));
}
function _0x0a3ec955() {
  _0x90e3d550(_0xdec(22), 0xd5c);
}
_0x0a3ec955();
