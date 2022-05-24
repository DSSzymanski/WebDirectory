const initSearchBar = () => {
    document.getElementById("search-input").addEventListener("keyup", (event) => {
        updatePage();
    });
}

const updatePage = () => {
    //setup constant strings
    const location_container_initial_class_name = "location-container";
    const phone_number_row_initial_class_name = "phone-data-row";
    const none_class_name = "none";

    //get document elements needed
    let search_bar_text = document.getElementById("search-input").value;
    let all_location_containers = document.getElementsByClassName("location-container");

    if (search_bar_text !== "") {
        //iterate all containers
        for (const container of all_location_containers) {
            //used to track remaining phone numbers in container that are not none
            let containerFlag = 0;
            
            for (let i = 1; i < container.lastChild.childNodes.length; i++){
                //tracks individual phone numbers data to be set to none
                let phoneFlag = 0;
                phoneFlag += searchNumber(search_bar_text, container.lastChild.childNodes[i].firstChild.textContent);
                phoneFlag += searchText(search_bar_text, container.lastChild.childNodes[i].lastChild.textContent);
                
                containerFlag += phoneFlag;

                if (phoneFlag === 0) {
                    container.lastChild.childNodes[i].className = phone_number_row_initial_class_name + " " + none_class_name;
                }
                else {
                    container.lastChild.childNodes[i].className = phone_number_row_initial_class_name;
                }
            }
            if (containerFlag === 0) {
                container.className = location_container_initial_class_name + " " + none_class_name;
            }
            else {
                container.className = location_container_initial_class_name;
            }
        }
    }
    else {
        for (const container of all_location_containers) {
            container.className = location_container_initial_class_name;
            for (let i = 1; i < container.lastChild.childNodes.length; i++){
                container.lastChild.childNodes[i].className = phone_number_row_initial_class_name;
            }
        }
    }
}

const searchNumber = (text, nodeText) => {
    if (nodeText.includes(text)) {
        return 1;
    }
    return 0;
}

const searchText = (text, nodeText) => {
    console.log(text, nodeText, nodeText.toUpperCase().includes(text.toUpperCase()))
    if (nodeText.toUpperCase().includes(text.toUpperCase())) {
        return 1;
    }
    return 0
}