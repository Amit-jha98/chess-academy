import os
from PIL import Image

def generate_icons(input_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    try:
        # Open the image
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size

        # We want a square image for the icon to avoid stretching.
        # Create a new transparent square image with dimensions equal to the max of width and height
        max_dim = max(width, height)
        square_img = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
        
        # Paste the original image into the center of the new square image
        offset = ((max_dim - width) // 2, (max_dim - height) // 2)
        square_img.paste(img, offset)

        # Define standard sizes
        sizes = {
            "favicon-16x16.png": (16, 16),
            "favicon-32x32.png": (32, 32),
            "apple-touch-icon.png": (180, 180),
            "android-chrome-192x192.png": (192, 192),
            "android-chrome-512x512.png": (512, 512),
            "logo-square.png": (1024, 1024)
        }

        # Generate PNGs
        for name, size in sizes.items():
            resized = square_img.resize(size, Image.Resampling.LANCZOS)
            out_path = os.path.join(output_dir, name)
            resized.save(out_path, format="PNG")
            print(f"Generated {out_path}")

        # Generate ICO (combines 16x16, 32x32, 48x48)
        ico_path = os.path.join(output_dir, "favicon.ico")
        icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
        square_img.save(ico_path, format="ICO", sizes=icon_sizes)
        print(f"Generated {ico_path}")
        print("Success: Generated all standard sizes and padded image to a square aspect ratio.")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    input_image = "public/logo.png"
    output_directory = "public"
    generate_icons(input_image, output_directory)
