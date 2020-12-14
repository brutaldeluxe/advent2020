const fs = require('fs');

const loadData = () => {
    let buffer = fs.readFileSync('./data/day13_data')
    return Array.from(buffer.toString().split('\n'))
}

const data = loadData()
let departureTime = Number.parseInt(data[0])
let buses = data[1].split(',')
buses = buses.filter(bus => {
    if(bus !== 'x'){
        return bus
    }
}).map(bus => {
    if(bus != 'x'){
        return Number.parseInt(bus)
    }
})

let minTime = Math.max(...buses)
let theBus = {no: 0, leavesIn: 0}

for(let i = 0; i< buses.length; i++){
    let departs = buses[i] - departureTime%buses[i]
    if(departs < minTime){
        minTime = departs
        theBus.leavesIn = departs
        theBus.no = buses[i]
    }
}
console.log(theBus.no*theBus.leavesIn)

