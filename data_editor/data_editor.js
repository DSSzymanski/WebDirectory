const generateNewJSFile = (data) => {
    //remove entries from data
    for (const entry of getRemoveDataEntries()) {
        //check to skip if the selected entry is the placeholder
        if(data.indexOf(entry) !== -1){
            data.splice(data.indexOf(entry), 1);
        }
    }

    //add new entries to data
    for (const entry of getNewDataEntries()) {
        if(entry.split(',').length === 3) {
            data.push(entry);
        }
    }

    //sort data by extension
    data.sort((a, b) => {
        if(a.split(',')[1].slice(-4) < b.split(',')[1].slice(-4)) {
            return -1;
        }
        if (a.split(',')[1].slice(-4) > b.split(',')[1].slice(-4)) {
            return 1;
        }
        return 0;
    })

    putDataOnScreen(data);
    return data;
}

const putDataOnScreen = (data) => {
    const header_str = "const data = [\n" +
        "\t// location name | Phone # | Description\n";
    const footer_str = ']';
    let data_str = "";

    for (const entry of data) {
        data_str += "\t" + entry + ",\n";
    }

    document.getElementById('text').innerText = header_str + data_str + footer_str;
    document.getElementById('text-container').setAttribute("style", "display: flex");
}

const getRemoveDataEntries = () => {
    /**
     * Generate and return array of entry strings to remove from the JS file.
     */
    let remove_data_entries = [];

    //get remove boxes
    const data_boxes = document.getElementsByClassName("remove-box");

    //get values from boxes
    for (const data_box of data_boxes) {
        remove_data_entries.push(data_box.firstChild.value);
    }

    return remove_data_entries;
}


const getNewDataEntries = () => {
    /**
     * Generate and return array of formatted strings containing the data of all
     * the new phone numbers created on the web page.
     */
    let new_data_entries = [];

    //get all boxes for new phone numbers
    const data_boxes = document.getElementsByClassName("add-box");
    for (const data_box of data_boxes) {
        let data_entry = "";
        //get values from input boxes
        for (let i = 0; i < 3; i++) {
            data_entry = data_entry + data_box.childNodes[i].value.trim() + ",";
        }
        //remove trailing comma
        data_entry = data_entry.slice(0, -1);
        new_data_entries.push(data_entry);
    }

    return new_data_entries;
}

const generateNewRemoveBox = (data) => {
    const remove_container = document.getElementById("remove-container");

    //modify new box into DOM
    let new_box = document.createElement("div");
    remove_container.appendChild(new_box);

    //setup box
    new_box.className = "box remove-box";

    //add select element to remove box
    let select_entry = document.createElement("select");
    new_box.appendChild(select_entry);

    //initial blank option
    let init_option_element = document.createElement("option");
    init_option_element.innerText = "Select phone entry to remove.";
    select_entry.appendChild(init_option_element);

    //sort data by phone extension
    data.sort((a, b) => {
        if(a.split(',')[1].slice(-4) < b.split(',')[1].slice(-4)) {
            return -1;
        }
        if (a.split(',')[1].slice(-4) > b.split(',')[1].slice(-4)) {
            return 1;
        }
        return 0;
    })

    //populate select element
    for (const phone_entry of data) {
        let option_element = document.createElement("option");
        const phone_str = phone_entry.split(',')
        option_element.innerText = phone_str[1] + " - " + phone_str[2];
        option_element.value = phone_entry;
        select_entry.appendChild(option_element);
    }

    //add button to remove add box
    let remove_box_btn = document.createElement("button");
    remove_box_btn.innerText = "-";
    remove_box_btn.onclick = () => {
        remove_container.removeChild(new_box);
    };
    new_box.appendChild(remove_box_btn);
}

const generateNewAddBox = () => {
    const add_container = document.getElementById("add-container");

    //modify new box into DOM
    let new_box = document.createElement("div");
    add_container.appendChild(new_box);

    //setup box
    new_box.className = "box add-box";

    //add location textbox
    new_box.appendChild(generateTextInputElement("Location/Unit"));

    //add phone number textbox
    new_box.appendChild(generateTextInputElement("Phone Number"));

    //add description textbox
    new_box.appendChild(generateTextInputElement("Description"));

    //add button to remove add box
    let remove_box_btn = document.createElement("button");
    remove_box_btn.innerText = "-";
    remove_box_btn.onclick = () => {
        add_container.removeChild(new_box);
    };
    new_box.appendChild(remove_box_btn);
}

const generateTextInputElement = (placeholder) => {
    let new_text_input = document.createElement("input");
    new_text_input.setAttribute("type", "text");
    new_text_input.setAttribute("placeholder", placeholder);
    return new_text_input;
}