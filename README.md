# libscompile

compiler and obfuscator for frida scripts (v13-17). 
packs js into ast-obfuscated byte arrays with rc4 encryption and magic signature checks.

### install

```bash
git clone https://github.com/krkshs/libscompile.git
cd libscompile
npm install
```

### build

```bash
node realese/cli.js script.js
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
- **AST Obfuscation**: Native code transformation (introduced in 0.1.3(2))
- `javascript-obfuscator` backend
- Variables, strings, and control flow dynamically encrypted
- **fridahash**: SHA256 of the original script
- **byahash**: SHA256 derived from the session key
- The obfuscation `seed` is cryptographically tied to the session key
- magic signature verification (`LIBSMETA_OK`)
- silent abort on decryption failure
- byte array compilation format

---
@krkshs
