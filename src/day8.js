const fs = require('fs')

const loadData = () => {
    const buffer = fs.readFileSync('./data/day08_data')
    let data = buffer.toString().split('\n')

    return Array.from(data, line => {
        let match = line.match(/(.*) \+?([-\d]+)/)
        return ({
            op: match[1],
            arg: Number.parseInt(match[2])
        })
    })
}

let data = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'nop -4',
    'acc +6',
]

const run = (program) => {
    const trace = []

    let pointer = 0
    let acc = 0
    while(pointer < program.length){
        
        let line = program[pointer]
        if(trace.includes(line)){
            return {
                pointer,
                acc,
                loop: true,
                trace
            }
        }

        trace.push(line)

        switch(line.op){
            case 'acc': 
                acc += line.arg
                pointer++
                break
            case 'nop':
                pointer++
                break
            case 'jmp': 
                pointer += line.arg
                break
        }
    }
    return {
        pointer,
        acc,
        loop: false,
        trace
    }
}

//part 1
// const result = run(loadData())
// console.log(result.acc)

//part 2
const fixCode = (program) => {
    for(let i = 0; i < program.length; i++){
        let backUpOp = program[i].op 

        if(program[i].op == 'nop'){
            program[i].op = 'jmp'
        }
        else if(program[i].op == 'jmp'){
            program[i].op = 'nop'
        }
        
        let runState = run(program)
        if(!runState.loop){
            return {
                cleanExit: !runState.loop,
                acc: runState.acc
            }
        }
        program[i].op = backUpOp
    }
}

const result = fixCode(loadData())
console.log(result)