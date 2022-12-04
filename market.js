let items = [
    { name: 'שמפו',id: 1, price: 18 },
    { name: 'קולה',id: 2, price: 8 },
    { name: 'במבה',id: 3, price: 20 },
    { name: 'מיונז',id: 4, price: 12 },
    { name: 'שוקולד נוטלה',id: 5, price: 13},
    { name: 'שוקולד השחר',id: 6, price: 12 },
    { name: 'אוריאו מארז',id: 7, price: 16 },
    { name: 'ממרח לוטוס',id: 8, price: 15 }
];
let orderedItems = [];

function addItem(item,listId) {
    if (orderedItems.includes(item)) {
        orderedItems.push(item);
        document.getElementById(listId).innerHTML = 'X' + singleItemCountByItem(item) + ' ' + item.name;
        addMinusButton(item,listId);
        addPlusButton(item,listId);
    } else {
        orderedItems.push(item);
        let newItem = document.createElement('li');
        newItem.id = listId;
        let text = document.createTextNode(item.name);
        let newParagraph = document.getElementById('items');
        newItem.appendChild(text);
        newParagraph.appendChild(newItem);
        addMinusButton(item,listId);
        addPlusButton(item,listId);
    }
    calculateTotalPrice();
    allItemsCount();
}
function removeItemUnit(item, listId) {
    let index = orderedItems.findIndex(object => {
        return object == item;
    });
    orderedItems.splice(index,1);
    if (singleItemCountByItem(item) > 0) {
        document.getElementById(listId).innerText = 'X' + singleItemCountByItem(item) + ' ' + item.name;
        addMinusButton(item,listId);
        addPlusButton(item,listId);
    } else {
        document.getElementById(listId).remove();
    }
    calculateTotalPrice();
    allItemsCount();
}
function addMinusButton(item, listId) {
    let removeItemBtn = document.createElement("button");
    let removeItemBtnText = document.createTextNode('-');
    let liElement = document.getElementById(listId);
    removeItemBtn.appendChild(removeItemBtnText);
    liElement.appendChild(removeItemBtn);
    removeItemBtn.className = "btn btn-danger btn-sm addAndRemoveButtons";
    removeItemBtn.id = item.id.toString() + 'remove';
    createRemoveItemEventListener(item,listId);
}
function addPlusButton(item, listId) {
    let addItemBtn = document.createElement("button");
    let addItemBtnText = document.createTextNode('+');
    let liElement = document.getElementById(listId);
    addItemBtn.appendChild(addItemBtnText);
    liElement.appendChild(addItemBtn);
    addItemBtn.className = "btn btn-primary btn-sm addAndRemoveButtons";
    addItemBtn.style.marginLeft = '1px';
    addItemBtn.id = item.id.toString() + 'add';
    createAddItemEventListener(item.id,item,listId);
}
function createRemoveItemEventListener(item,listId) {
    let id = item.id.toString() + 'remove';
    let removeShampoo = document.getElementById(id);
    removeShampoo.addEventListener('click',()=>{
        removeItemUnit(item,listId);
    });
}
function createAddItemEventListener (itemId, item, listId) {
    let id = itemId.toString() + 'add';
    let addShampoo = document.getElementById(id);
    addShampoo.addEventListener('click',()=>{
        addItem(item,listId);
    });
}
function calculateTotalPrice() {
    let totalPrice = 0;
    orderedItems.forEach(element => {
        let price = element.price;
        totalPrice = totalPrice + price;
    });
    document.getElementById('totalPrice').innerHTML = 'סה"כ לתשלום:' + ' ' + '₪' + totalPrice;
}
function allItemsCount() {
    document.getElementById('itemCount').innerHTML = 'כמות מוצרים:' + ' ' + orderedItems.length;
}
function singleItemCountByItem(item) {
    let count = 0;
    orderedItems.forEach(object => {
        if (object == item) {
            count++;
        }
    });
    return count;
}
function resetCart() {
    while (orderedItems.length > 0) {
        orderedItems.splice(0, 1);
        document.getElementById('items').innerHTML = '';
        document.getElementById('totalPrice').innerHTML = 'סה"כ לתשלום:';
        document.getElementById('itemCount').innerHTML = 'כמות מוצרים:';
    }
}
