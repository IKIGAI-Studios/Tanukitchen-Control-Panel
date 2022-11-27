import KitchenObj from './kitchenObj.js';

const date = document.getElementById('date');
const env_temp = document.getElementById('env_temp');
const smoke = document.getElementById('smoke');
const brightness = document.getElementById('brightness');

const btnExtract = document.getElementById('btnExtract');
const btnStove = document.getElementById('btnStove');
const btnOven = document.getElementById('btnOven');
const btnWeight = document.getElementById('btnWeight');
const btnLight = document.getElementById('btnLight');


// Initialize kitchen objects
const Stove = new KitchenObj(document.getElementById('stove'));
const Oven = new KitchenObj(document.getElementById('oven'));
const Weight = new KitchenObj(document.getElementById('weight'));
const Light = new KitchenObj(document.getElementById('light'));
const Extractor = new KitchenObj(document.getElementById('extract'));

const tConsole = document.getElementById('tConsole');

let today = new Date();

// Initialize the variables for the ranges
let stop = false;
let max_env = 0;
let smoke_lvl = 0;
let brightness_lvl = 'No data';

// Get the today's date and set it into input date
date.value = today.toISOString().substring(0, 10);

let timeFast = setInterval(() => {
    let hour = today.getHours();

    if (!stop) {
        if (hour < 7) {
            max_env = 1.5;
            brightness_lvl = 'Bajo';
        } 
        else if (hour < 12) {
            max_env = 3.5;
            brightness_lvl = 'Medio';
        } 
        else if (hour < 16) {
            max_env = 6;
            brightness_lvl = 'Alto';
        } 
        else if (hour < 21) {
            max_env = 5;
            brightness_lvl = 'Medio';
        } 
        else {
            max_env = 4;
            brightness_lvl = 'Bajo';
        }

        btnStove.removeAttribute('disabled');
        btnOven.removeAttribute('disabled');
        btnWeight.removeAttribute('disabled');
        btnLight.removeAttribute('disabled');
        btnExtract.removeAttribute('disabled');
    }
    else {
        max_env = 0;
        smoke_lvl = 0;
        brightness_lvl = 'Sin datos';
        
        Stove.setOn(false);
        Oven.setOn(false);
        Weight.setOn(false);
        Light.setOn(false);
        Extractor.setOn(false);

        btnStove.innerHTML = "Encender";
        btnOven.innerHTML = "Encender";
        btnWeight.innerHTML = "Encender";
        btnLight.innerHTML = "Encender";
        btnExtract.innerHTML = "Extraer";

        btnStove.setAttribute('disabled', true);
        btnOven.setAttribute('disabled', true);
        btnWeight.setAttribute('disabled', true);
        btnLight.setAttribute('disabled', true);
        btnExtract.setAttribute('disabled', true);

        Light.setText('WARNING');
    }


    let temp_env = (Math.random() + 5) * max_env;

    env_temp.innerHTML = `Temperatura ambiental:
        Celsius ${Math.round(temp_env)}° / 
        Farenheit ${Math.round(temp_env * 1.8 + 32)} °F`;

    smoke.innerHTML = `Nivel de Humo: ${smoke_lvl}`;
    brightness.innerHTML = `Nivel de luminosidad: ${brightness_lvl}`;
    
    
    if (Stove.isOn) {
        let temp_stove = randomIntBetween(100,110);

        Stove.setText(
            `Temperatura de Estufa:
            Celsius ${temp_stove}° / 
            Farenheit ${Math.round(temp_stove * 1.8 + 32)}°F`
        );
    }

    if (Oven.isOn) {
        let temp_oven = randomIntBetween(100,110);

        Oven.setText(
            `Temperatura de Horno:
            Celsius ${temp_oven}° / 
            Farenheit ${Math.round(temp_oven * 1.8 + 32)}°F`
        );
    }

    if (Weight.isOn) {
        let weight_rand = randomIntBetween(400,500);

        Weight.setText(
            `Bascula:
            ${Math.round(weight_rand)} gr`
        );
    }

    if (Light.isOn) {
        Light.setText(
            `Luces encendidas`
        );
    }

    if (Extractor.isOn) {
        Extractor.setText(
            `Extrayendo...`
        );
    }

}, 1500);

btnExtract.addEventListener('click', (e) => {
    Extractor.toggle();

    Extractor.isOn ? btnExtract.innerHTML = "Detener" : btnExtract.innerHTML = "Extraer";
});

btnStove.addEventListener('click', (e) => {
    Stove.toggle();

    Stove.isOn ? btnStove.innerHTML = "Apagar" : btnStove.innerHTML = "Encender";
});

btnOven.addEventListener('click', (e) => {
    Oven.toggle();

    Oven.isOn ? btnOven.innerHTML = "Apagar" : btnOven.innerHTML = "Encender";
});

btnWeight.addEventListener('click', (e) => {
    Weight.toggle();

    Weight.isOn ? btnWeight.innerHTML = "Apagar" : btnWeight.innerHTML = "Encender";
});

btnLight.addEventListener('click', (e) => {
    Light.toggle();

    Light.isOn ? btnLight.innerHTML = "Apagar" : btnLight.innerHTML = "Encender";
});

btnStop.addEventListener('click', (e) => {
    stop = !stop;
    stop ? btnStop.innerHTML = "Reanudar" : btnStop.innerHTML = "Parar";
});


function randomIntBetween(min, max) {
    return Math.floor(Math.random()*(max - min + 1)) + min;
}  

