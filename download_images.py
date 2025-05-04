import requests
import os

def download_image(query, filename):
    # Create images directory if it doesn't exist
    if not os.path.exists('project_images'):
        os.makedirs('project_images')
    
    # Format the search query
    search_query = query.replace(' ', '+')
    
    # Using a placeholder API endpoint (in real use, you'd need a proper API key)
    # This is just a demonstration script
    try:
        print(f"Searching for images related to: {query}")
        # In a real implementation, you would use a proper image search API
        # For demonstration, we'll just print what we're looking for
        print(f"Would download image for {query} to {filename}")
    except Exception as e:
        print(f"Error downloading {query}: {e}")

# Project names to search for
projects = [
    "Jarvis AI Assistant voice interface",
    "Netflix Clone streaming website",
    "Elegance Fashion E-commerce website",
    "Pomodoro Timer productivity app",
    "Disney Plus Clone streaming service",
    "Instagram Clone social media app",
    "VR Based Tour Website virtual reality",
    "Interactive To-Do App task manager"
]

# Download images for each project
for i, project in enumerate(projects):
    download_image(project, f"project_images/project_{i+1}.jpg")

print("\nNote: This script is just a demonstration. In a real project:")
print("1. You'd need to use a proper image search API with valid credentials")
print("2. You'd need to handle copyright and licensing concerns")
print("3. You'd need to add error handling and rate limiting")
