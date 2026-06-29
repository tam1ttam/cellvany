import json, re

# 1. Add slug to vlog.json blogs
with open('C:/Users/Tam/Downloads/cellvany/asset/data/vlog.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

slugs = {
    1: 'cach-tri-rung-toc-sau-sinh-buoi-bo-ket',
    2: 'tre-so-sinh-bi-ham-ta-phai-lam-sao',
    3: 'cham-soc-toc-rung-sau-sinh-cho-me-bim',
    4: 'skincare-cho-be-so-sinh-luu-y-quan-trong',
    5: '5-sai-lam-thuong-gap-khi-cham-soc-da-me-bau',
    6: 'cach-massage-dau-ti-cho-be-moi-sinh',
}

for blog in data['blogs']:
    if 'slug' not in blog:
        blog['slug'] = slugs.get(blog['id'], f'bai-viet-{blog["id"]}')

with open('C:/Users/Tam/Downloads/cellvany/asset/data/vlog.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print("vlog.json updated with slugs")

# 2. Update blog.html - fix links to blog/{slug}.html
with open('C:/Users/Tam/Downloads/cellvany/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

# Fix onclick links in blog posts
blog_html = blog_html.replace(
    "onclick=\"location.href='blog_detail.html?id=${post.id}'\"",
    "onclick=\"location.href='blog/${post.slug}.html'\""
)

# Fix view-details links
blog_html = blog_html.replace(
    "href=\"blog_detail.html?id=${post.id}\"",
    "href=\"blog/${post.slug}.html\""
)

# Fix recent posts links
blog_html = blog_html.replace(
    "onclick=\"location.href='blog_detail.html?id=${p.id}'\"",
    "onclick=\"location.href='blog/${p.slug}.html'\""
)

with open('C:/Users/Tam/Downloads/cellvany/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_html)
print("blog.html updated with slug links")

# 3. Update product.html to use metaDescription
with open('C:/Users/Tam/Downloads/cellvany/product.html', 'r', encoding='utf-8') as f:
    product_html = f.read()

# Replace description truncation with metaDescription
product_html = product_html.replace(
    "const desc = (p.description || '').slice(0, 160);",
    "const desc = (p.metaDescription || p.description || '').slice(0, 160);"
)

with open('C:/Users/Tam/Downloads/cellvany/product.html', 'w', encoding='utf-8') as f:
    f.write(product_html)
print("product.html updated to use metaDescription")

# 4. Update blog_detail.html to read new metadata fields
with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'r', encoding='utf-8') as f:
    detail_html = f.read()

# Update the innerHTML template to use new fields
old_template = '''<div class="blog-detail-header cv-anim-up">
                <h1>${post.title}</h1>
                <div class="blog-detail-meta">
                  <span>👤 ${post.author}</span>
                  <span>📅 ${new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>📂 ${post.category}</span>
                </div>
              </div>
              <div class="blog-detail-image cv-reveal">
                <img src="asset/img/${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <span class="fallback">📝</span>
              </div>
              <div class="blog-detail-content cv-reveal">${post.content}</div>
              <div class="blog-detail-tags cv-reveal">
                ${(post.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
              </div>'''

new_template = '''<div class="blog-detail-header cv-anim-up">
                <h1>${post.h1 || post.title}</h1>
                <div class="blog-detail-meta">
                  <span>👤 <strong>${post.author_name || post.author}</strong>${post.author_credential ? ' – ' + post.author_credential : ''}</span>
                  <span>📅 ${new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>📂 ${post.category}</span>
                </div>
              </div>
              ${post.medical_disclaimer ? `<div class="disclaimer-box cv-reveal"><h4>⚠️ Lưu ý Y tế</h4><p>${post.medical_disclaimer}</p></div>` : ''}
              ${post.ymyl_reviewed_by ? `<div class="disclaimer-box cv-reveal" style="background:#e8f5e9;border-left-color:#27ae60"><h4>✅ Bài viết được review bởi</h4><p>${post.ymyl_reviewed_by}</p></div>` : ''}
              <div class="blog-detail-image cv-reveal">
                <img src="asset/img/${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <span class="fallback">📝</span>
              </div>
              <div class="blog-detail-content cv-reveal">${post.content}</div>
              ${post.ymyl_sources ? `<div class="disclaimer-box cv-reveal" style="background:#f5f5f5;border-left-color:#999"><h4>📌 Nguồn tham khảo</h4><p style="margin:0">${post.ymyl_sources}</p></div>` : ''}
              <div class="blog-detail-tags cv-reveal">
                ${(post.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
              </div>'''

detail_html = detail_html.replace(old_template, new_template)

# Update meta description dynamically
old_meta = "document.title = post.title + ' - CELLVANY';"
new_meta = """document.title = (post.h1 || post.title) + ' - CELLVANY';
              if (post.metaDescription) {
                const md = document.querySelector('meta[name=\"description\"]');
                if (md) md.setAttribute('content', post.metaDescription);
              }"""
detail_html = detail_html.replace(old_meta, new_meta)

# Update related posts links
detail_html = detail_html.replace(
    "href=\"blog_detail.html?id=${r.id}\"",
    "href=\"blog/${r.slug || r.id}.html\""
)

with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'w', encoding='utf-8') as f:
    f.write(detail_html)
print("blog_detail.html updated with new metadata fields")

# 5. Clean up update_vlog.py
import os
if os.path.exists('C:/Users/Tam/Downloads/cellvany/update_vlog.py'):
    os.remove('C:/Users/Tam/Downloads/cellvany/update_vlog.py')
    print("update_vlog.py cleaned up")

print("\nAll tasks completed!")
