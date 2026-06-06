# libscompile

compiler and obfuscator for frida scripts (v12-17). 
packs js into ast-obfuscated byte arrays with rc4 encryption and magic signature checks.

### install

```bash
git clone https://github.com/krkshs/libscompile.git
cd libscompile
npm install
```

### build

```bash
node beta/cli.js script.js
```
outputs `script.obf.js` and a session key.

### inject (python)

if the key is stripped from the build (e.g. main branch), pass it to the frida environment before eval:

```python
import frida

with open("script.obf.js", "r") as f:
    code = f.read()

payload = f"var libskey = 'your_key_here';\n" + code

session = frida.attach("target")
session.create_script(payload).load()
```

### internals
- rc4 payload encryption
- magic signature verification (`LIBSMETA_OK`)
- silent abort on decryption failure
- ast obfuscation (control flow flattening, string splitting)
- byte array compilation format
- **NEW**: simple anti-debug loop (`debugger;` interval) in 0.1.3.2

---
@krkshs
