with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the duplicate - the file has content twice
# Look for the second <!DOCTYPE html>
idx = content.find('<!DOCTYPE html>', 10)
if idx > 0:
    content = content[:idx]
    with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Fixed - removed duplicate, kept {len(content)} chars')
else:
    print('No duplicate found')
