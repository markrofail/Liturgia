#!/bin/bash

# Traverse the current directory and its subdirectories
cd "assets/text"
find . -type f -name "*.yml" -print0 | while IFS= read -r -d $'\0' yml_file; do
    # Generate the corresponding JSON filename
    json_file="${yml_file%.yml}.json"

    # Convert YAML to JSON using a tool like `yq` or `jq`
    # Make sure to install the necessary tool before running the script
    # Example with `yq`:
    yq -o=json "$yml_file" > "$json_file"

    # Example with `jq`:
    # cat "$yml_file" | jq '.' > "$json_file"

    # Note: Uncomment and use either the `yq` or `jq` example based on your preference and tool availability

    echo "Converted $yml_file to $json_file"
done

echo "Conversion complete."