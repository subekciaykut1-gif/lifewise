import re
import os

def optimize():
    file_path = 'next.config.ts'
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match individual redirect objects
    pattern = r'\{\s*source:\s*\'([^\']+)\',\s*destination:\s*\'([^\']+)\',\s*permanent:\s*true,?\s*\}'
    
    matches = list(re.finditer(pattern, content))
    print(f"Found {len(matches)} redirects")

    locales = ['en', 'es', 'fr', 'de', 'pt']
    
    # Map of (logical_source, logical_dest) -> [list of indices in matches]
    logical_map = {}
    
    for i, m in enumerate(matches):
        src, dest = m.groups()
        found_locale = None
        for loc in locales:
            if src.startswith(f"/{loc}/") and dest.startswith(f"/{loc}/"):
                found_locale = loc
                break
        
        if found_locale:
            logical_src = src[len(found_locale)+1:] # /category/slug
            logical_dest = dest[len(found_locale)+1:] # /category/base
            key = (logical_src, logical_dest)
            if key not in logical_map:
                logical_map[key] = []
            logical_map[key].append(i)
        else:
            # Not a standard 5-locale redirect
            key = (src, dest)
            if key not in logical_map:
                logical_map[key] = []
            logical_map[key].append(i)

    # Find the start and end of the redirects array
    array_start_match = re.search(r'async redirects\(\) \{\s*return \[', content)
    if not array_start_match:
        print("Could not find redirects array start")
        return
    
    array_start_pos = array_start_match.end()
    array_end_match = re.search(r'\];\s*\}', content[array_start_pos:])
    if not array_end_match:
        print("Could not find redirects array end")
        return
    
    array_end_pos = array_start_pos + array_end_match.start()
    
    # We will preserve the first redirect if it's the host redirect
    # source: '/:path*', has: [{ type: 'host', value: 'wisetips.co' }]
    host_redirect_pattern = r'\{\s*source:\s*\'/:path\*\'[^\}]*host[^\}]*\}'
    host_match = re.search(host_redirect_pattern, content[array_start_pos:array_end_pos])
    
    optimized_block = []
    if host_match:
        optimized_block.append("\n      " + host_match.group(0) + ",")
    
    seen_indices = set()
    if host_match:
        # Avoid duplicating the host redirect if it was caught by the general pattern (unlikely but safe)
        pass

    for (l_src, l_dest), indices in logical_map.items():
        # Check if we have all 5 locales for this logical mapping
        # and none of them were already processed (like by the host_match if it overlapped)
        if len(indices) == 5 and l_src.startswith('/'):
            optimized_block.append(f"""
      {{
        source: '/:locale(en|es|fr|de|pt){l_src}',
        destination: '/:locale{l_dest}',
        permanent: true,
      }},""")
        else:
            for idx in indices:
                src, dest = matches[idx].groups()
                # Skip the host redirect if we already added it manually
                if host_match and host_match.group(0).find(src) != -1 and host_match.group(0).find(dest) != -1:
                    continue
                optimized_block.append(f"""
      {{
        source: '{src}',
        destination: '{dest}',
        permanent: true,
      }},""")

    final_content = content[:array_start_pos] + "".join(optimized_block) + "\n    " + content[array_end_pos:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"Optimization complete. Reduced entries to {len(optimized_block)}")

if __name__ == "__main__":
    optimize()
