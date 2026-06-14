from PIL import Image
import glob
import os

images = glob.glob(r"c:\Users\KIIT\Desktop\DIGIFLOW\public\images\ghibli_*.png")
for img_path in images:
    try:
        img = Image.open(img_path)
        w, h = img.size
        # The flower bloom is usually in the top half. 
        # By keeping only the top 60%, we slice off the stem entirely.
        cropped = img.crop((0, 0, w, int(h * 0.60)))
        cropped.save(img_path)
        print(f"Cropped {os.path.basename(img_path)}")
    except Exception as e:
        print(f"Failed to crop {img_path}: {e}")
