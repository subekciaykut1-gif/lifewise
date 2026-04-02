import os
import re

articles_dir = 'c:\\Users\\aykud\\OneDrive\\Desktop\\lifewise-main\\lifewise-main\\content\\articles'
categories = {}

for filename in os.listdir(articles_dir):
    if filename.endswith('.mdx'):
        with open(os.path.join(articles_dir, filename), 'r', encoding='utf-8') as f:
            content = f.read()
            match = re.search(r'^category:\s*(.*)$', content, re.MULTILINE)
            if match:
                cat = match.group(1).strip()
                categories[cat] = categories.get(cat, 0) + 1

for cat, count in sorted(categories.items()):
    print(f"{cat}: {count}")
