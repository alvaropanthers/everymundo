import React, { Component } from 'react';
import DateConverter from './DateConverter';

class FlightFormView extends Component{
    constructor(props){
        super(props);
        this.dateConverter = new DateConverter();
    }

    render(){
        const departureDate = this.dateConverter.extractDate(this.props.departureDate);
        const returnDate =  this.dateConverter.extractDate(this.props.returnDate);
       
        return (
            <div className="row">
                <div className="col-md-12">
                    
                    <div className="search-form-container">
                        <form>
                            <div className="form-row">
                                <div className="form-check form-check-inline">
                                    <input id="flighttype" className="form-check-input" type="radio" name="flighttype" value="roundTrip" checked={this.props.tripType === 'roundTrip' ? true : false} onChange={this.props.formHandler}/>
                                    <label htmlFor="flighttype">Round-trip</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input id="flighttype2" className="form-check-input" type="radio" name="flighttype" value="oneWay" checked={this.props.tripType === 'oneWay' ? true : false} onChange={this.props.formHandler}/>
                                    <label htmlFor="flighttype2">One way</label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="origin">From*</label>
                                    <input id="origin" className="form-control" type="text" name="origin" value={this.props.origin} onChange={this.props.formHandler}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="destination">To*</label>
                                    <input id="destination" className="form-control" type="text" name="destination" value={this.props.destination} onChange={this.props.formHandler}/>
                                </div>
                            </div>


                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="departure">Depart*</label>
                                    <input id="departure" className="form-control" type="date" name="departureDate" value={departureDate} onChange={this.props.formHandler}/>
                                </div>
                                
                                <div className="form-group col-md-6">
                                    <label htmlFor="return">Return</label>
                                    <input id="return" className="form-control" type="date" name="returnDate" value={returnDate} onChange={this.props.formHandler} disabled={this.props.tripType === 'oneWay' ? true : false}/>
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="passangers">Passanger(s)*</label>
                                    <input id="passangers" className="form-control" type="number" min="1" name="passangers" value={this.props.passangers} onChange={this.props.formHandler}/>
                                </div>
                                
                                <div className="form-group col-md-6">
                                    <label htmlFor="promocode">Promo Code</label>
                                    <input id="promocode" className="form-control" type="text" name="promocode" value={this.props.promocode} onChange={this.props.formHandler}/>
                                </div>    
                            </div>
                            
                            <div className="form-group">
                                <button className="btn btn-primary" name="submitbtn" onClick={this.props.formHandler}>Search Flight</button>
                            </div>    
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default FlightFormView;