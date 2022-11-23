let gridContainer = document.querySelector(".grid");
let penColour = document.getElementById("pen-colour");
let bgColour = document.getElementById("bg-colour");
let slider = document.getElementById("range-slider");
generateGrid(gridContainer, slider.value, bgColour.value);

//generate grid
function generateGrid(container, size, bgColour) {
    //find the size of grid-item
    let itemSize = 600/size;

    //remove existed childs before adding new ones
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }

    let total = size * size;
    for(let i = 1; i <= total; i++){
        let gridItem = document.createElement('div');

        gridItem.setAttribute('class', 'grid-item');
        gridItem.setAttribute('draggable', 'false');
        gridItem.id = 'grid-item-' + i;
        gridItem.style.backgroundColor = bgColour;
        gridItem.style.height = itemSize + "px";
        gridItem.style.width = itemSize + "px";

        //add border right/bottom for items at the edge
        if(i % size == 0) {
            gridItem.classList.add("border-right");
        }
        if(i > size * (size-1)){
            gridItem.classList.add("border-bottom");
        }

        container.appendChild(gridItem);
    }
}

//change color value
// penColour.oninput = function() {
//     console.log(penColour.value);
// }
bgColour.oninput = function() {
    generateGrid(gridContainer, slider.value, this.value);
}

//change range slider value (grid size) & display
let output = document.getElementById("range-output");
output.innerHTML = slider.value + " x " + slider.value;
slider.oninput = function() {
    output.innerHTML = this.value + " x " + this.value;
    generateGrid(gridContainer, this.value, bgColour.value);
}

//fill the grid item when click and hold mouse
items = document.querySelectorAll(".grid-item");

let holding = false;

items.forEach(function (i) {
    i.ondragstart = function() { return false; };

    i.addEventListener('mousedown', function() {
        holding = true;
        i.style.backgroundColor = penColour.value;
        console.log(holding);
    });
    
    i.addEventListener('mouseup', function() {
        holding = false;
        console.log(holding);
    });
    
    i.addEventListener('mouseover', function() {
        if(holding == true) {
            i.style.backgroundColor = penColour.value;
        }
    });
});