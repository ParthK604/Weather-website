const weatherform=document.querySelector(".weatherForm");
const cityinput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="7cf8ea9bfe3829c496b4b838abf101f6"

weatherform.addEventListener("submit", async event=>{
   event.preventDefault()//no refreshing of page
   const city=cityinput.value;

   if (city) {
       try {
        const weatherdata=await getweatherdata(city);
        displayweatherinfo(weatherdata);
       } 
       catch (error) {
        console.error(error);
        displayerror(error);
       }
   } 
   else {
     displayerror("Please enter a city"); 
   }
   
});
async function getweatherdata(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiurl)
    if (!response.ok) {
        throw new Error("Could not fetch Weather Data");//error if city not found
    }
    return await response.json();
}
function displayweatherinfo(data) {
    
    const{name:city,main:{temp,humidity},weather:[{description,id}]}=data
    card.textContent="";
    card.style.display="flex";

    const citydisplay=document.createElement("h1")
    const tempdisplay=document.createElement("p")
    const humiditydisplay=document.createElement("p")
    const descdisplay=document.createElement("p")
    const weatheremoji=document.createElement("p")

    citydisplay.textContent=city;
    tempdisplay.textContent=`${((temp-273.35) *(9/5)+32).toFixed(2)} F`
    humiditydisplay.textContent=`Humidity : ${humidity}`;
    descdisplay.textContent=description;
    weatheremoji.textContent=getweatheremoji(id);

    
    citydisplay.classList.add("cityDisplay");
    tempdisplay.classList.add("tempDisplay");
    humiditydisplay.classList.add("humidityDisplay");
    descdisplay.classList.add("descDisplay");
    weatheremoji.classList.add("weatherEmoji");
    
    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatheremoji);
}
function getweatheremoji(weatherid) {
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⛈";
        case (weatherid >= 300 && weatherid < 400):
            return "🌧";
        case (weatherid >= 500 && weatherid < 600):
            return "🌧";
        case (weatherid >= 600 && weatherid < 700):
            return "❄";
        case (weatherid >= 700 && weatherid < 800):
            return "🌫";
        case (weatherid === 800):
            return "☀";
        case (weatherid >= 801 && weatherid < 810):
            return "☁";
        default:
            return "❓";
    }
}
function displayerror(message) {
    const errordisp=document.createElement("p");
    errordisp.textContent=message;
    errordisp.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisp);
}