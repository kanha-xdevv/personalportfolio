import requests
import os
from PIL import Image
from io import BytesIO

# Create project_images directory if it doesn't exist
if not os.path.exists('project_images'):
    os.makedirs('project_images')

# List of Free License Image URLs (from Pexels)
image_urls = [
    # 1. Jarvis AI Assistant (blue futuristic interface)
    "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg",
    # 2. Netflix Clone (streaming service interface)
    "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg",
    # 3. Elegance Fashion E-commerce (fashion shopping)
    "https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg",
    # 4. Pomodoro Timer (productivity timer)
    "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    # 5. Disney+ Clone (entertainment streaming)
    "https://images.pexels.com/photos/918281/pexels-photo-918281.jpeg",
    # 6. Instagram Clone (social media interface)
    "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
    # 7. VR-Based Tour Website (VR headset)
    "https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg",
    # 8. Interactive To-Do App (task manager)
    "https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg"
]

# Download each image
for i, url in enumerate(image_urls):
    try:
        # Get image from URL
        response = requests.get(url)
        if response.status_code == 200:
            # Open the image
            img = Image.open(BytesIO(response.content))
            
            # Resize to a reasonable size for the portfolio
            img = img.resize((800, int(800 * img.height / img.width)))
            
            # Save the image
            output_path = f"project_images/project_{i+1}.jpg"
            img.save(output_path)
            print(f"Downloaded image {i+1} to {output_path}")
        else:
            print(f"Failed to download image {i+1}: HTTP {response.status_code}")
    except Exception as e:
        print(f"Error downloading image {i+1}: {e}")

print("\nImage download complete. Images saved to project_images/ directory.")
