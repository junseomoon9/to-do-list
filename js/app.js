// ------- Selectors -------
const itemInput = document.querySelector('#ItemInput');
const mainButton = document.querySelector('.main-button');
const clearItemsButton = document.querySelector('.clear-button');
const itemList = document.querySelector(".item-list");
const checkIcon = document.querySelector(".fa-check-circle");

// ------- Supporting Functions -------

const addItem = function(textValue){

    itemList.insertAdjacentHTML('beforeend', `<li class="item"><p class="text">${textValue}</p><div class="icons"><i class="far fa-check-circle"></i><i class="far fa-times-circle"></i></div></li>`)
}

const deleteItem = function(e){
    const item = e.target;
    
    if ((item.classList[1] === 'fa-times-circle') || (item.classList[1] === 'fa-check-circle')){
        var parentTarget = item.parentNode.parentNode;
        parentTarget.parentNode.removeChild(parentTarget);
    }

}

const clearItems = function() {
    let element = document.getElementsByClassName("item-list");
    while (element[0].firstChild !== null) {
        element[0].removeChild(element[0].firstChild);
    }
}

// ------- Event Listeners -------

mainButton.addEventListener('click', function(){

    const input = itemInput.value;

    if (input.length === 0){
        console.log('Please add item');
    }
    else {
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

clearItemsButton.addEventListener('click', clearItems);




