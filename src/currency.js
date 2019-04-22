export default class Currency {
    constructor(idNumber){
        this.idNumber=idNumber;
    }
    fetchCurrency(){
        return new Promise(async (resolve,reject)=>{
            var currencyUrl = `http://localhost:3000/curency?id=${this.idNumber}`;
            var response = await fetch(currencyUrl)
            var data =  await response.json();
            resolve(data);
        })   
    }
    
    fetchCurrencyArray(){
        return new Promise(async (resolve,reject)=>{
            var currencyUrl = `http://localhost:3000/curency`;
            var response = await fetch(currencyUrl)
            var data =  await response.json();
            resolve(data);
        })   
    }     
}   
