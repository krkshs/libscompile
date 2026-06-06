# libscompile

**libscompile** is an ultra-secure, minimalistic compiler and obfuscator for Frida scripts (supports Frida v12-v17). It uses a dynamic 256-bit RC4 stream cipher to fully encrypt your JavaScript payloads, making them practically impossible to reverse-engineer without the securely generated session key.

## 🚀 Features
- **Maximum Security:** The payload is encrypted with RC4. The key is *never* stored inside the compiled file.
- **Frida Compatible:** Works natively with Frida 12-17 out of the box.
- **Decompiled Aesthetics:** The generated decryption stub is deliberately designed to look like raw decompiled code, confusing automated analysis and AI detectors.
- **Dynamic Key Injection:** You provide the key at runtime (e.g., via your Python loader), keeping your logic 100% secure at rest.

## ⚙️ Installation
Clone the repository and ensure you have Node.js installed:
```bash
git clone https://github.com/krkshs/libscompile.git
cd libscompile
```

## 🛠️ Usage

### 1. Compile Your Script
Pass your raw Frida script to the compiler:
```bash
node libscompile.js your_script.js
```
The compiler will output:
- A new file: `your_script.obf.js`
- A randomly generated **Session Key** (e.g., `a2f35088c485fed1...`). **Save this key!**

### 2. Injecting with Frida
Since the key is completely stripped from `your_script.obf.js`, you *must* pass it to the environment before the script executes. 

Example via Python:
```python
import frida

# Your generated key from libscompile
OBF_KEY = "a2f35088c485fed1..."

with open("your_script.obf.js", "r") as f:
    obfuscated_code = f.read()

# Prepend the key to the script
script_payload = f"var libskey = '{OBF_KEY}';\n" + obfuscated_code

# Inject
session = frida.attach("TargetApp")
script = session.create_script(script_payload)
script.load()
```

## 📜 License
MIT License. Created by @libmeta.
