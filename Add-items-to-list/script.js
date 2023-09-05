const form = document.querySelector('#form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

const onAddItem = (e) => {
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
    const li = document.createElement('li');
    const liText = document.createTextNode(item);
    li.appendChild(liText);

    const btn = document.createElement('button');
    btn.className = 'btn-link text-red';

    const i = document.createElement('i');
    i.className='fa-xmark fa-solid'

    btn.appendChild(i);
    li.appendChild(btn);
    console.log(li);

    itemList.appendChild(li);
    }
}

// Event Listners
form.addEventListener('submit', onAddItem);

const filterInput = document.getElementById('filter');



filterInput.addEventListener('input',onFilter) 