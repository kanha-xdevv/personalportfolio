import requests
import os
from PIL import Image
from io import BytesIO

# Create project_images directory if it doesn't exist
if not os.path.exists('project_images'):
    os.makedirs('project_images')

# URL for VR image
url = "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg"

try:
    # Get image from URL
    response = requests.get(url)
    if response.status_code == 200:
        # Open the image
        img = Image.open(BytesIO(response.content))
        
        # Resize to a reasonable size for the portfolio
        img = img.resize((800, int(800 * img.height / img.width)))
        
        # Save the image
        output_path = "project_images/project_7.jpg"
        img.save(output_path)
        print(f"Downloaded image to {output_path}")
    else:
        print(f"Failed to download image: HTTP {response.status_code}")
except Exception as e:
    print(f"Error downloading image: {e}")
