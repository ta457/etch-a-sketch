let gridContainer = document.querySelector(".grid");
let penColour = document.getElementById("pen-colour");
let bgColour = document.getElementById("bg-colour");
let slider = document.getElementById("range-slider");
let clearBtn = document.getElementById("clear-btn");

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

        //add border right/bottom for items at the edges
        if(i % size == 0) {
            gridItem.classList.add("border-right");
        }
        if(i > size * (size-1)){
            gridItem.classList.add("border-bottom");
        }

        container.appendChild(gridItem);
    }
}

//make a grid at the start
generateGrid(gridContainer, slider.value, bgColour.value);

//when bg color is changed, generage a new grid
bgColour.oninput = function() {
    generateGrid(gridContainer, slider.value, this.value);
}

//when grid size is changed, generate a new grid & show the current size
let output = document.getElementById("range-output");
output.innerHTML = slider.value + " x " + slider.value;
slider.oninput = function() {
    output.innerHTML = this.value + " x " + this.value;
    generateGrid(gridContainer, this.value, bgColour.value);
}

//fill the grid item when click and hold mouse
let holding = false;

gridContainer.addEventListener('mousedown', function(){
    holding = true;

    items = document.querySelectorAll(".grid-item");
    items.forEach(function (i) {
        i.ondragstart = function() { return false; };

        i.addEventListener('mousedown', function() {
            i.style.backgroundColor = penColour.value;
        });

        i.addEventListener('mouseover', function() {
            if(holding == true) {
                i.style.backgroundColor = penColour.value;
            }
        });
    });
});
gridContainer.addEventListener('mouseup', function(){
    holding = false;
});

//turn off holding when mouse leave the grid area
gridContainer.addEventListener('mouseleave', function(){
    holding = false;
});

//generate a new grid when click the Clear button
clearBtn.addEventListener('mousedown', function() {
    clearBtn.style.backgroundColor = "#00A6FB";
    generateGrid(gridContainer, slider.value, bgColour.value);
});
clearBtn.addEventListener('mouseup', function() {
    clearBtn.style.backgroundColor = "#FBFFFE";
});