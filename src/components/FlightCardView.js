import React, { Component } from 'react';
import './css/flightCardStyle.css';

class FlightCardView extends Component{
    render(){
        return (
            <div className="col-sm-4 card-custom">
                <div className="card-img" style={ {backgroundImage: 'url(' + this.props.routeCoverImage + ')'} }>
                </div>
                <div className="card-item">
                    <div className="top">
                        <p className="route">
                            <span>{this.props.origin}</span>
                            <span>-</span>
                            <span>{this.props.destination}</span>
                        </p>
                        
                        <p className="departure">
                            <span>{this.props.departureDate}</span>
                        </p>
                    </div>
                    <div className="bottom">
                        <p className="p-price">
                            <span>Fares from</span>
                            <span className="price">${this.props.priceUSD}</span>
                            <span>{this.props.tripType}</span>
                        </p>
                    </div>
                </div>
                <div className="card-item">
                    <button onClick={this.props.clickHandler.bind(this, this.props.tripType, this.props.destination, this.props.origin, this.props.returnDate, this.props.departureDate)}>View Deal</button>
                    
                </div>
            </div>
        );
    }
}

export default FlightCardView;