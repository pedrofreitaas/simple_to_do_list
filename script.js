const itemsKeys = "list_items";

function persistData(listItem) {
    var storedItemsString = localStorage.getItem(itemsKeys);
    var newItemString = listItem.textContent;

    if (listItem.style.fontWeight=='bold')
        newItemString = "*" + newItemString;

    // no stored items.
    if (storedItemsString==null) {
        var storedItems = [newItemString];
        localStorage.setItem(itemsKeys,JSON.stringify(storedItems));
        return;
    }

    var storedItems = JSON.parse(storedItemsString);
    storedItems.push(newItemString);
    localStorage.setItem(itemsKeys, JSON.stringify(storedItems));
}

function addInList() {
    var list = document.getElementById("main_list");

    var listItem = document.createElement("li");
    listItem.textContent = document.getElementById("text-input").value;
    
    if (listItem.textContent[0]=="*") {
        listItem.style.fontWeight = 'bold';
        listItem.textContent = listItem.textContent.slice(1);
    }
    
    if (listItem.textContent=="") return;

    list.appendChild(listItem);
    persistData(listItem);
}

function clearList() {
    document.getElementById("main_list").innerHTML = '';
    localStorage.removeItem(itemsKeys);    
}

window.onload = function teste() {
    const storedItems = JSON.parse(localStorage.getItem('list_items'));

    if(storedItems == null) return;

    var taskList = document.getElementById("main_list");

    for(let index=0; index<storedItems.length;index++) {
        var listItem = document.createElement("li");
        listItem.textContent = storedItems[index];

        if (listItem.textContent[0] == "*") {
            listItem.style.fontWeight = 'bold';
            listItem.textContent = listItem.textContent.slice(1);
        }
        
        taskList.appendChild(listItem);
    }
}