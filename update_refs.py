import os
import re

def update_references(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.html')):
                filepath = os.path.join(root, file)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace references to images in /Photos/
                # E.g. /Photos/image.png -> /Photos/image.webp
                # This regex looks for /Photos/[^"']+.(png|jpg|jpeg)
                pattern = r'(/Photos/[a-zA-Z0-9_.-]+)\.(png|jpg|jpeg)'
                new_content = re.sub(pattern, r'\1.webp', content)
                
                # Specifically in App.jsx, let's add loading="lazy" to imgs that don't have it
                if file == 'App.jsx' or file == 'ChessHeroScene.jsx':
                    # Find all <img ...> tags that do not contain loading=
                    # It's a bit tricky with regex, let's just do a simple replacement if it's safe, 
                    # but maybe it's safer to just let the user know, or use multi_replace_file_content for loading="lazy".
                    pass
                
                if content != new_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated references in {filepath}")

if __name__ == "__main__":
    update_references("src")
