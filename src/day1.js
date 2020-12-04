const data = require('./data/day01_data')

const doubles = () => {
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data.length; j++){
            if(data[i] + data[j] == 2020){
                console.log(data[i] +" "+ data[j])
                console.log(data[i] * data[j]);
            }
        }
    }
}

//doubles()

const triplets = () => {
    for(var i = 0; i < data.length; i++){
        for(var j = 0; j < data.length; j++){
            for(var k = 0; k < data.length; k++){
                if(data[i] + data[j] + data[k] == 2020){
                    console.log(data[i] +" "+ data[j] +" "+ data[k])
                    console.log(data[i] * data[j] * data[k]);
                }
            }
        }
    }
}

//triplets()