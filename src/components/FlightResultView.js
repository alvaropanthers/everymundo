import React, { Component } from 'react';
import SortOperations from './SortOperations';

class ResultItemView extends Component{
    render(){
        return (
            <div className="row result-item-row">
                <div className="col-md-3 result-item">
                    <p className="lead">
                        <span>{this.props.departureTime}</span>
                    </p>
                </div>
                <div className="col-md-3 result-item">
                    <p className="lead">
                        <span>{this.props.arrivalTime}</span>
                    </p>
                </div>
                <div className="col-md-3 result-item">
                    <p className="lead">
                        <span>{this.props.fareClass}</span>
                    </p>
                </div>
                <div className="col-md-3 result-item">
                    <p className="lead p-price">
                        <span>${this.props.priceUSD}</span>
                    </p>
                </div>
            </div>
        );
    }
}

class FlightResultView extends Component{
    constructor(props){
        super(props);
        this.selectHandler = this.selectHandler.bind(this);
        this.state = {routes: this.props.routes}
        this.sortOperations = new SortOperations();
    }


    selectHandler(event){
        let routes = this.state.routes;
        if(Number(event.target.value)=== Number(SortOperations.ROUTE_PRICE_LOW_TO_HIGH)){
            routes = this.sortOperations.sortLowestRoutesByPrice(routes);
        }else if(Number(event.target.value)=== Number(SortOperations.ROUTE_PRICE_HIGH_TO_LOW)){
            routes = this.sortOperations.sortHighestRoutesByPrice(routes);
        }

        if(routes.length){
            this.setState({
                routes: routes,
            });
        }
    }

    render(){
        let routes = this.state.routes;
        let routesResult = "";

        if(routes){
            routesResult = routes.map((obj, index) => {
                return (<ResultItemView
                key={index}
                departureTime={obj.departureTime} 
                arrivalTime={obj.arrivalTime}
                fareClass={this.props.fareClass}
                priceUSD={obj.priceUSD}/>);
            });
        }
        
        return (
            <div>
                <div className="row result-options">
                    <div className="col-md-6">
                        <h5>
                            <span>{this.props.departureDate}</span>
                        </h5>
                    </div>
                    <div className="col-md-6 text-right">
                        <div className="row">
                            <div className="col">
                                <h5>Sort by</h5>
                            </div>
                            <div className="col">
                                <select id="result-options-select" className="form-control" onChange={this.selectHandler}>
                                    <option value="1">Sort options</option>
                                    <option value="1">Price - Low to High</option>
                                    <option value="2">Price - High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row result-item-header">
                    <div className="col-md-3">
                        <p>
                            <span>Depart</span>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p>
                            <span>Arrive</span>
                        </p>
                    </div>
                    <div className="col-md-3">
                        <p>
                            <span>Fare Class</span>
                        </p>
                    </div> 
                    <div className="col-md-3">
                        <p>
                            <span>Price</span>
                        </p>
                    </div>
                </div>

                {routesResult}
            
            </div>
        );
    }
}

export default FlightResultView;