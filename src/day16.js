const fs = require('fs');

fs.readFile('./data/day16_data', 'utf8', (err, data) => {
    console.log('question 1: ', partOne(data.split('\n')))
})

// let classM = /^class: [\d]{1,}-[\d]{1,} or [\d]{1,}-[\d]{1,}$/
// let classMatcher = /[1-3]|[7-9]/
// let rowMatcher = /[6-11]|[33-44]/
// let seatMatcher = /[13-40]|[45-50]/
let dlocation = ['44','825','849','962']
let dstation = ['26','296','316','965']
let dplatform = ['46','889','896','949']
let dtrack = ['48','351','369','960']
let ddate = ['25','869','884','966']
let dtime = ['31','217','232','956']
let alocation = ['32','559','574','967']
let astation = ['50','383','394','952']
let aplatform = ['29','128','150','962']
let atrack = ['30','630','647','957']
let clazz = ['45','262','277','966']
let duration = ['35','602','619','965']
let price = ['41','913','926','966']
let route = ['38','191','212','950']
let row = ['25','509','523','965']
let seat = ['39','783','802','973']
let train = ['36','64','80','969']
let type = ['42','750','767','974']
let wagon = ['29','803','821','974']
let zone = ['47','659','672','968']

let myTicket = '157,101,107,179,181,163,191,109,97,103,89,113,167,127,151,53,83,61,59,173'
let rules = []
rules.push(dlocation)
rules.push(dstation)
rules.push(dplatform)
rules.push(dtrack)
rules.push(ddate)
rules.push(dtime)
rules.push(alocation)
rules.push(astation)
rules.push(aplatform)
rules.push(atrack)
rules.push(clazz)
rules.push(duration)
rules.push(price)
rules.push(route)
rules.push(row)
rules.push(seat)
rules.push(train)
rules.push(type)
rules.push(wagon)
rules.push(zone)

class Ticket {
    scanningErr = 0
    constructor(row, rules = []) {
        this.row = row.split(',')
        this.rules = rules
    }
    match(){
        let valid = false
        this.row.forEach(tag => {
            tag = Number.parseInt(tag)
            valid = false
            for(let i = 0; i<this.rules.length; i++){
                if((tag >= this.rules[i][0] && tag <= this.rules[i][1]) || (tag >= this.rules[i][2] && tag <= this.rules[i][3])){
                    valid = true
                }
            }
            if(!valid){
                this.scanningErr += tag
            }
        })
        return this.scanningErr
    }
}

const partOne = (data) => {
    let scanningErr = 0
    data.forEach(ticket => {
        let t = new Ticket(ticket, rules)
        let inv = t.match()
        scanningErr = scanningErr + inv
    })
    return scanningErr
}



