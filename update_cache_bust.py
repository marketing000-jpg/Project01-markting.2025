import re

file_path = '/Users/volturia/Desktop/Guidonia Marketing Agency/index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any .png' string with .png?v=2' inside the stories array
new_content = re.sub(r'(\/stories\/[^\.]+\.png)(?![\?])\'', r"\1?v=2'", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated index.html to bust cache.")
