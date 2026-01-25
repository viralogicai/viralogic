from rembg import remove
from PIL import Image
import io

input_path = 'uploaded_image_1769173647267.png'
output_path = 'public/logo-brand.png'

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
