from PIL import Image
import glob
import os

def remove_white_bg(image_path):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Check if the pixel is near white
        # We use a threshold of 230 to catch off-whites
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Fully transparent
            newData.append((255, 255, 255, 0))
        else:
            # We can also do a smooth alpha blend for edges, but let's keep it simple first
            newData.append(item)
            
    img.putdata(newData)
    img.save(image_path, "PNG")

images = glob.glob(r"c:\Users\KIIT\Desktop\DIGIFLOW\public\images\ghibli_*.png")
for img_path in images:
    remove_white_bg(img_path)
    print(f"Processed {os.path.basename(img_path)}")
