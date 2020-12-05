const fs = require('fs');

const loadData = () => {
    const buffer = fs.readFileSync('./data/day05_data')
    return buffer.toString().split('\n')
}

const parseTicket = (ticket) => {
    let row = [ 0, 127 ]
    for(let i = 0; i < 7; i++){
        row = ticket.charAt(i) == 'B' ? [Math.round((row[1]+row[0])/(2)), row[1]] : [row[0], Math.round((row[1]+row[0])/2) -1] 
        //console.log(row)   
    }
    //console.log(`row ${row[0]}`)
    
    let seat = [0, 7]
    for(let i = 7; i < 10; i++){
        seat = ticket.charAt(i) == 'R' ? [Math.round((seat[1]+seat[0])/(2)), seat[1]] : [seat[0], Math.round((seat[1]+seat[0])/2) -1] 
        //console.log(seat)
    }
    //console.log(`seat ${seat[0]}`)

    return row[0]*8+seat[0]
}

let ticketArr = []
const findMaxTicket = (arr) => {
    let max = 0
    arr.forEach(instance => {
        if(instance > max){
            max = instance
        }
    })
    return max
}

const boardingPasses = loadData();
boardingPasses.forEach(ticket => {
    ticketArr.push(parseTicket(ticket))
})

//exersice 1 - fin the max seat nbr
console.log(findMaxTicket(ticketArr))

//exersice 2 - find the empty seat. 
for(let i = 10; i < 110; i++){
    for(let j = 0; j<7; j++){
        let seat = ticketArr.find(el => el == (i*8+j))
        if(seat == undefined){
            console.log((i*8+j))
            break
        }
    }  
}