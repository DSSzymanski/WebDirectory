const generateNewRemoveBox = () => {
    const remove_container = document.getElementById("remove-container");
    let new_box = document.createElement("div");
    new_box.innerText = "test";
    remove_container.appendChild(new_box);
}

const generateNewAddBox = () => {
    const add_container = document.getElementById("add-container");
    
    //modify new box into DOM
    let new_box = document.createElement("div");
    add_container.appendChild(new_box);

    //setup box
    new_box.className = "add-box";
    
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