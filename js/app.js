// ------- Selectors -------
const itemInput = document.querySelector('#ItemInput');
const mainButton = document.querySelector('.main-button');
const clearItemsButton = document.querySelector('.clear-button');
const itemList = document.querySelector(".item-list");



// ------- Local Storage -------

myStorage = localStorage;


// ------- Supporting Functions -------

const addItem = function(textValue){

    itemList.insertAdjacentHTML('beforeend', `<li class="item"><p class="text">${textValue}</p><div class="icons"><i class="far fa-check-circle"></i><i class="far fa-edit"></i><i class="far fa-times-circle"></i></div></li>`)
}

const deleteItem = function(e){
    const item = e.target;
    
    if (item.classList[1] === 'fa-times-circle'){
        const parentTarget = item.parentNode.parentNode;
        
        const value = parentTarget.getElementsByClassName('text')[0].textContent;

        parentTarget.parentNode.removeChild(parentTarget);
        
        Object.keys(localStorage).forEach(function(key){

            let item_value = localStorage.getItem(key);

            if (item_value === value){
                localStorage.removeItem(key);
            }
        });

    }
    

}

const editItem = function(e){
    const item = e.target;

    if (item.classList[1] === "fa-edit") {
        const  parentTarget = item.parentNode.parentNode;

        const value = parentTarget.getElementsByClassName('text')[0].textContent;
        itemInput.value = value;
        
        parentTarget.parentNode.removeChild(parentTarget);

        Object.keys(localStorage).forEach(function(key){

            let item_value = localStorage.getItem(key);

            if (item_value === value){
                localStorage.removeItem(key);
            }
        });
    }
}

const checkItem = function(e) {
    const item = e.target;

    if (item.classList[1] === "fa-check-circle") {
        const parentTarget = item.parentNode.parentNode;
        const text_selector = parentTarget.getElementsByClassName('text')[0];
        const value = text_selector.textContent;
        text_selector.textContent = "";

        text_selector.insertAdjacentHTML('afterbegin', `<s>${value}</s>`)
        console.log('okay');
    }
}

const clearItems = function() {

    myStorage.clear();

    let element = document.getElementsByClassName("item-list");
    while (element[0].firstChild !== null) {
        element[0].removeChild(element[0].firstChild);
    }
}

const displayItems = function() {

    Object.keys(localStorage).forEach(function(key){
        let value = localStorage.getItem(key);
        addItem(value);
    });

}

displayItems();


// ------- Event Listeners -------

mainButton.addEventListener('click', function(){

    const length = myStorage.length;

    const input = itemInput.value;

    if (input.length === 0){
        console.log('Please add item');
    }
    else {
        myStorage.setItem(`item${length}`, input);
        
        addItem(input);
        itemInput.value = '';
    }

});


document.addEventListener('keypress', function(event){

    const input = itemInput.value;

    if (event.keyCode === 13 || event.which === 13){
        event.preventDefault(); 
        if (input.length === 0){
            console.log('Please add item');
        }
        else {
            addItem(input);
            itemInput.value = '';
        }
    }

});

itemList.addEventListener('click', deleteItem);
itemList.addEventListener('click', editItem);
itemList.addEventListener('click', checkItem);

clearItemsButton.addEventListener('click', clearItems);




