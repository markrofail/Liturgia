function get_month_name {
    case $1 in
        1) echo "tout" ;;
        2) echo "baba" ;;
        3) echo "hator" ;;
        4) echo "kiahk" ;;
        5) echo "toba" ;;
        6) echo "amshir" ;;
        7) echo "baramhat" ;;
        8) echo "baramouda" ;;
        9) echo "bashans" ;;
        10) echo "paona" ;;
        11) echo "epep" ;;
        12) echo "mesra" ;;
        13) echo "nasie" ;;
    esac
}

script_directory=$(dirname "$0")
assets_directory=$(cd "${script_directory}/../assets" && pwd)
readings_directory="${assets_directory}/text/readings"


# loop over all html files in directory /assets/text/readings/
for file in ${readings_directory}/*.html
do
    directory=$(dirname $file)
    filename=$(basename $file | cut -d '.' -f 1)
    extension=$(basename $file | cut -d '.' -f 2,3) 

    month=$(echo ${filename} | cut -d '_' -f 1)
    month_name=$(get_month_name ${month})
    day=$(echo ${filename} | cut -d '_' -f 2)

    output_file="${directory}/${month_name}-${day}.${extension}"
    
    mv ${file} ${output_file}
    echo "Renamed ${file} tp ${output_file}"
done
