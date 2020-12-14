const fs = require('fs');
let width

const loadData = () => {
    let buffer = fs.readFileSync('./data/day11_data')

    return Array.from(buffer.toString().split('\n'), line => {
        width = line.length
        console.log(width)
        return Array.from(line)
    }).flat()
}

const seat = (seating, x, y) => {
    if(x < 0 || x >= width){
        x = undefined
    }
    if(y < 0 || y >= width){
        y = undefined
    }

    return seating[y*width+x]
}

const translate = (pos) => {
    return {
        x: pos%width,
        y: Math.floor(pos/width)
    }
}

const isEmpty = (seating, pos) => {
    let {x,y} = translate(pos)
    return (
    (seat(seating, x-1, y-1) !== '#') &&
    (seat(seating, x, y-1) !== '#') &&
    (seat(seating, x+1, y-1) !== '#') &&
    (seat(seating, x-1, y) !== '#') &&
    (seat(seating, x, y) === 'L') &&
    (seat(seating, x+1, y) !== '#') &&
    (seat(seating, x-1, y+1) !== '#') &&
    (seat(seating, x, y+1) !== '#') &&
    (seat(seating, x+1, y+1) !== '#')
    )
}

const isOccupied = (seating, pos) => {
    let {x, y} = translate(pos)
    let adjacentOcc = 0
    
    adjacentOcc = seat(seating, x-1, y-1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x, y-1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x+1, y-1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x-1, y) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x+1, y) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x-1, y+1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x, y+1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = seat(seating, x+1, y+1) === '#' ? adjacentOcc+1 : adjacentOcc
    let bool = (seat(seating, x, y) === '#' && adjacentOcc >= 4) ? true : false
    return {
        occupied: bool,
        adjacentCnt: adjacentOcc
    }
}

const sit = (seating) => {
    let clone = seating.slice()
    for(let pos = 0; pos < seating.length; pos++){
        if(isEmpty(seating, pos)){
            clone[pos] = '#'
        }
        if(isOccupied(seating, pos).occupied){
            clone[pos] = 'L'
        }
    }
    return clone
}

Array.prototype.equalsOr = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

const occupiedSeats = (seating) => {
    let count = 0
    seating.forEach(seat => {
        if(seat === '#'){
            count++
        }
    })
    return count
}

const doPartOne = (seating) => {
    let before = seating
    let cnt = 0
    while(true){
        seating = sit(seating)
        cnt++
        if(seating.equalsOr(before)){
            return {
                cnt,
                seating,
                occupiedSeats : occupiedSeats(seating)
            }
        }
        before = seating
    }
}

let seating = loadData()
console.log(doPartOne(seating))
