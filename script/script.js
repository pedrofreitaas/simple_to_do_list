const allItemsKey = 'items';

function displayInCotainer(element) {
    var todoList = document.getElementById("list_interactor_container");

    todoList.appendChild(element);
}

window.onload = function loadItems() {
    var items = localStorage.getItem(allItemsKey);

    if (items == null) return;

    items = JSON.parse(items);

    for(var i=0;i<items.length;i++) {
        var itemInfo = items[i];

        var item = createItem(itemInfo.text);
        if (itemInfo.bold) item.style.fontWeight = 'bold';
        if (itemInfo.line_through) item.style.textDecoration = 'line-through';

        displayInCotainer(item);
    }
}

//Returns an item of the list initialized with the textContent.
function createItem(textContent) {
    var newItem = document.createElement("div");
    newItem.className = 'item';

    newItem.innerHTML = `<i class="fa-sharp fa-solid fa-arrow-right"></i>
        
    <p class="text">${textContent}</p>

    <button class="remove_task_button" onclick="removeTask(this)"> <i class="fa-solid fa-xmark"></i> </button>
    <button class="mark_done_task_button" onclick="markTaskDone(this)"> <i class="fa-solid fa-thumbs-up"></i> </button>
    <button class="highlight_task_button" onclick="highlightTask(this)"> <i class="fa-solid fa-star"></i> </button>  
    `;

    return newItem;
}

//Makes the task disapper from the page.
function removeTask(button) {
    button.parentElement.remove()
    removeItemFromLocalStorage(button.parentElement);
}

//Makes the text go normal<->scratch. 
function markTaskDone(button) {
    if (button.parentElement.style.textDecoration == '' )
    button.parentElement.style.textDecoration = 'line-through';
    
    else
    button.parentElement.style.textDecoration = '';

    addItemInLocalStorage(button.parentElement);
}

//Makes the text go normal<->bold.
function highlightTask(button) {
    if (button.parentElement.style.fontWeight != 'bold')
        button.parentElement.style.fontWeight = 'bold';

    else
        button.parentElement.style.fontWeight = '';

    addItemInLocalStorage(button.parentElement);
}

//Adds the itemInfos in the list inside the localStorage.
function addItemInLocalStorage(item) {
    const itemInfo = {text: item.querySelectorAll('.text')[0].textContent,
                      bold: item.style.fontWeight=='bold',
                      line_through: item.style.textDecoration=='line-through'};

    var currentItems = localStorage.getItem(allItemsKey);

    if (currentItems==null)
        currentItems = [itemInfo];
    else {
        currentItems = JSON.parse(currentItems);

        let existing = currentItems.find((item) => item.text === itemInfo.text);

        if ( existing )
            Object.assign(existing, itemInfo);
        else
            currentItems.push(itemInfo);
    }

    localStorage.setItem(allItemsKey, JSON.stringify( currentItems ) );                                                                               
}

//Remove the itemInfos from the list inside the localStorage.
function removeItemFromLocalStorage(item) {
    const itemText = item.querySelectorAll('.text')[0].textContent;
    
    var currentItems = JSON.parse(localStorage.getItem(allItemsKey));

    currentItems = currentItems.filter(item => item.text != itemText);

    localStorage.setItem(allItemsKey, JSON.stringify(currentItems));
}

//Adds an item and storages it.
function addInList() {
    var textInput = document.getElementById('text_input').value;

    if (textInput == '') return;

    var newItem = createItem(textInput);

    displayInCotainer(newItem);

    addItemInLocalStorage(newItem);
}

//Removes all items from the page and the storage.
function clearList() {
    var items = document.querySelectorAll('.item');
    items.forEach(item=>item.remove());

    localStorage.clear();
}
