console.log('Client side javascript file is loaded'); 

const weather_form = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');
const msg3 = document.querySelector('#message-3');
const msg4 = document.querySelector('#message-4');
const msg5 = document.getElementById("message-5");

weather_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    msg1.textContent = "Loading..";
    msg2.textContent = "";
    msg3.textContent = "";
    msg4.textContent = "";
    msg5.textContent = "";
    
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error;
            } else {
                msg1.textContent = 'Location : ' + data.location + ' - ' + data.forecast.time;
                msg5.textContent = 'Observation Time : ' + data.forecast.obs_time;
                msg2.textContent = 'Description : ' + data.forecast.description;
                msg3.textContent = 'Temperature : ' + data.forecast.temperature + ' °C';
                msg4.textContent = 'Feelslike : ' + data.forecast.feelslike + ' °C';
            }
        })
    });
});

//console.log(weather_form);