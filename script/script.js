const itemsKeys = "list_items";

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

function addInlist() {

}

function clearList() {
    
}

//Makes the task disapper from the page.
function removeTask(element) {
    element.parentElement.parentElement.remove()
}

//Makes the text go normal<->scratch. 
function markTaskDone(element) {
    if (element.parentElement.style.textDecoration == '' )
        element.parentElement.style.textDecoration = 'line-through';
    
    else
        element.parentElement.style.textDecoration = '';
}

//Makes the text go normal<->bold.
function highlightTask(element) {
    if (element.parentElement.style.fontWeight != 'bold' )
        element.parentElement.style.fontWeight = 'bold';

    else
        element.parentElement.style.fontWeight = '';
}