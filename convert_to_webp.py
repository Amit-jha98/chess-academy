import os
from PIL import Image

def optimize_images(directory):
    total_saved = 0
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            
            # Read original size
            original_size = os.path.getsize(filepath)
            
            try:
                # Open image
                with Image.open(filepath) as img:
                    # Convert to RGB if necessary (WebP supports RGBA, but just in case)
                    if img.mode not in ('RGB', 'RGBA'):
                        img = img.convert('RGBA')
                    
                    # Create new filename
                    base_name = os.path.splitext(filename)[0]
                    new_filepath = os.path.join(directory, f"{base_name}.webp")
                    
                    # Save as WebP
                    img.save(new_filepath, 'webp', quality=85, method=6)
                
                # Check new size
                new_size = os.path.getsize(new_filepath)
                saved = original_size - new_size
                total_saved += saved
                
                print(f"Converted {filename} to WebP. Saved {saved / 1024:.2f} KB.")
                
                # Delete original
                os.remove(filepath)
                
            except Exception as e:
                print(f"Error converting {filename}: {e}")

    print(f"\nTotal space saved: {total_saved / (1024 * 1024):.2f} MB")

if __name__ == "__main__":
    optimize_images("public/Photos")
