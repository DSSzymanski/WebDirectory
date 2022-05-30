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

    //populate select element
    for (const phone_entry of data) {
        let option_element = document.createElement("option");
        option_element.innerText = phone_entry;
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