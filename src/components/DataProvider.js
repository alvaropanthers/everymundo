import axios from 'axios';

const 
    API_KEY = 'GG33MU72HG65',
    POST_URL = 'https://everymundointernship.herokuapp.com/search/',
    GET_URL = 'https://everymundointernship.herokuapp.com/popularRoutes/';

class DataProvider{
    
    getFlights(){
        return axios.get(GET_URL + API_KEY);
    }

    postSearch(destination, origin, tripType, departureDate, returnDate, passengerCount, promoCode){
        console.log(destination + " " + origin + " " + tripType + " " + departureDate + " " + returnDate + " " + passengerCount + " " + promoCode)
        return axios.post(POST_URL + API_KEY, {
            destination: destination,
            origin: origin,
            tripType: tripType,
            departureDate: departureDate,
            returnDate: returnDate,
            passengerCount: Number(passengerCount),
          });
    }
}

export default DataProvider;