import { format } from "date-fns";
import { parseISO } from "date-fns";

const myLocation = document.querySelector('#myLocation');
const myForm = document.querySelector('#myForm'); 
const container = document.querySelector('#container');
const small = document.querySelector('#err');
const timeKey = '2347030187594937b54c085e9698118e';
const weatherKey = '9cae58cf169fbd96aa10f3dd1ac14fd0';

//form default prevention
myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchCheck(cityCheck())
});

//check for a city that exist
const cityCheck = function(){
	if(!myLocation.validity.valid){
		setErrorFor(myLocation, "Field is required, use the name of the city and the country code(eg. IT)");
	}else{
        setSuccessFor(myLocation)
		let cityGood = true;
		return cityGood;
	}
};

//event listener for input of city
myLocation.addEventListener("input", cityCheck); 

    //check if search can go
const searchCheck = function(c){
    if(c===true){
        //you can submit
         //this function will get you weather data and call
        //to getTime too
        getWeather(myLocation.value)
            .then(weatherInfo => {
                workObjData(weatherInfo)
            })
       
    }else{
        console.log("error in submition")
    }
};


// this 2 functions are responsable for showing/hiding the error message
const setErrorFor = function(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}


//get weather conditions from api
const getWeather = async function(location){
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherKey}`, {mode: 'cors'})
      const weatherInfo = await response.json();
      const getTime = await fetch (`https://api.bigdatacloud.net/data/timezone-by-location?latitude=${weatherInfo.coord.lat}
      &longitude=${weatherInfo.coord.lon}&utcReference=0&key=${timeKey}`, {mode: "cors"});
      const timeInfo = await getTime.json();
      const getIcon = await fetch(`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`);
      const iconImg = getIcon.url;
      const dataObj = {weatherInfo: weatherInfo,
        timeInfo: timeInfo,
        iconImg: iconImg}
      return dataObj
    } catch (error) {
      console.error(error);
    }
  };
  

  
//work with the data that comes back from api 
const workObjData = function(dataObj){
    const weatherData = dataObj.weatherInfo;
    const timeData = dataObj.timeInfo;
    const iconData = dataObj.iconImg;

    const temperatureandPressure = weatherData.main; 
    const cityName = weatherData.name;  
    const skyConditions = weatherData.weather[0].description; 

    const celsiusTemp = (temperatureandPressure.temp - 273.15).toFixed(0);
    const celsiusMax = (temperatureandPressure.temp_max - 273.15).toFixed(0);
    const celsiusMin = (temperatureandPressure.temp_min - 273.15).toFixed(0);

    const celsius = {
        celsiusTemp : celsiusTemp,
        celsiusMax : celsiusMax,
        celsiusMin : celsiusMin
    }

    const fahrenheitTemp = ((temperatureandPressure.temp - 273.15)* 1.8000 + 32.00).toFixed(0);
    const fahrenheitMax = ((temperatureandPressure.temp_max - 273.15)* 1.8000 + 32.00).toFixed(0);
    const fahrenheitMin = ((temperatureandPressure.temp_min - 273.15)* 1.8000 + 32.00).toFixed(0);

    const fahrenheit = {
        fahrenheitTemp : fahrenheitTemp,
        fahrenheitMax : fahrenheitMax,
        fahrenheitMin : fahrenheitMin
    };

    const dateFormat = parseISO(timeData.localTime);
    const actualTime = format(dateFormat, 'p');

    const myWeather = {
        city : cityName,
        skyConditions : skyConditions,
        celsius: celsius,
        fahrenheit : fahrenheit,
        myIcon : iconData,
        actualTime : actualTime
    };
    displayOnPage(myWeather);
};




//this is the function that actually display the weather
const displayOnPage= function(myWeather){
    const nameH1 = document.createElement('h1');
    const sky = document.createElement('p');
    const temp = document.createElement('p');
    const iconVector = document.createElement('img');
    const timeContainer = document.querySelector('#timeContainer');


	nameH1.innerHTML = myWeather.city;    
	sky.innerHTML = myWeather.skyConditions;
	temp.innerHTML = `${myWeather.celsius.celsiusTemp}C`;
    iconVector.src= myWeather.myIcon;
    timeContainer.innerHTML = myWeather.actualTime;


    container.appendChild(nameH1); 
    container.appendChild(sky); 
    container.appendChild(temp); 
    container.appendChild(iconVector)
};

