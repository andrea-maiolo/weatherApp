const changeBackground = function(skyConditions, iconCode){
    // take skyConditions and search in the folder for the ame name img to use   
    // as background   
    const container = document.querySelector('#container');
    switch (skyConditions) {
        case 'broken clouds':
          container.style.backgroundImage = ("url(../dist/style/brokenCloudBerlin.jpg)")
          break;
        case 'clear sky':
          container.style.backgroundImage = ("url(../dist/style/clearSkyRome.jpg)")
          break;
        case 'few clouds':
          container.style.backgroundImage = ("url(../dist/style/fewCloudsRio.jpg)")
          break;
        case 'scattered clouds':
          container.style.backgroundImage = ("url(../dist/style/scatteredCloudsAsia.jpeg)")
          break;
        case 'shower rain':
          container.style.backgroundImage = ("url(../dist/style/lightRainParis.jpg)")
          break;
        case 'rain':
          container.style.backgroundImage = ("url(../dist/style/rainNewYork.jpg)")
          break;
        case 'thunderstorm':
          container.style.backgroundImage = ("url(../dist/style/thunderstormHongKong.jpg)")
          break;
        case 'snow':
          container.style.backgroundImage = ("url(../dist/style/snowTokyo.jpg)")
          break;
        case 'mist':
          container.style.backgroundImage = ("url(../dist/style/mistLondon.jpg)")
          break;
        default:
          console.log(`Sorry, no background was found`);
      }

    const getIcon = async function(icon){
      try{
        const response = await fetch (`https://openweathermap.org/img/wn/${icon}@2x.png`);
        // container.appendChild(response);
        const iconImg = response.url;
        console.log(iconImg);
        const iconVector = document.createElement('img');
        iconVector.src= iconImg;
        container.appendChild(iconVector)
      }catch(error){
        console.error(error)
      }
    }
    getIcon(iconCode)
}

export {changeBackground}