const loadElements = (inputData) => {
    /*get formated data, object of location keys to an object with
    keys of number and description.*/
    let formatted_sorted_data = formatDataAsSortedObjects(inputData);
    generateHTMLElements(formatted_sorted_data);
}

const generateHTMLElements = (data) => {
    /*
        data = {
            'location' : [{
                'number' : str,
                'description' : str
            }...]
        }
    */
    const rootDiv = document.getElementById('root');

    const location_names = Object.keys(data).sort();
    for (const location of location_names) {
        rootDiv.appendChild(generateLocationDiv(location, data[location]));
    }
}

const generateLocationDiv = (location_name, data) => {
    /*
        location_name = str
        data = [{
            'number' : str,
            'description' : str
        ]...}

    */
    //initialize location container
    let location_container = document.createElement("div");
    location_container.className = "location-container";

    let location_header = document.createElement("div");
    location_header.className = "location-header";
    location_header.innerText = location_name;
    location_container.appendChild(location_header);

    //initialize table
    let location_div = document.createElement("div");
    location_div.className = "location-div";
    location_container.appendChild(location_div);

    //initialize headers
    let header_div = document.createElement("div");
    header_div.className = "header";
    location_div.appendChild(header_div);

    for (const header_text of ["Phone #", "Description"]) {
        let header = document.createElement("div");
        header_div.appendChild(header);
        header.innerText = header_text;
        header.className = "header-text"
    }

    //populate data rows
    for (const phone_obj of data) {
        let data_row = document.createElement("div");
        data_row.className = "phone-data-row";
        location_div.appendChild(data_row);

        //phone number
        let number_data = document.createElement("div");
        number_data.className = "phone-number";
        number_data.innerText = phone_obj["number"];
        data_row.appendChild(number_data);

        //description
        let description_data = document.createElement("div");
        description_data.className = "number-description";
        description_data.innerText = phone_obj["description"];
        data_row.appendChild(description_data);
    }

    return location_container;
}

const sortData = (data) => {
    /*
        data = {
            'location' : [{
                'number' : str,
                'description' : str
            }...]
        }
    */
    for(const location in data){
        data[location].sort((a, b) => {
            if(a.number < b.number) {
                return -1;
            }
            if (a.number > b.number) {
                return 1;
            }
            return 0;
        })
    }
    return data;
}

const formatDataAsSortedObjects = (data) => {
    /*
        data = basic csv string
        data = [
            "location_name,phone_number,description"
        ]
    */
    let objectDict = {};
    for (const row of data) {
        const splitData = row.split(',');
        if(splitData[0] in objectDict) {
            objectDict[splitData[0]].push({
                'number': splitData[1],
                'description': splitData[2]
            })
        }
        else {
            objectDict[splitData[0]] = [{
                'number': splitData[1],
                'description': splitData[2]
            }]
        }
    }
    return sortData(objectDict);
}