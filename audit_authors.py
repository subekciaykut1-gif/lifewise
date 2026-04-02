import os
import re
import json

# Load authors and mappings
with open('c:\\Users\\aykud\\OneDrive\\Desktop\\lifewise-main\\lifewise-main\\data\\authors.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    AUTHORS = data['authors']
    CATEGORY_MAP = data['categoryMapping']

articles_dir = 'c:\\Users\\aykud\\OneDrive\\Desktop\\lifewise-main\\lifewise-main\\content\\articles'
author_counts = {name: 0 for name in AUTHORS.keys()}
author_counts['unknown/fallback'] = 0

def slugify(text):
    return text.lower().replace('[^\\w\\s-]', '').replace('\\s+', '-').replace('-+', '-')

def get_author_key(name, category):
    # 1. By name directly
    if name:
        normalized_name = name.lower().replace(' ', '-')
        if normalized_name in AUTHORS:
            return normalized_name
    
    # 2. By category mapping
    if category in CATEGORY_MAP:
        return CATEGORY_MAP[category]
    
    return None

for filename in os.listdir(articles_dir):
    if filename.endswith('.mdx'):
        with open(os.path.join(articles_dir, filename), 'r', encoding='utf-8') as f:
            content = f.read()
            name_match = re.search(r'^author:\s*(.*)$', content, re.MULTILINE)
            cat_match = re.search(r'^category:\s*(.*)$', content, re.MULTILINE)
            
            author_name = name_match.group(1).strip() if name_match else None
            category = cat_match.group(1).strip() if cat_match else None
            
            key = get_author_key(author_name, category)
            if key:
                author_counts[key] += 1
            else:
                author_counts['unknown/fallback'] += 1

print(json.dumps(author_counts, indent=2))
