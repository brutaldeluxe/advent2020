const fs = require('fs');

const loadData = () => {
    let buffer = fs.readFileSync('./data/debug_data')

    buffer = Array.from(buffer.toString().split('\n'), row => {
        return Number.parseInt(row)
    })
    return buffer.sort((a,b) => a - b)
}

const firstPart = (data) => {
    let cntDiffOne = 0
    let cntDiffThree = 0
    
    for(let i = 0; i < data.length-1; i++) {
        let diff = 0
        if(i == 0){
            diff = data[i]
            diff = diff == 1 ? cntDiffOne++ : cntDiffThree++
        }
        diff = data[i+1]-data[i]
        if(diff == 1){
            cntDiffOne++
        }
        else if(diff == 3){
            cntDiffThree++
        }else {
            console.log('shit')
        }
    }
    cntDiffThree++

    return {
        cntDiffOne,
        cntDiffThree,
        prod: cntDiffOne * cntDiffThree
    }
}

//part1
let data = loadData()
console.log(firstPart(data))

const findNext = (adapter, data) => {
    let pos = data.indexOf(adapter)
    let result = []
    for(let i = pos+1; i < data.length; i++){
        if(data[i]-adapter <= 3){
            result.push(data[i])
        }
        else{
            break
        }
    }
    return result
}

const buildTree = (pos) => {
    let arr = [data[pos]]
    for(let i = pos; i < data.length; i++){
        //arr.push(findNext(data[i], data))
        let next = findNext(data[i], data)
        next.forEach(item => {
            arr.splice()
        })
    }
    console.log(arr) 
}

buildTree(0)


