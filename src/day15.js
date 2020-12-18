const fs = require('fs');

fs.readFile('./data/day15_data', 'utf8', (err, data) => {
    data = Array.from(data.split(','), number => {
        return Number.parseInt(number)
    })
    console.log('question 1: ', partOne(data))
})

const partOne = (data) => {

    for(let i = data.length; i<2020; i++){ 
        let pos = data.slice(0, data.length-1).lastIndexOf(data[data.length-1])

        if(pos === -1){
            data.push(0)
        }
        else {
            data.push(i-1-pos)
        }
    }
    
    return data[data.length-1]
}