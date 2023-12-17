#!/bin/bash

script_directory=$(dirname "$0")
assets_directory=$(cd "${script_directory}/../assets-raw" && pwd)
output_directory="${assets_directory}/text/readings"

start='2023-12-01'
end='2026-01-01'

current=$(gdate -d $start +%Y-%m-%d)
while [[ "${current}" != "${end}" ]]
do
    day=$(gdate -d "$current" '+%d')
    month=$(gdate -d "$current" '+%m')
    year=$(gdate -d "$current" '+%Y')

    wget -q "https://www.copticchurch.net/readings?g_year=${year}&g_month=${month}&g_day=${day}" -O "${output_directory}/${year}-${month}-${day}.en.html"
    echo "Downloaded ${output_directory}/${year}-${month}-${day}.en.html"

    wget -q "https://www.copticchurch.net/readings/ar?g_year=${year}&g_month=${month}&g_day=${day}" -O "${output_directory}/${year}-${month}-${day}.ar.html"
    echo "Downloaded ${output_directory}/${year}-${month}-${day}.ar.html"

    current=$(gdate --date "$current + 1 day" +"%Y-%m-%d")
done

echo "Finished crawling readings from ${start} to ${end}"

# use sed to convert self-closing anchor tags <a .* /> to closed anchor tags <a .*></a>

find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="matins" />|<a name="matins"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="vespers" />|<a name="vespers"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="liturgy" />|<a name="liturgy"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="liturgy-pauline" />|<a name="liturgy-pauline"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="liturgy-catholic" />|<a name="liturgy-catholic"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="liturgy-acts" />|<a name="liturgy-acts"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="liturgy-synaxarium" />|<a name="liturgy-synaxarium"></a>|g' "2023-12-01.en.html" {} \;
find . -type f -name "${output_directory}/*.html" -exec sed  -i '' -e 's|<a name="liturgy-gospel" />|<a name="liturgy-gospel"></a>|g' "2023-12-01.en.html" {} \;
