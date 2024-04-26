import os

# Define the sidebar structure
sidebar_structure = [
    {
        "title": "Introduction",
        "items": [
            "About Peak of Eloquence",
            "Purpose and Goals"
        ]
    },
    {
        "title": "About Nahjul Balagha",
        "items": [
            "Overview",
            "Significance",
            {
                "title": "Contents",
                "items": [
                    "Sermons",
                    "Letters",
                    "Sayings"
                ]
            }
        ]
    },
    {
        "title": "Authenticity",
        "items": [
            "Compilation History",
            "Chain of Narration",
            "Scholarly Opinions"
        ]
    },
    {
        "title": "About Imam Ali",
        "items": [
            "Early Life",
            "Caliphate",
            "Teachings and Wisdom",
            "Legacy"
        ]
    },
    {
        "title": "Historical Context",
        "items": [
            "Pre-Islamic Arabia",
            "Rise of Islam",
            "Succession after Prophet Muhammad",
            "Socio-Political Landscape"
        ]
    },
    {
        "title": "Study Resources",
        "items": [
            "Recommended Books",
            "Online Resources",
            "Courses and Seminars"
        ]
    },
    {
        "title": "Contributing",
        "items": [
            "How to Contribute",
            "Guidelines",
            "Contact Information"
        ]
    }
]

# Function to create files and directories recursively
def create_structure(structure, path=""):
    for item in structure:
        if isinstance(item, dict):
            directory = os.path.join(path, item["title"])
            os.makedirs(directory, exist_ok=True)
            create_structure(item["items"], directory)
        else:
            file_name = item.lower().replace(" ", "-") + ".md"
            file_path = os.path.join(path, file_name)
            with open(file_path, "w") as file:
                file.write(f"---\ntitle: {item}\ndescription:\n---\n\n")
                file.write("## Introduction\n\n")
                file.write("> Quote or verse in original language\n\n")
                file.write("> Translation of the quote or verse\n\n")
                file.write("<!-- Add your introduction here -->\n\n")
                file.write("## Content\n\n")
                file.write("<!-- Add your main content here -->\n\n")
                file.write("## Lessons and Insights\n\n")
                file.write("<!-- Add lessons and insights here -->\n\n")
                file.write("## Conclusion\n\n")
                file.write("<!-- Add your conclusion here -->\n\n")
                file.write("## Alternative Sources\n\n")
                file.write("<!-- Add alternative sources or references here -->\n")

# Create the sidebar structure
create_structure(sidebar_structure)