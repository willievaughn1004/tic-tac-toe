
const squares = document.querySelectorAll(".square");



squares.forEach(square => square.addEventListener('click', function(e) {
    let newSymbol = document.createElement('i');
    newSymbol.setAttribute("class", "fa-solid fa-x");
    e.target.append(newSymbol);
}))