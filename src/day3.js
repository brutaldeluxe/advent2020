const fs = require('fs');

const doRun = (x,y) => {
    const map = loadMap()
    const width = map[0].length
    let trees = 0
    let posX = 0
    for(let i = 0; i < map.length; i+=y){
        if(map[i].charAt(posX) === '#'){
            trees++
        }
        posX = (posX+x)%width
    }
    return trees
}

const loadMap = () => {
    const buffer = fs.readFileSync('./data/day03_data')
    return buffer.toString().split('\n')
}

console.log(doRun(1,1)*doRun(3,1)*doRun(5,1)*doRun(7,1)*doRun(1,2))