export default class Currency {
    constructor(idNumber){
        this.idNumber = idNumber;
        this.fetchCurrency();
    }
    fetchCurrency(){
        var currencyUrl = `http://localhost:3000/curency?id=${this.idNumber}`;
        fetch(currencyUrl)
            .then(response => {
                return response.json();
            })
            .then( data => {
                this.name = data[0].name
                this.abbreviation = data[0].abbreviation;
                this.symbol = data[0].symbol;
                this.flagUrl = data[0].flagURL;
                this.buyingRate = data[0].buyingRate;
                this.medianRate = data[0].medianRate;
                this.sellingRate = data[0].sellingRate;
                })
    }   
}