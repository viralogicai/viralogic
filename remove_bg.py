from rembg import remove
from PIL import Image
import io

input_path = 'anh download.jpg'
output_path = 'public/product-box-transparent.png'

print(f"Processing {input_path}...")

try:
    with open(input_path, 'rb') as i:
        input_data = i.read()
        subject = remove(input_data)
        
    with open(output_path, 'wb') as o:
        o.write(subject)
        
    print("Background removed successfully!")
except Exception as e:
    print(f"Error: {e}")
