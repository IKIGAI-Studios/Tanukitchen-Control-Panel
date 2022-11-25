const date = document.getElementById('date');
const env_temp = document.getElementById('env_temp');
const stove = document.getElementById('stove');
const weight = document.getElementById('weight');
const ilum = document.getElementById('ilumination');
const smoke = document.getElementById('smoke');
const extract = document.getElementById('extract');
const tConsole = document.getElementById('tConsole');

let today = new Date();
let timeOut = setInterval(() => {
    hour = today.getHours();
    maxTemp = 1;
    if (hour < 7) {
        //maxTemp = 
    }

    let temp_env = (Math.random() + 5) * maxTemp; 
},1000);