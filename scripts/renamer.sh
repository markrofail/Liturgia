#!/bin/bash
input="martyrs"

# Specify the prefix to look for
prefix="${input}-"

# Create a directory to move the files
mkdir -p ${input}

# Loop through files with the specified prefix
for file in ${prefix}*; do
    if [ -e "$file" ]; then
        # Extract the filename without the prefix
        new_name="${file#$prefix}"

        # Move the file to the destination directory with the new name
        mv "$file" "${input}/$new_name"

        echo "Moved $file to ${input}/$new_name"
    fi
done