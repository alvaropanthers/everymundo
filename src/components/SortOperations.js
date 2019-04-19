const 
    ROUTE_PRICE_LOW_TO_HIGH = 1,
    ROUTE_PRICE_HIGH_TO_LOW = 2;

class SortOperations{
    constructor(){
        this.sortLowestRoutesByPrice = this.sortLowestRoutesByPrice.bind(this);
        this.sortHighestRoutesByPrice = this.sortHighestRoutesByPrice.bind(this);
    }

    static get ROUTE_PRICE_LOW_TO_HIGH(){ return ROUTE_PRICE_LOW_TO_HIGH; }
    static get ROUTE_PRICE_HIGH_TO_LOW(){ return ROUTE_PRICE_HIGH_TO_LOW; }

    isLow(a, b){
        if(a > b) return 1;
        if(a < b) return -1;
        if(a === b) return 0;
    }

    sortLowestRoutesByPrice(routes){
        return routes.sort((a, b) => {
            return this.isLow(parseFloat(a.priceUSD), parseFloat(b.priceUSD));
        });
    }

    sortHighestRoutesByPrice(routes){
        return this.sortLowestRoutesByPrice(routes).reverse();
    }

}

export default SortOperations;