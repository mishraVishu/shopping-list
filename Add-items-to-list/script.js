const form = document.querySelector('#form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const filterInput = document.querySelector('#filter');
const formBtn = form.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getitemsFromStorage();
    itemsFromStorage.forEach(item => addItemsToDOM(item));
    checkUI();
}

const onAddItem = (e) => {
    const itemList = document.querySelector('#item-list');
    e.preventDefault();
    const formData = new FormData(form);
    const item =formData.get('item');
    console.log(item);

    //Validate Input
    if (item === '') {
        itemInput.className = 'error';
        const p = document.createElement('p');
        const text = document.createTextNode('Please enter item');
        p.appendChild(text);
        p.style.color = 'red';
        itemInput.insertAdjacentElement('afterend', p);
    } else {
    //Create New Item Element and Append to List
        // check for edit mode 
        if (isEditMode) {
            const itemToEdit = itemList.querySelector('.edit-mode');
            removeItemFromStorage(itemToEdit.textContent);
            itemToEdit.classList.remove('edit-mode');
            itemToEdit.remove();
            isEditMode = false;
        } else {
            if (checkIfItemExists(item)) {
                alert('Item already exists.');
                itemInput.value = '';
                return;
            }
        }
        addItemsToDOM(item);
        addItemsToStorage(item);
    }
    itemInput.value = '';
    checkUI();
}

function addItemsToDOM(item) {
    const li = document.createElement('li');
    const liText = document.createTextNode(item);
    li.appendChild(liText);

    const btn = document.createElement('button');
    btn.className = 'remove-item btn-link text-red';

    const i = document.createElement('i');
    i.className='fa-xmark fa-solid'

    btn.appendChild(i);
    li.appendChild(btn);
    console.log(li);

    itemList.appendChild(li);
}

function addItemsToStorage(item) {
    const itemsFromStorage = getitemsFromStorage();
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItemFromStorage(item) {
    const itemsFromStorage = getitemsFromStorage();
    let filteredItemsFromStorage = itemsFromStorage.filter(i => i !== item);

    localStorage.setItem('items', JSON.stringify(filteredItemsFromStorage));
}

function removeItem(item) {
    console.log('inside');
    if(confirm('Are you Sure?'))
        item.remove();

    //remove Item from Storage
    removeItemFromStorage(item.textContent);
    
    checkUI();
}

function onClickItem(e) {
    console.log(e.target.parentElement.classList);
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }
    else {
        isEditMode = true;
        console.log(itemList);
        Array.from(itemList.children).forEach(item=>item.classList.remove('edit-mode'));
        e.target.classList.add('edit-mode');
       formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
        formBtn.style.backgroundColor = '#228B22';
        itemInput.value = e.target.textContent;
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getitemsFromStorage();
    if (itemsFromStorage.includes(item)) {
        console.log('inside fun')
        return true;
    } else { 
    return false
    }
}

const clearAll = (e) => {
    // 1st way 
    // itemList.remove();

    //2nd way 
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    localStorage.clear();
    checkUI();
}

function checkUI() {
    itemInput.value = '';
    const items = document.querySelectorAll('li');
    console.log(items);
    if (items.length === 0) {
        filterInput.className='hide';
        clearBtn.style.display = 'none';
    } else {
        filterInput.className = 'show form-input-filter';
        clearBtn.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

const onFilter = (e) => {
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('li');
    items.forEach(item => {
        if (item.innerText.toLowerCase().includes(text)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}

function getitemsFromStorage() {
    let itemsFromStorage = [];

    if (localStorage.getItem('items') === null)
        itemsFromStorage = [];
    else
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));

    return itemsFromStorage;
}

// Event Listners
form.addEventListener('submit', onAddItem);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearAll);
filterInput.addEventListener('input', onFilter);
document.addEventListener('DOMContentLoaded',displayItems)

checkUI();