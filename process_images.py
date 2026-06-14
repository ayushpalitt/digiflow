import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import onnxruntime
except ImportError:
    print("Installing onnxruntime...")
    install('onnxruntime')

try:
    import rembg
except ImportError:
    print("Installing rembg...")
    install('rembg')

from rembg import remove
from PIL import Image
import glob
import os
import io

images = glob.glob(r"c:\Users\KIIT\Desktop\DIGIFLOW\public\images\ghibli_*.png")
for img_path in images:
    try:
        with open(img_path, 'rb') as i:
            input_data = i.read()
            
        output_data = remove(input_data)
        
        img = Image.open(io.BytesIO(output_data)).convert("RGBA")
        w, h = img.size
        
        # Crop top 65% to isolate the bloom
        cropped = img.crop((0, 0, w, int(h * 0.65)))
        cropped.save(img_path, "PNG")
        
        print(f"Processed cleanly: {os.path.basename(img_path)}")
    except Exception as e:
        print(f"Failed to process {img_path}: {e}")
