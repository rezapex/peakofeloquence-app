{"parsed":{"_id":"content:main.py","body":"import os\nimport re\n\n# Regex pattern to find text within curly braces including newlines\npattern = re.compile(r'\\{#.+?\\.see-footnote\\}', re.DOTALL)\n\n# Function to clean content by removing text within curly braces\ndef clean_content(content):\n    # Use the sub function to replace the pattern with an empty string\n    cleaned_content = re.sub(pattern, '', content)\n    return cleaned_content\n\n# Define the directory path where your markdown files are located\ndirectory_path = '/Users/rezajafar/peakofeloquence-app/content/2.sermons'  # Replace with your directory path\n# Loop through each file in the directory\nfor filename in os.listdir(directory_path):\n    # Check if the file is a markdown file and matches the sermon naming pattern\n    if filename.endswith('.md') and re.match(r'\\d+\\. Sermon_\\d+\\.md', filename):\n        file_path = os.path.join(directory_path, filename)\n        # Open and read the file\n        with open(file_path, 'r', encoding='utf-8') as file:\n            content = file.read()\n        # Clean the content\n        cleaned_content = clean_content(content)\n        # Write the cleaned content back to the file\n        with open(file_path, 'w', encoding='utf-8') as file:\n            file.write(cleaned_content)\n        print(f\"Processed {filename}\")\n\nprint(\"All sermon files have been cleaned.\")\n\n"},"hash":"yiueBvR15F"}