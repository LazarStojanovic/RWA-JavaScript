import currency from './currency';
export default class currencyList{
    constructor(){
    }

    returnCurrency(currencyId){
        return new Promise ((resolve,reject) => {
            var newCurrency = new currency(currencyId);
            newCurrency.fetchCurrency()
                .then(data => {resolve(data[0])})
        })   
    }

    returnCurrencyArray(){
        return new Promise ((resolve,reject) => {
            var newCurrency = new currency();
            newCurrency.fetchCurrencyArray()
                .then(data => {resolve(data)})
        })   
    }

    addCurrencyButtonFunctionality(){
        var addCurrencyButton = document.getElementsByClassName('add-currency-button')[0];
        addCurrencyButton.addEventListener("click", () => {
            addCurrencyButton.classList.toggle("open");
        });
    }

    addCurrencyToTable(currencyList,currencyTableBody){
        currencyList.addEventListener("click", () => {
            var clickedListItem = event.target.closest("li");
            if(!clickedListItem.classList.contains('disabled')){
                clickedListItem.classList.add("disabled");
                var currencyId = clickedListItem.children[1].innerText;
                this.returnCurrency(currencyId)
                        .then(currency => {     
                                                 currencyTableBody.insertAdjacentHTML("beforeend",
                                                `<tr class="currency-table-row" currency-name=${currency.abbreviation}>
                                                        <td class="currency-table-data">${currency.abbreviation} <img class="flag" src="${currency.flagURL}"></td>
                                                        <td class="currency-table-data">${currency.buyingRate}</td>
                                                        <td class="currency-table-data">${currency.medianRate}</td>
                                                        <td class="currency-table-data">${currency.sellingRate}</td> 
                                                        <td><input type="button" class="remove-currency-button-${currency.id} newButton" value="X" tag=${currency.id}></td>        
                                                </tr>`);
                                                var button = document.getElementsByClassName(`remove-currency-button-${currency.id}`)[0];
                                                button.addEventListener("click",() => {
                                                    currencyList.querySelector(`[list-data=${currency.abbreviation}]`).classList.remove("disabled");
                                                    var parent = button.parentNode.parentNode;
                                                    parent.remove();
                                                })
                                                
                                            })
                }
        });
    }


}