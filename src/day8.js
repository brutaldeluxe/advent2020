const fs = require('fs')

const loadData = () => {
    const buffer = fs.readFileSync('./data/day08_data')
    return buffer.toString().split('\n')
}

class LineOfCode {
    constructor(code){
        this._op = code.match(/[a-z]{3}/)[0]
        this._val = Number.parseInt(code.match(/\D\d\d?\d?/)[0])
        this._visited = false
    }
    didRun = () => {
        return this._visited
    }
    getOp = () => {
        this._visited = true
        return this._op
    }
    setOp = (op) => {
        this._op = op
    }
    getVal = () => {
        return this._val
    }
}

const run = (data) => {
    const prg = []
    data.forEach(line => {
        prg.push(new LineOfCode(line))        
    })

    let pointer = 0
    let acc = 0
    while(true){
        let line = prg[pointer]
        try{
            if(line.didRun()){
                console.log(`loop found att line ${pointer}`)
                console.log('acc is '+acc)
                break
            }
        }
        catch(Error){
            console.log(`Reached end of code. Acc is ${acc}`)
            break
        }

        let op = line.getOp()
        console.log(op +' '+ line.getVal())
        if(pointer === 324){
            line.setOp = 'nop'
        }
        switch(op){
            case 'acc': 
                acc += line.getVal()
                console.log(acc)
                pointer++
                break
            case 'nop':
                pointer++
                break
            case 'jmp': 
                pointer += line.getVal()
                break
        }
    }
}

let data = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6',
]
run(loadData())