export default class Currency {
    constructor(id , name , abbreviation, symbol ,flagURL,buyingRate,medianRate,sellingRate){
        this.id = id;
        this.name = name;
        this.abbreviation = abbreviation;
        this.symbol = symbol;
        this.flagURL = flagURL;
        this.buyingRate = buyingRate;
        this.medianRate = medianRate;
        this.sellingRate = sellingRate;
    }

    drawCurrency(){

    }
}