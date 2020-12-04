const fs = require('fs');

const passwords_1 = () => {
    const buffer = fs.readFileSync('./data/day02_data')
    const rows = buffer.toString().split('\n')
    let count = 0
    rows.forEach((row) => {
        const params = row.split(' ')
        const minmax = params[0].split('-')
        console.log(params)
        
        let val = validateFirst(Number.parseInt(minmax[0]), Number.parseInt(minmax[1]), params[1].slice(0,1), params[2])
        if(val){
            count++
        }
    })

    console.log(count)
}

const validateFirst = (min, max, letter, data) => {
    let pos = 0;
    pos = data.indexOf(letter, pos)
    let count = 0
    while(pos != -1){
        pos = data.indexOf(letter, pos)
        if(pos != -1){
            count++
            pos++
        }
        
    }
    if(min <= count && count <= max){
        return true    
    }
    else {
        return false
    }
}

//passwords_1()

const validateSecond = (row) => {
    console.log(row)
    const params = row.split(' ')
    const minmax = params[0].split('-')
    const first = Number.parseInt(minmax[0])
    const second = Number.parseInt(minmax[1])
    const letter = params[1].slice(0,1)
    const data = params[2]

    if((data.charAt(first-1) === letter) && (data.charAt(second-1) !== letter)){
        return true
    }
    if((data.charAt(first-1) !== letter) && (data.charAt(second-1) === letter)){
        return true
    }
    else {
        return false
    }
}

const passwords_2 = () => {
    const buffer = fs.readFileSync('./data/02_day2')
    let rows = buffer.toString().split('\n')
    let count = 0
    rows.forEach((row) => {
        if(validateSecond(row)){
            count++
        }
    })

    console.log(count)
}

passwords_2()