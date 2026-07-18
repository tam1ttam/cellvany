import json

# Update blog.html - change all blog_detail.html?id=X links to blog/{slug}.html
with open('C:/Users/Tam/Downloads/cellvany/blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

# Build slug map from vlog.json
with open('C:/Users/Tam/Downloads/cellvany/asset/data/vlog.json', 'r', encoding='utf-8') as f:
    vlog = json.load(f)

slug_map = {str(b['id']): b['slug'] for b in vlog['blogs']}

# Replace all blog_detail.html?id=X with blog/{slug}.html
for bid, slug in slug_map.items():
    blog_html = blog_html.replace(f"blog_detail.html?id={bid}", f"blog/{slug}.html")

with open('C:/Users/Tam/Downloads/cellvany/blog.html', 'w', encoding='utf-8') as f:
    f.write(blog_html)

print('blog.html updated with slug-based links')

# Update blog_detail.html to read new metadata fields
with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'r', encoding='utf-8') as f:
    detail_html = f.read()

# Replace the script section to use new fields
old_script = '''document.addEventListener('DOMContentLoaded', async () => {
  await CELLVANY.loadData();
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const post = CELLVANY.blogs.find(b => b.id === id);
  if (!post) {
    document.getElementById('blog-detail-container').innerHTML = '<div style="text-align:center;padding:60px"><h3>Không tìm thấy bài viết</h3><a href="blog.html" style="color:#27ae60">← Quay lại Blog</a></div>';
    return;
  }
  document.title = post.title + ' - CELLVANY';
  document.getElementById('breadcrumb-title').textContent = post.title;
  document.getElementById('blog-detail-container').innerHTML = `
   <div class="blog-detail-header cv-anim-up">
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
   </div>
   <div class="blog-detail-nav">
     <a href="blog.html">← Quay lại Blog</a>
     <a href="shop.html">Mua Sắm Ngay →</a>
   </div>
   `;
  // Related posts
  const related = CELLVANY.blogs.filter(b => b.id !== id && b.category === post.category).slice(0, 3);
  if (!related.length) {
    document.getElementById('related-posts-container').style.display = 'none';
    return;
  }
  document.getElementById('related-grid').innerHTML = related.map(r => `
   <div class="related-card" onclick="location.href='blog_detail.html?id=${r.id}'">
     <div class="related-image">
       <img src="asset/img/${r.image}" alt="${r.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
       <span class="fallback">📝</span>
     </div>
     <h4>${r.title}</h4>
     <p>${new Date(r.date).toLocaleDateString('vi-VN')}</p>
   </div>
   `).join('');
});'''

