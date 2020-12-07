const fs = require('fs');

const loadData = () => {
    const buffer = fs.readFileSync('./data/day06_data')
    return buffer.toString().split('\n')
}

const parseAnswersOne = (data) => {
    let tot = 0
    let map = new Map()
    data.forEach(line => {
        if(line === ''){
            tot += map.size
            map = new Map()
        }
        else{
            for(let i = 0; i < line.length; i++){
                let c = line.charAt(i)
                if(!map.has(c)){
                    map.set(c, 1)
                }
                else {
                    let count = map.get(c) + 1
                    map.set(c, count)
                }
            }
        }
    })
    return tot
}

const parseAnswersTwo = (data) => {
    let tot = 0
    let map = new Map()
    let respondends = 0
    data.forEach(line => {
        if(line === ''){
            let localCount = 0;
            for (let value of map.values()){
                if(value == respondends){
                    localCount++
                }
            }
            tot += localCount
            respondends = 0
            map = new Map()
        }
        else{
            respondends++
            for(let i = 0; i < line.length; i++){
                let c = line.charAt(i)
                if(!map.has(c)){
                    map.set(c, 1)
                }
                else {
                    let count = map.get(c) + 1
                    map.set(c, count)
                }
            }
        }
    })
    return tot
}

console.log(parseAnswersOne(loadData()))
console.log(parseAnswersTwo(loadData()))