import os
import re

# Regex pattern to find text within curly braces including newlines
pattern = re.compile(r'\{#.+?\.see-footnote\}', re.DOTALL)

# Function to clean content by removing text within curly braces
def clean_content(content):
    # Use the sub function to replace the pattern with an empty string
    cleaned_content = re.sub(pattern, '', content)
    return cleaned_content

# Define the directory path where your markdown files are located
directory_path = '/Users/rezajafar/peakofeloquence-app/content/2.sermons'  # Replace with your directory path
# Loop through each file in the directory
for filename in os.listdir(directory_path):
    # Check if the file is a markdown file and matches the sermon naming pattern
    if filename.endswith('.md') and re.match(r'\d+\. Sermon_\d+\.md', filename):
        file_path = os.path.join(directory_path, filename)
        # Open and read the file
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        # Clean the content
        cleaned_content = clean_content(content)
        # Write the cleaned content back to the file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(cleaned_content)
        print(f"Processed {filename}")

print("All sermon files have been cleaned.")

