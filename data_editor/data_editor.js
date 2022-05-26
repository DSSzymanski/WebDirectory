const generateNewRemoveBox = () => {
    const remove_container = document.getElementById("remove-container");
    let new_box = document.createElement("div");
    new_box.innerText = "test";
    remove_container.appendChild(new_box);
}

const generateNewAddBox = () => {
    const add_container = document.getElementById("add-container");
    let new_box = document.createElement("div");
    new_box.innerText = "test";
    add_container.appendChild(new_box);
}