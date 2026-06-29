with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the JS section that renders blog detail
old_js = """document.title = post.title + ' - CELLVANY';
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
 `;"""

new_js = """const h1 = post.h1 || post.title;
document.title = h1 + ' - CELLVANY';
const metaDesc = document.querySelector('meta[name=\"description\"]');
if (metaDesc && post.metaDescription) metaDesc.setAttribute('content', post.metaDescription);
const ogDesc = document.querySelector('meta[property=\"og:description\"]');
if (ogDesc && post.metaDescription) ogDesc.setAttribute('content', post.metaDescription);
const twDesc = document.querySelector('meta[name=\"twitter:description\"]');
if (twDesc && post.metaDescription) twDesc.setAttribute('content', post.metaDescription);
document.getElementById('breadcrumb-title').textContent = h1;

const authorLine = post.author_name
 ? '<span>👤 <strong>' + post.author_name + '</strong>' + (post.author_credential ? ' – ' + post.author_credential : '') + '</span>'
 : '<span>👤 ${post.author}</span>';
const dateStr = new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
const categoryStr = post.category || '';

let body = '';
if (post.medical_disclaimer) {
 body += '<div class="disclaimer-box"><h4>⚠️ Lưu ý Y tế</h4><p>' + post.medical_disclaimer + '</p></div>';
}
if (post.ymyl_reviewed_by) {
 body += '<div class="disclaimer-box" style="background:#e8f5e9;border-left-color:#27ae60"><h4>✅ Bài viết được review bởi</h4><p><strong>' + post.ymyl_reviewed_by + '</strong></p>' + (post.ymyl_sources ? '<p style=\"font-size:13px;color:#666;margin-top:8px\">Nguồn: ' + post.ymyl_sources + '</p>' : '') + '</div>';
}
const h2s = [post.h2_1, post.h2_2, post.h2_3].filter(Boolean);
const contentParts = (post.content || '').split('<h3>').slice(1);
let contentIdx = 0;
const renderedH2s = h2s.map((h2, i) => {
 const subContent = contentIdx < contentParts.length ? '<p>' + contentParts[contentIdx++].split('</h3>').slice(1).join('</h3>') + '</p>' : '';
 return '<h3>' + h2 + '</h3>' + subContent;
}).join('');
body += '<div class=\"blog-detail-content cv-reveal\">' + (renderedH2s || post.content || '') + '</div>';

document.getElementById('blog-detail-container').innerHTML = `
 <div class="blog-detail-header cv-anim-up">
 <h1>${h1}</h1>
 <div class="blog-detail-meta">
 ${authorLine}
 <span>📅 ${dateStr}</span>
 ${categoryStr ? '<span>📂 ' + categoryStr + '</span>' : ''}
 </div>
 </div>
 <div class="blog-detail-image cv-reveal">
 <img src="asset/img/${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
 <span class="fallback">📝</span>
 </div>
 ${body}
 <div class="blog-detail-tags cv-reveal">
 ${(post.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}
 </div>
 <div class="blog-detail-nav">
 <a href="blog.html">← Quay lại Blog</a>
 <a href="shop.html">Mua Sắm Ngay →</a>
 </div>
 `;"""

content = content.replace(old_js, new_js)

# Add Article Schema JSON-LD before <link rel="icon" type="image/png" href="asset/logo.png"> </head>
schema_block = """ <script type="application/ld+json" id="article-schema">
 {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": "${post.title}",
 "description": "${post.metaDescription || post.title}",
 "image": "https://cellvany.vn/asset/img/${post.image}",
 "datePublished": "${post.date}",
 "dateModified": "${post.dateModified || post.date}",
 "author": {
 "@type": "Person",
 "name": "${post.author_name || post.author}"
 },
 "publisher": {
 "@type": "Organization",
 "name": "CELLVANY",
 "logo": {
 "@type": "ImageObject",
 "url": "https://cellvany.vn/asset/images/cellvany-logo.webp"
 }
 }
 }
 </script>"""

content = content.replace(
    '<link rel="icon" type="image/png" href="asset/logo.png"> </head>',
    schema_block + '\n<link rel="icon" type="image/png" href="asset/logo.png"> </head>'
)

with open('C:/Users/Tam/Downloads/cellvany/blog_detail.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('blog_detail.html updated')
