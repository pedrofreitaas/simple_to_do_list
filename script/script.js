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

//Returns an item of the list initialized with the textContent.
function createItem(textContent) {
    var newItem = document.createElement("div");
    newItem.className = 'item';

    newItem.innerHTML = `<i class="fa-sharp fa-solid fa-arrow-right"></i>
        
    <p> ${textContent} </p>

    <button class="remove_task_button" onclick="removeTask(this)"> <i class="fa-solid fa-xmark"></i> </button>
    <button class="mark_done_task_button" onclick="markTaskDone(this)"> <i class="fa-solid fa-thumbs-up"></i> </button>
    <button class="highlight_task_button" onclick="highlightTask(this)"> <i class="fa-solid fa-star"></i> </button>  
    `;

    return newItem;
}

//Makes the task disapper from the page.
function removeTask(element) {
    element.parentElement.remove()
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

function addInList() {
    var textInput = document.getElementById('text_input').value;

    if (textInput == '') return;

    var newItem = createItem(textInput);
    document.body.appendChild(newItem);
}

function clearList() {
    var items = document.querySelectorAll('.item');
    items.forEach(item=>item.remove());

    localStorage.clear();
}
