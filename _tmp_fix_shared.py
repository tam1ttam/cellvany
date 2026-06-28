import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'c:\Users\Tam\Downloads\Web (1)\Web (1)\asset\js\shared.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Show lines 376-380 with their actual content
lines = content.split('\n')
for i in range(374, 382):
    print(f'LINE {i+1}: {lines[i]}')

# The target: replace the emoji span with image rendering
# Find the exact pattern
target_span = '<span style="font-size:40px">🧴</span>'
if target_span in content:
    print('\nFOUND target span')
    replacement = '${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span style="font-size:40px;display:none;position:absolute">🧴</span>` : \'<span style="font-size:40px">🧴</span>\'}'
    content = content.replace(target_span, replacement, 1)
    with open(r'c:\Users\Tam\Downloads\Web (1)\Web (1)\asset\js\shared.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('REPLACED OK')
else:
    print('NOT FOUND - trying alternate')
    # Try with the emoji as escape
    import unicodedata
    emoji = '\U0001f9f4'
    target_span2 = f'<span style="font-size:40px">{emoji}</span>'
    print(f'Target2: {repr(target_span2)}')
    if target_span2 in content:
        print('FOUND with escape')
    else:
        # Read raw bytes around line 378
        with open(r'c:\Users\Tam\Downloads\Web (1)\Web (1)\asset\js\shared.js', 'rb') as f:
            raw = f.read()
        # Find the emoji bytes
        emoji_bytes = emoji.encode('utf-8')
        idx = raw.find(emoji_bytes)
        if idx >= 0:
            print(f'Emoji found at byte {idx}, context: {raw[max(0,idx-30):idx+40]}')
