const fs = require('fs');

const loadData = () => {
    let buffer = fs.readFileSync('./data/day12_data')
    return Array.from(buffer.toString().split('\n'))
}

const directions = loadData()

let pos = {x:0, y:0}
let wayP = {x:10, y:1}
directions.forEach(line => {
    let match = line.match(/([A-Z])(\d*)/)
    let action = match[1]
    let value = Number.parseInt(match[2])

    let x = wayP.x
    let y = wayP.y
    let rad = 0
    switch(action){
        case 'N': 
            wayP.y+=value
            break
        case 'S': 
            wayP.y-=value
            break
        case 'E': 
            wayP.x+=value
            break
        case 'W': 
            wayP.x-=value
            break
        case 'L': 
            rad = -value*Math.PI/180;
            wayP.x = Math.round(x * Math.cos(rad) + y * Math.sin(rad))
            wayP.y = Math.round(-x * Math.sin(rad) + y * Math.cos(rad))
            break
        case 'R': 
            rad = value*Math.PI/180
            wayP.x = Math.round(x * Math.cos(rad) + y * Math.sin(rad))
            wayP.y = Math.round(-x * Math.sin(rad) + y * Math.cos(rad))
            break
        case 'F': 
            pos.x+=value*wayP.x
            pos.y+=value*wayP.y
            break
        default: console.log('Hey now. Total error '+action)
    }
    //console.log({pos, wayP})
})

const manhattanPos = (pos) => {
    return Math.abs(pos.x) + Math.abs(pos.y)
}

console.log(manhattanPos(pos))