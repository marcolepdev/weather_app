const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let weekDay = weekday[d.getDay()];

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

let newdate = day + " " + monthNames[d.getMonth()] + " " + year;


let btn = document.getElementById('search');

btn.onclick = async function getData() {

    let city = document.getElementById('input').value;

    const api_key = 'API_KEY';

        //API CALL  with axios                   
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
                        
            .then(
                
            async response => {
                
            let data = await response.data

        //if the request can't be processed (city is not found)

            if (response.status !== 200) {
            
                throw new Error(response.status);
            
                } else {
            

        //if the call works and the request is being 
            console.log(data);

            //collecting data from API
            let weather = data.weather[0].main;
            let humidity = data.main.humidity;
            let feels_like = data.main.feels_like;
            let temperature = data.main.temp;
            let maxTemp = data.main.temp_max;
            let minTemp = data.main.temp_min;
            let country = data.sys.country;
            maxTemp = parseInt(maxTemp) - 273.15;
            maxTemp = Math.ceil(maxTemp);
            minTemp = parseInt(minTemp) - 273.15;
            minTemp = Math.floor(minTemp); 
            temperature = parseInt(temperature) -273;
            feels_like = parseInt(feels_like) -273.15;
            feels_like = Math.ceil(feels_like);
            let windSpeed = data.wind.speed;

        switch(weather){
            case 'Clear':
                weather = 'Sunny';
                document.body.style.backgroundImage = "url('images/sunny-background.jpg')";
                break;
            case 'Clouds':
                weather = 'Cloudy';
                document.body.style.backgroundImage = "url('images/cloudy-background.jfif')";
                break;
            case 'Snow':
                weather = 'Snow';
                document.body.style.backgroundImage = "url('images/snowy-background.jpg')";
                break;
            case 'Rain':
                weather = 'Rain'
                document.body.style.backgroundImage = "url('images/rainy-background.jpg')";
                break;
            case 'Fog':
                weather = 'Foggy';
                document.body.style.backgroundImage = "url('images/foggy-background.jpg')";
                break;
        }

            //data on
            document.querySelector('#wind-speed').textContent = "Wind Speed: " + windSpeed + " " + "km/h";
            document.querySelector('#humidity').textContent = "Humidity: " + humidity + " %";
            document.querySelector('#min-temp').textContent = "Min Temp: " + minTemp + "°C";;
            document.querySelector('#max-temp').textContent = "Max Temp: " + maxTemp + "°C";;
            document.querySelector('#entire-day-numeric').textContent = newdate;
            document.querySelector('#day-of-the-week').textContent = weekDay;
            document.querySelector('#temperature').textContent = temperature + "°C";
            document.querySelector('#city-and-country').textContent = data.name + ", " + country;
            document.querySelector('#weather-conditions').textContent = weather;

                }})
                

                //In case of errors, shows 
                .catch (error =>
                    alert('Please insert a valid city name!'));
                
                    

            };
