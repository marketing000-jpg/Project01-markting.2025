import os
import re

base_dir = '/Users/volturia/Desktop/Guidonia Marketing Agency'

logo_path_root = 'assets/img/logo/GUIDONIA_MARKETING_AGENCY_LOGO.png'

for dirpath, _, filenames in os.walk(base_dir):
    for filename in filenames:
        if filename.endswith('.html'):
            filepath = os.path.join(dirpath, filename)
            
            # Determine relative path from this file to the root
            rel_path_to_root = os.path.relpath(base_dir, dirpath)
            if rel_path_to_root == '.':
                rel_path_to_root = ''
            else:
                rel_path_to_root = rel_path_to_root + '/'
                
            logo_rel_path = rel_path_to_root + logo_path_root
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 1. Substitute the logo text in the header/footer
            # Find: <a href="PATH" class="logo">Guidonia <em>Marketing</em></a>
            # Replace: <a href="PATH" class="logo"><img src="LOGO_PATH" alt="Guidonia Marketing Logo" class="brand-img">Guidonia <em>Marketing</em></a>
            content = re.sub(
                r'(<a href="[^"]+" class="logo">)(\s*Guidonia <em>Marketing</em>)',
                rf'\1<img src="{logo_rel_path}" alt="Guidonia Marketing Logo" class="brand-logo">\2',
                content
            )
            
            # 2. Add favicon if not present
            if '<link rel="icon"' not in content:
                favicon_tag = f'\n  <link rel="icon" type="image/png" href="{logo_rel_path}">\n</head>'
                content = content.replace('</head>', favicon_tag)
                
            # 3. Update schema logo if present
            content = content.replace(
                '"https://guidoniamarketing.agency/logo.png"',
                '"https://guidoniamarketing.agency/assets/img/logo/GUIDONIA_MARKETING_AGENCY_LOGO.png"'
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Updated HTML files with logo.")
