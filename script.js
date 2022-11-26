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

    if (hour < 7) {
        maxTemp = 1.5;
    } else if (hour < 12) {
        maxTemp = 3.5;
    } else if (hour < 16) {
        maxTemp = 6;
    } else if (hour < 21) {
        maxTemp = 5;
    } else if (hour < 24) {
        maxTemp = 4;
    }

    let temp_env = (Math.random() + 5) * maxTemp;
    
    env_temp.innerHTML = `Temperatura ambiental:
        Celsius ${Math.round(temp_env)}° / 
        Farenheit ${Math.round(temp_env * 1.8 + 32)}°`;
},3000);