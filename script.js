const date = document.getElementById('date');
const env_temp = document.getElementById('env_temp');
const stove = document.getElementById('stove');
const oven = document.getElementById('oven');
const weight = document.getElementById('weight');
const ilum = document.getElementById('ilumination');
const smoke = document.getElementById('smoke');
const lbExtract = document.getElementById('extract');
const btnExtract = document.getElementById('btnExtract');
const btnStop = document.getElementById('btnStop');
const tConsole = document.getElementById('tConsole');

let today = new Date();
let stop = false, extract = false;
lbExtract.innerHTML = "Estado del Extractor: Detenido";
let timeFast = setInterval(() => {
    hour = today.getHours();
    if (!stop) {
        if (hour < 7) {
            max_env = 1.5;
            max_stove = -10;
            max_oven = -10;
            max_weight = 0;
            ilumination = "ON";
            smoke_lvl = "Low";
        } else if (hour < 12) {
            max_env = 3.5;
            max_stove = 150;
            max_oven = 200;
            max_weight = 10000;
            ilumination = "Light";
            smoke_lvl = "Medium";
        } else if (hour < 16) {
            max_env = 6;
            max_stove = 150;
            max_weight = 10000;
            ilumination = "OFF";
            smoke_lvl = "High";
        } else if (hour < 21) {
            max_env = 5;
            max_stove = 150;
            max_oven = 100;
            max_weight = 10000;
            ilumination = "Light";
            smoke_lvl = "High";
        } else if (hour < 24) {
            max_env = 4;
            max_stove = 100;
            max_oven = 150;
            max_weight = 10000;
            ilumination = "ON";
            smoke_lvl = "Medium";
        }
    } else {
        console.info("false");
        max_env = 0;
        max_stove = 0;
        max_oven = 0;
        max_weight = 0;
        ilumination = "WARNING";
    }

    let temp_env = (Math.random() + 5) * max_env;
    
    env_temp.innerHTML = `Temperatura ambiental:
        Celsius ${Math.round(temp_env)}° / 
        Farenheit ${Math.round(temp_env * 1.8 + 32)}°`;

    let temp_stove = (Math.random() * max_stove);

    stove.innerHTML = `Temperatura Estufal:
        Celsius ${Math.round(temp_stove)}° / 
        Farenheit ${Math.round(temp_stove * 1.8 + 32)}°`;

    let temp_oven = (Math.random() * max_oven);

    oven.innerHTML = `Temperatura Hornal:
        Celsius ${Math.round(temp_oven)}° / 
        Farenheit ${Math.round(temp_oven * 1.8 + 32)}°`;

    let weight_rand = (Math.random() * max_weight);

    weight.innerHTML = `Bascula:
        ${Math.round(weight_rand)} gr`;

    ilum.innerHTML = `Iluminación: ${ilumination}`;

    smoke.innerHTML = `Nivel de Humo: ${smoke_lvl}`;
},3000);

function Stop() {
    stop = !stop;
    if (stop) btnStop.innerHTML = "Reanudar";
    else btnStop.innerHTML = "Parar";
}

function Extract() {
    extract = !extract;
    if (!extract) {
        btnExtract.innerHTML = "Detener";
        lbExtract.innerHTML = "Estado del Extractor: Extrayendo";
    }
    else {
        btnExtract.innerHTML = "Extraer";
        lbExtract.innerHTML = "Estado del Extractor: Detenido";
    }
}
