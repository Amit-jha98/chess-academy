import re

def add_lazy_loading(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all <img> tags
    # Ignore /logo.png since it's above the fold
    def replacer(match):
        img_tag = match.group(0)
        
        # Don't add lazy loading if it's the logo
        if '/logo.png' in img_tag or 'loading=' in img_tag:
            return img_tag
        
        # Add loading="lazy" right after <img
        return img_tag.replace('<img', '<img loading="lazy"', 1)

    new_content = re.sub(r'<img[^>]+>', replacer, content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Added lazy loading to images in {filepath}")

if __name__ == "__main__":
    add_lazy_loading('src/App.jsx')
