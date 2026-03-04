import os
import re

base_dir = '/Users/volturia/Desktop/Guidonia Marketing Agency'

logo_path_root = 'assets/img/logo/guidonia_marketing_logo_v9.png'

for dirpath, _, filenames in os.walk(base_dir):
    for filename in filenames:
        if filename.endswith('.html'):
            filepath = os.path.join(dirpath, filename)
            
            # Determine relative path from this file to the root
            rel_path_to_root = os.path.relpath(base_dir, dirpath)
            if rel_path_to_root == '.':
                rel_prefix = ''
            else:
                rel_prefix = rel_path_to_root + '/'
                
            logo_rel_path = rel_prefix + logo_path_root
            
            favicon_path_root = 'assets/img/favicon/favicon_guidonia_marketing_logo_v9.png'
            favicon_rel_path = rel_prefix + favicon_path_root
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 1. Substitute the logo text in the header/footer
            content = re.sub(
                r'(<a href="[^"]+" class="logo">)(\s*Guidonia <em>Marketing</em>)',
                rf'\1<img src="{logo_rel_path}" alt="Guidonia Marketing Logo" class="brand-logo">\2',
                content
            )
            
            # 2. Add or update favicon
            if '<link rel="icon"' not in content:
                favicon_tag = f'\n  <link rel="icon" type="image/png" href="{favicon_rel_path}?v=9">\n</head>'
                content = content.replace('</head>', favicon_tag)
            else:
                # Update existing favicon
                content = re.sub(
                    r'<link rel="(?:shortcut )?icon" type="image/[^"]+" href="[^"]+">',
                    f'<link rel="icon" type="image/png" href="{favicon_rel_path}?v=9">',
                    content
                )
                
            # 3. Update schema logo if present
            content = re.sub(
                r'"https://guidoniamarketing\.agency/assets/img/logo/[^"]*\.png"',
                f'"https://guidoniamarketing.agency/{logo_path_root}"',
                content
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Updated HTML files with logo.")
