import glob
import os
import shutil
from rembg import remove
from PIL import Image
import io

artifact_dir = r"C:\Users\KIIT\.gemini\antigravity\brain\aa975fb6-42bb-43be-833a-f9bd93d84a9c"
public_dir = r"c:\Users\KIIT\Desktop\DIGIFLOW\public\images"

types = ["cherry", "daisy", "gipsy", "lavender", "leaf_one", "leaf_two", "lily", "orchid", "rose", "sunflower", "tulip", "meadow_bg"]

for t in types:
    files = glob.glob(os.path.join(artifact_dir, f"ghibli_{t}_*.png"))
    if files:
        latest = max(files, key=os.path.getctime)
        dest = os.path.join(public_dir, f"ghibli_{t}.png")
        shutil.copy(latest, dest)
        print(f"Restored {t} from {latest}")
        
        # Remove background without cropping
        with open(dest, 'rb') as i:
            input_data = i.read()
        output_data = remove(input_data)
        with open(dest, 'wb') as o:
            o.write(output_data)
        print(f"Removed bg for {t}")
