const fs = require('fs');

const loadData = () => {
    const buffer = fs.readFileSync('./data/day04_data')
    return buffer.toString().split('\n')
}

class Passport {
    constructor(){
        this.byr = false
        this.iyr = false
        this.eyr = false
        this.hgt = false
        this.hcl = false
        this.ecl = false
        this.pid = false
    }
    isValid = function() {
        if(this.byr == true && this.iyr == true && this.eyr == true && this.hgt == true && this.hcl == true && this.ecl == true && this.pid == true){
            return true
        }
        else {
            return false
        }
    }
}

const filter = (key, line) => {
    const keys = line.split(' ')
    for(let i = 0; i < keys.length; i++){
        if(keys[i].includes(key)){
            return keys[i].substring(4)
        }
    }
    return ''
}

const validateByr = (byr) => {
    const year = Number.parseInt(byr)
    return (byr.length == 4 && year >= 1920 && year <= 2002)
}

const validateIyr = (iyr) => {
    const year = Number.parseInt(iyr)
    return (iyr.length == 4 && year >= 2010 && year <= 2020)
}

const validateEyr = (eyr) => {
    const year = Number.parseInt(eyr)
    return (eyr.length == 4 && year >= 2020 && year <= 2030)
}

const validateHgt = (hgt) => {
    if(hgt.endsWith('cm')){
        hgt = hgt.substring(0, hgt.length-2)
        const height = Number.parseInt(hgt)
        return (height >= 150 && height <= 193)
    }
    else if(hgt.endsWith('in')){
        hgt = hgt.substring(0, hgt.length-2)
        const height = Number.parseInt(hgt)
        return (height >= 59 && height <= 76)
    }
    return false
}

const validateHcl = (hcl) => {
    const val = hcl.match(/^#[0-9a-f]{6}/i)
    if(!!val){
        return true
    }
    return false
}

const validateEcl = (ecl) => {
    switch(ecl){
        case 'amb' : return true
        case 'blu' : return true
        case 'brn' : return true
        case 'gry' : return true
        case 'grn' : return true
        case 'hzl' : return true
        case 'oth' : return true
        default: return false
    }
}

const validatePid = (pid) => {
    return pid.length == 9 && !Number.isNaN(pid)
}

const parsePassport = (data) => {
    let count = 0
    let p = new Passport()
    data.forEach(line => {
        if(line.includes('byr')){
            let val = filter('byr', line)
            p.byr = validateByr(val)
        }
        if(line.includes('iyr')){
            let val = filter('iyr', line)
            p.iyr = validateIyr(val)
        }
        if(line.includes('eyr')){
            let val = filter('eyr', line)
            p.eyr = validateEyr(val)
        }
        if(line.includes('hgt')){
            let val = filter('hgt', line)
            p.hgt = validateHgt(val)
        }
        if(line.includes('hcl')){
            let val = filter('hcl', line)
            p.hcl = validateHcl(val)
        }
        if(line.includes('ecl')){
            let val = filter('ecl', line)
            p.ecl = validateEcl(val)
        }
        if(line.includes('pid')){
            let val = filter('pid', line)
            p.pid = validatePid(val)
        }
        if(line === ''){
            if(p.isValid()){
                count++
            }
            p = new Passport()
        }
    })
    return count
}

const data = loadData();
console.log(parsePassport(data))