const fs = require('fs');

const loadData = () => {
    let buffer = fs.readFileSync('./data/day09_data')

    return Array.from(buffer.toString().split('\n'), row => {
        return Number.parseInt(row)
    })
}

const PREAMBLE = 25

const isValid = (pos, input) => {
    for(let i=pos-PREAMBLE; i<pos; i++){
        for(let j=pos-PREAMBLE; j<pos; j++){
            if(i != j && input[i]+input[j]==input[pos]){
                return {
                    number: input[pos],
                    pos,
                    valid: true
                }
            }
        }
    }
    return {
        number: input[pos],
        pos,
        valid: false
    }
}

const findInvalidNumber = (data) => {
    for(let i = PREAMBLE; i<data.length; i++){
        let result = isValid(i, data)
        if(!result.valid){
            return result
        }
    }
}

//part 1
const data = loadData()
console.log(findInvalidNumber(data))

const sumPreceeding = (data, start, end, result) => {
    let sum = 0
    let preceeding = []
    for(let i = start; i<end; i++){
        sum += data[i]
        preceeding.push(data[i])
        if(sum == result){
            return {
                found: true,
                preceeding,
                sum: result
            }
        }
    }
    return {
        found: false,
        preceeding: [],
        sum: result
    }
}

const findContiguousSet = (data, pos) => {
    for(let i = 0; i<pos; i++){
        let result = sumPreceeding(data, i, pos, data[pos])
        if(result.found){
            let min = Math.min(...result.preceeding)
            let max = Math.max(...result.preceeding)
            return {
                min,
                max,
                sum: min + max
            }
        }
    }
}

//Part 2
let res = findInvalidNumber(data)
console.log(findContiguousSet(data, res.pos))