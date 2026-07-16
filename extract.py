import re
with open(r'C:\Users\kevina\.gemini\antigravity\brain\04450b5e-8921-4bfd-bb9e-f0eaa11a5ba8\.system_generated\steps\193\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

matches = re.finditer(r'Soto Ayam Pringgondani', text)
for m in matches:
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 200)
    print(text[start:end])
    print("---")
