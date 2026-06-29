"""
Fix responsive/mobile CSS across all HTML files.
Adds missing media queries and improves existing ones.
"""

import re
import os

BASE = 'C:/Users/Tam/Downloads/cellvany'

files = [
    'about.html',
    'blog.html',
    'blog_detail.html',
    'cart.html',
    'checkout.html',
    'contact.html',
    'index.html',
    'product.html',
    'products.html',
    'shop.html',
    'wishlist.html',
]

# ============== blog_detail.html ==============
# Needs major mobile overhaul
blog_detail_mobile = """
@media (max-width: 768px) {
  .blog-detail-header h1 { font-size: 24px; }
  .blog-detail-meta { flex-direction: column; gap: 8px; }
  .blog-detail-image { height: 220px; }
  .blog-detail-content { font-size: 15px; }
  .blog-detail-content h3 { font-size: 19px; }
  .eeat-author-box { flex-direction: column; align-items: center; text-align: center; }
  .ymyl-disclaimer, .ymyl-reviewed-by { font-size: 14px; }
  .blog-detail-tags { justify-content: center; }
  .blog-detail-nav { flex-direction: column; gap: 10px; text-align: center; }
  .related-grid { grid-template-columns: 1fr; }
  .internal-links { flex-direction: column; align-items: stretch; }
  .internal-links a { text-align: center; }
  .breadcrumb-nav { font-size: 13px; }
}
@media (max-width: 480px) {
  .blog-detail-header h1 { font-size: 20px; }
  .blog-detail-image { height: 180px; }
  .blog-detail-content { font-size: 14px; }
  .blog-detail-content h3 { font-size: 17px; }
  .blog-detail-meta { font-size: 12px; }
  .disclaimer-box { padding: 15px; }
  .eeat-author-avatar { width: 40px; height: 40px; font-size: 15px; }
}
"""

# ============== product.html ==============
# Add 480px breakpoint
product_mobile = """
@media (max-width: 480px) {
  .product-detail { grid-template-columns: 1fr; }
  .related-grid { grid-template-columns: 1fr; }
  .product-detail .product-info h1 { font-size: 22px; }
  .product-price { font-size: 22px; }
  .breadcrumb h1 { font-size: 28px; }
  .product-actions { flex-direction: column; }
  .btn { width: 100%; text-align: center; }
}
"""

# ============== about.html ==============
about_mobile = """
@media (max-width: 480px) {
  .ve-chung-toi-section { padding: 30px 15px; }
  .ve-chung-toi-image { height: 200px; }
  .features { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
}
"""

# ============== cart.html ==============
# Has only 480px, needs 768px
cart_mobile = """
@media (max-width: 768px) {
  .cart-container { grid-template-columns: 1fr; }
  .cart-items { overflow-x: auto; }
  .cart-table { min-width: 500px; }
}
"""

# ============== checkout.html ==============
# Has only 768px, needs 480px
checkout_mobile = """
@media (max-width: 480px) {
  .checkout-container { padding: 15px; }
  .form-group { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .order-summary { font-size: 14px; }
}
"""

# ============== contact.html ==============
# Has only 768px, needs 480px
contact_mobile = """
@media (max-width: 480px) {
  .contact-content { padding: 20px 15px; }
  .contact-info { text-align: center; }
  .form-row { grid-template-columns: 1fr; }
  .breadcrumb h1 { font-size: 28px; }
}
"""

# ============== products.html ==============
# Has 1024px and 480px, needs 768px
products_mobile = """
@media (max-width: 768px) {
  .products-container { grid-template-columns: 1fr; }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
"""

fixes = {
    'blog_detail.html': blog_detail_mobile,
    'product.html': product_mobile,
    'about.html': about_mobile,
    'cart.html': cart_mobile,
    'checkout.html': checkout_mobile,
    'contact.html': contact_mobile,
    'products.html': products_mobile,
}

for fname, css in fixes.items():
    path = os.path.join(BASE, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if the first @media rule already contains similar content
    # We append our new rules before </style>
    # But first, check if we're duplicating

    # Find the last @media block and insert after it, before </style>
    # Actually, just append before </style> - CSS cascade handles duplicates

    # Remove any existing rules we're about to add to avoid duplication
    # Simple approach: check if our key selectors already exist in media queries

    # For blog_detail.html, replace the entire existing mobile section
    if fname == 'blog_detail.html':
        # Remove existing 768px and 480px blocks
        content = re.sub(
            r'@media \(max-width: 768px\) \{.*?\}',
            '', content, flags=re.DOTALL
        )
        content = re.sub(
            r'@media \(max-width: 480px\) \{.*?\}',
            '', content, flags=re.DOTALL
        )

    # For product.html, check if 480px already exists with related-grid
    if fname == 'product.html':
        if '@media (max-width: 480px)' in content and 'related-grid' in content.split('@media (max-width: 480px)')[1].split('}')[0]:
            css = ''

    # For cart.html, check if 768px already exists
    if fname == 'cart.html':
        if '@media (max-width: 768px)' in content:
            css = ''

    # For checkout.html, check if 480px already exists
    if fname == 'checkout.html':
        if '@media (max-width: 480px)' in content:
            css = ''

    # For contact.html, check if 480px already exists
    if fname == 'contact.html':
        if '@media (max-width: 480px)' in content:
            css = ''

    # For products.html, check if 768px already exists
    if fname == 'products.html':
        if '@media (max-width: 768px)' in content:
            css = ''

    if css:
        # Insert before </style>
        content = content.replace('</style>', css + '</style>', 1)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {fname}')
    else:
        print(f'Skipped (already has rules): {fname}')

print('\nDone!')