new_script = '''document.addEventListener('DOMContentLoaded', async () => {
  await CELLVANY.loadData();
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const post = CELLVANY.blogs.find(b => b.id === id);
  if (!post) {
    document.getElementById('blog-detail-container').innerHTML = '<div style="text-align:center;padding:60px"><h3>Không tìm thấy bài viết</h3><a href="blog.html" style="color:#27ae60">← Quay lại Blog</a></div>';
    return;
  }
  const title = post.h1 || post.title;
  const metaDesc = post.metaDescription || post.excerpt || '';
  document.title = title + ' - CELLVANY';
  const mdEl = document.querySelector('meta[name="description"]');
  if (mdEl) mdEl.setAttribute('content', metaDesc);
  document.getElementById('breadcrumb-title').textContent = title;
  const authorName = post.author_name || post.author || '';
  const authorCred = post.author_credential || '';
  const dateStr = new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  const medicalDisc = post.medical_disclaimer || '';
  let headerHTML = '<div class="blog-detail-header cv-anim-up"><h1>' + title + '</h1><div class="blog-detail-meta">';
  if (authorName) headerHTML += '<span>👤 <strong>' + authorName + '</strong>' + (authorCred ? ' – ' + authorCred : '') + '</span>';
  headerHTML += '<span>📅 ' + dateStr + '</span><span>📂 ' + post.category + '</span></div></div>';
  let bodyHTML = '<div class="blog-detail-image cv-reveal"><img src="asset/img/' + post.image + '" alt="' + post.title + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\'"><span class="fallback">📝</span></div>';
  if (medicalDisc) {
    bodyHTML += '<div class="disclaimer-box"><h4>⚠️ Lưu ý Y tế</h4><p>' + medicalDisc + '</p></div>';
  }
  bodyHTML += '<div class="blog-detail-content cv-reveal">' + post.content + '</div>';
  const h2s = [post.h2_1, post.h2_2, post.h2_3].filter(Boolean);
  if (h2s.length) {
    bodyHTML += '<div class="blog-detail-tags cv-reveal" style="margin-top:40px"><h3 style="font-size:20px;color:#27ae60;margin-bottom:15px">Mục Lục</h3>';
    h2s.forEach((h, i) => { bodyHTML += '<p style="margin:8px 0;color:#555">' + (i+1) + '. ' + h + '</p>'; });
    bodyHTML += '</div>';
  }
  bodyHTML += '<div class="blog-detail-tags cv-reveal">' + (post.tags || []).map(t => '<span class="tag">#' + t + '</span>').join('') + '</div>';
  bodyHTML += '<div class="blog-detail-nav"><a href="blog.html">← Quay lại Blog</a><a href="shop.html">Mua Sắm Ngay →</a></div>';
  document.getElementById('blog-detail-container').innerHTML = headerHTML + bodyHTML;
  // Article Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": metaDesc,
    "author": { "@type": "Organization", "name": "CELLVANY" },
    "publisher": { "@type": "Organization", "name": "CELLVANY", "logo": { "@type": "ImageObject", "url": "https://cellvany.id.vn/asset/logo.png" } },
    "datePublished": post.date || new Date().toISOString().split('T')[0],
    "dateModified": post.date || new Date().toISOString().split('T')[0],
    "mainEntityOfPage": "https://cellvany.id.vn/blog/" + (post.slug || '') + ".html"
  };
  if (post.image) schema.image = 'https://cellvany.id.vn/asset/img/' + post.image;
  const existingSchema = document.querySelector('script[type="application/ld+json"]');
  if (existingSchema && !existingSchema.textContent.includes('Article')) {
    existingSchema.setAttribute('type', 'application/ld+json');
    existingSchema.textContent = JSON.stringify(schema);
  } else {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  }
  // Related posts
  const related = CELLVANY.blogs.filter(b => b.id !== id && b.category === post.category).slice(0, 3);
  if (!related.length) {
    document.getElementById('related-posts-container').style.display = 'none';
    return;
  }
  document.getElementById('related-grid').innerHTML = related.map(r => {
    const rSlug = r.slug || '';
    const rHref = rSlug ? 'blog/' + rSlug + '.html' : 'blog_detail.html?id=' + r.id;
    return '<div class="related-card" onclick="location.href=\'' + rHref + '\'"><div class="related-image"><img src="asset/img/' + r.image + '" alt="' + r.title + '" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\'"><span class="fallback">📝</span></div><h4>' + r.title + '</h4><p>' + new Date(r.date).toLocaleDateString('vi-VN') + '</p></div>';
  }).join('');
});'''

detail_html = detail_html.replace(old_script, new_script)

with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'w', encoding='utf-8') as f:
    f.write(detail_html)

print('blog_detail.html updated with new metadata fields')

# Update product.html to use metaDescription from data.json
with open('C:/Users/Tam/Downloads/cellvany/product.html', 'r', encoding='utf-8') as f:
    prod_html = f.read()

old_desc_line = "const desc = (p.description || '').slice(0, 160);"
new_desc_line = "const desc = p.metaDescription || (p.description || '').slice(0, 160);"
prod_html = prod_html.replace(old_desc_line, new_desc_line)

with open('C:/Users/Tam/Downloads/cellvany/product.html', 'w', encoding='utf-8') as f:
    f.write(prod_html)

print('product.html updated to use metaDescription field')

# Clean up temp file
import os
if os.path.exists('C:/Users/Tam/Downloads/cellvany/update_vlog.py'):
    os.remove('C:/Users/Tam/Downloads/cellvany/update_vlog.py')
    print('update_vlog.py cleaned up')

print('All done!')
