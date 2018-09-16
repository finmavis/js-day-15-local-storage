const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const reset = document.querySelector('.reset');
const checkAllEl = document.querySelector('.check-all');
const uncheckAllEl = document.querySelector('.uncheck-all');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    done: false
  }
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
};

// Create html list item to DOM
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item-${i}" ${plate.done ? 'checked' : ''} />
        <label for="item-${i}">${plate.text}</label>
      </li>
    `
  }).join('');
};

function toggleDone(e) {
  if (!e.target.matches('input')) return; // skip if its not input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function resetAll() {
  items.splice(0, items.length);
  localStorage.clear();
  populateList(items, itemsList);
}

function checkAll() {
  items.forEach((item, i) => {
    items[i].done = true
  });
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function uncheckAll() {
  items.forEach((item, i) => {
    items[i].done = false
  });
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
// Add event to parent list
itemsList.addEventListener('click', toggleDone);
reset.addEventListener('click', resetAll);
checkAllEl.addEventListener('click', checkAll);
uncheckAllEl.addEventListener('click', uncheckAll);
// Run on load
populateList(items, itemsList);