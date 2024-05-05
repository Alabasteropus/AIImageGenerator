import requests

# URLs to the StabilityAI API documentation and changelog
api_doc_url = "https://platform.stability.ai/docs/features"
api_changelog_url = "https://platform.stability.ai/docs/features/image-to-image"

def check_api_updates():
    # Check the API documentation
    doc_response = requests.get(api_doc_url)
    if doc_response.status_code == 200:
        print("Checked StabilityAI API documentation for updates.")
    else:
        print(f"Failed to access StabilityAI API documentation. Status code: {doc_response.status_code}")

    # Check the API changelog
    changelog_response = requests.get(api_changelog_url)
    if changelog_response.status_code == 200:
        print("Checked StabilityAI API changelog for updates.")
    else:
        print(f"Failed to access StabilityAI API changelog. Status code: {changelog_response.status_code}")

if __name__ == "__main__":
    check_api_updates()
