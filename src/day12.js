const fs = require('fs');

const loadData = () => {
    let buffer = fs.readFileSync('./data/day12_data')
    return Array.from(buffer.toString().split('\n'))
}

const directions = loadData()

let direction = 90
let posX = 0
let posY = 0
directions.forEach(line => {
    let match = line.match(/([A-Z])(\d*)/)
    let action = match[1]
    let value = Number.parseInt(match[2])
    console.log(line)

    switch(action){
        case 'N': posY+=value 
            break
        case 'S': posY-=value
            break
        case 'E': posX+=value
            break
        case 'W': posX-=value
            break
        case 'L': direction = (360+direction - value)%360
            break
        case 'R': direction = (direction + value)%360
            break
        case 'F': 
            if(direction == 0){
                posY+=value
            }
            if(direction == 90){
                posX+=value
            }
            if(direction == 180){
                posY-=value
            }
            if(direction == 270){
                posX-=value
            }
            break
        default: console.log('Hey now. Total error '+action)
    }
    console.log({posX, posY, direction})
})

const manhattanPos = (x, y) => {
    return Math.abs(x) + Math.abs(y)
}

console.log(manhattanPos(posX, posY))