import requests
import os
import json

def download_image(query, filename, api_key=None):
    # Create project_images directory if it doesn't exist
    if not os.path.exists('project_images'):
        os.makedirs('project_images')
    
    # Format the search query
    search_query = query.replace(' ', '+')
    
    # Using Unsplash API (you would need to provide your own API key)
    if api_key:
        try:
            # Search for an image
            search_url = f"https://api.unsplash.com/search/photos?query={search_query}&per_page=1"
            headers = {"Authorization": f"Client-ID {api_key}"}
            response = requests.get(search_url, headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if data['results']:
                    # Get the image URL
                    image_url = data['results'][0]['urls']['regular']
                    
                    # Download the image
                    image_response = requests.get(image_url)
                    if image_response.status_code == 200:
                        with open(filename, 'wb') as f:
                            f.write(image_response.content)
                        print(f"Downloaded image for {query} to {filename}")
                    else:
                        print(f"Failed to download image: {image_response.status_code}")
                else:
                    print(f"No images found for query: {query}")
            else:
                print(f"API request failed: {response.status_code}")
                
        except Exception as e:
            print(f"Error downloading {query}: {e}")
    else:
        print(f"No API key provided for downloading image for {query}")

# Project names to search for with specific descriptive terms
projects = [
    "AI voice assistant interface futuristic",
    "Netflix streaming platform interface",
    "Fashion e-commerce website elegant",
    "Pomodoro timer productivity app",
    "Disney Plus streaming service interface",
    "Instagram social media app interface",
    "Virtual reality 3D tour website",
    "Task management to-do app interface"
]

# Main function
def main():
    # Get API key from environment or user input
    api_key = os.environ.get('UNSPLASH_API_KEY')
    if not api_key:
        api_key = input("Enter your Unsplash API key (or press Enter to skip): ")
    
    if api_key:
        # Download images for each project
        for i, project in enumerate(projects):
            output_file = f"project_images/project_{i+1}.jpg"
            download_image(project, output_file, api_key)
    else:
        print("\nNo API key provided. Cannot download images.")
        print("To use this script, you need to sign up for an Unsplash developer account")
        print("and create an API key at: https://unsplash.com/developers")

if __name__ == "__main__":
    main()
