import React, { Component } from 'react';
import './App.css';
import FlightCardView from './components/FlightCardView'
import FlightFormView from './components/FlightFormView'
import DateConverter from './components/DateConverter';
import FlightResultView from './components/FlightResultView';
import DataProvider from './components/DataProvider';
import arrow_left from './components/images/arrow-left.svg'

class App extends Component {
  constructor(props){
    super(props);
    this.defaultState = this.defaultState.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.dateConverter = new DateConverter();
    this.dataProvider = new DataProvider();

    this.state = { 
      data: [], 
      showForm: false,
      showResults: false,
      tripType: "",
      origin: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      passangers: "1",
      promocode: "",
      resultData: []
    };
  }

  componentDidMount(){
    this.dataProvider.getFlights()
    .then(response =>{
      this.setState({
        data: response.data,
      });
    })
    .catch(error => {
      console.error(error);
    });
  
  }

  defaultState(){
    this.setState({ 
      showForm: false,
      showResults: false,
      tripType: "",
      origin: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      passangers: "1",
      promocode: "",
      resultData: []
    });
  }

  clickHandler(tripType, destination, origin, returnDate, departureDate, e){
    this.setState({
      tripType: tripType,
      origin: origin,
      destination: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      showForm: true
    });
  }

  formHandler(event){
    event.preventDefault();

    if("flighttype".localeCompare(event.target.name) === 0){
      if("roundTrip".localeCompare(event.target.value) === 0){
        this.setState({
          tripType: event.target.value
        });
      }else{
        this.setState({
          tripType: event.target.value
        });
      }
    }else if("destination".localeCompare(event.target.name) === 0){
      this.setState({
        destination: event.target.value
      });
    }else if("origin".localeCompare(event.target.name) === 0){
      this.setState({
        origin: event.target.value
      });
    }else if("departureDate".localeCompare(event.target.name) === 0){
      this.setState({
        departureDate: this.dateConverter.converDate(event.target.value)
      });
    }else if("returnDate".localeCompare(event.target.name) === 0){
      this.setState({
        returnDate: this.dateConverter.converDate(event.target.value)
      });
    }else if("passangers".localeCompare(event.target.name) === 0){
      this.setState({
        passangers: event.target.value
      });
    }else if("promocode".localeCompare(event.target.name) === 0){
      this.setState({
        promocode: event.target.value
      });
    }else if("submitbtn".localeCompare(event.target.name) === 0){
     this.dataProvider.postSearch(this.state.destination, this.state.origin, this.state.tripType, 
        this.state.departureDate, this.state.returnDate, this.state.passangers, this.state.promocode)
      .then(response => {
        this.setState({
          showResults: true,
          resultData: response.data
        });
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  render() {
    let result = '';
    let showBackBtn = false;
    const backBtn = (
      <div className="row back-btn-container">
        <div className="col-md-12">
          <button className="back-btn" onClick={this.defaultState}>
          <img src={arrow_left} alt=""/>
          </button>
        </div>
      </div>);

    if(!this.state.showForm && !this.state.showResults && this.state.data){
      result = this.state.data.map((obj, index) =>{
        return (<FlightCardView
        key={index} 
        routeCoverImage={obj.routeCoverImage}
        origin={obj.origin}
        destination={obj.destination}
        departureDate={obj.departureDate}
        returnDate={obj.returnDate}
        tripType={obj.tripType}
        priceUSD={obj.priceUSD}
        clickHandler={this.clickHandler}
        />);
      });
      result = <div className="row">{result}</div>;
    }else if(this.state.showForm && !this.state.showResults){
      result = (<FlightFormView
      tripType={this.state.tripType} 
      origin={this.state.origin}
      destination={this.state.destination}
      departureDate={this.state.departureDate}
      returnDate={this.state.returnDate}
      passangers={this.state.passangers}
      promocode={this.state.promocode}
      formHandler={this.formHandler}
      defaultState={this.defaultState}
      />);
      showBackBtn = true;
    }else if(this.state.showResults && this.state.resultData){
      result = this.state.resultData.map((obj, index) => {
        return (<FlightResultView
        key={index}
        departureDate={obj.departureDate}
        destination={obj.destination}
        fareClass={obj.fareClass}
        origin={obj.origin}
        returnDate={obj.returnDate}
        routes={obj.routes}
        defaultState={this.defaultState}
        />);
      });
      showBackBtn = true;
    }

    return (
      <div className="container">
          { showBackBtn ? backBtn : ""}
          { result }
      </div>
    );
  }
}

export default App;
