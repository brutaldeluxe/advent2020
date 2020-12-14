const fs = require('fs');
let width

const loadData = () => {
    let buffer = fs.readFileSync('./data/day11_data')

    return Array.from(buffer.toString().split('\n'), line => {
        width = line.length
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

const findSeat = (seating, pos, dirX=0, dirY=0) => {
    let i = 1
    let {x, y} = translate(pos)
    let s = null
    while(s != undefined || s !='.'){
        s = seat(seating, x+dirX*i, y+dirY*i)
        i++
        if(s === '#'){
            return '#'
        }
        if(s === 'L'){
            return 'L'
        }
        if(i>width){
            return undefined
        }
    }
    
    return seat
}

const isEmpty = (seating, pos) => {
    let {x,y} = translate(pos)
    return (
    (findSeat(seating, pos, -1, -1) !== '#') &&
    (findSeat(seating, pos, 0, -1) !== '#') &&
    (findSeat(seating, pos, 1, -1) !== '#') &&
    (findSeat(seating, pos, -1, 0) !== '#') &&
    (seat(seating, x, y) === 'L') &&
    (findSeat(seating, pos, 1, 0) !== '#') &&
    (findSeat(seating, pos, -1, 1) !== '#') &&
    (findSeat(seating, pos, 0, 1) !== '#') &&
    (findSeat(seating, pos, 1, 1) !== '#')
    )
}

const isOccupied = (seating, pos, limit) => {
    let {x, y} = translate(pos)
    let adjacentOcc = 0
    
    adjacentOcc = findSeat(seating, pos, -1, -1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, 0, -1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, 1, -1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, -1, 0) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, 1, 0) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, -1, 1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, 0, 1) === '#' ? adjacentOcc+1 : adjacentOcc
    adjacentOcc = findSeat(seating, pos, 1, 1) === '#' ? adjacentOcc+1 : adjacentOcc
    let bool = (seat(seating, x, y) === '#' && adjacentOcc >= limit) ? true : false
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
        if(isOccupied(seating, pos, 4).occupied){
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

const printSeating = (seating) => {
    for(let j = 0; j<seating.length; j+=width){
        console.log(seating.slice(j, j+width).toString().replace(/,/gi,''))
    }
    console.log(' ')
}

const doPartOne = (seating) => {
    let before = seating
    let cnt = 0
    while(true){
        seating = sit(seating)
        //printSeating(seating)
        if(seating.equalsOr(before)){
            return {
                cnt,
                seating,
                occupiedSeats : occupiedSeats(seating)
            }
        }
        cnt++
        before = seating
    }
}

let seating = loadData()
console.log(doPartOne(seating))
