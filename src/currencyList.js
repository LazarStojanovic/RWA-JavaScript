import currency from './currency';

export default class CurrencyList{
    constructor(){
        this.initialCurrencyArray = [1,2,3,4,5];
        this.currencyArray=[];
        this.currency;
        this.i;
       
    }

    fetchCurrency(i){
        return new Promise((resolve,reject) => {
            const error = false;
            this.currency = new currency(i);
            if(!error){
                resolve(this.currency)
            }else{
                reject('Error:Something went wrong');
            }
    
        });
    }
    addInitialCurrency(){
            this.initialCurrencyArray.forEach(currencyId => {
                this.fetchCurrency(currencyId)
                     .then(currency =>{this.currencyArray.push(currency)})
            });   
        }  

    addCurrencyDb(){
        for(let i = 6;i<33;i++){
                this.fetchCurrency(i)
                    .then(currency =>{this.currencyArray.push(currency)})
        }   
    }
    //dugme koje dodaje valute u listu valuta
    
    //dugme koje brise valutu iz liste

    drawList()
    {
        var wrapAll = document.createElement('div');
        wrapAll.classList.add('wrap-all');
        document.body.appendChild(wrapAll);

        var tableContainer = document.createElement('div');
        tableContainer.classList.add('tableContainer');
        wrapAll.appendChild(tableContainer);

        var currencyTable = document.createElement('table');
        currencyTable.classList.add('currencyTable');
        tableContainer.appendChild(currencyTable);

        var currencyTableBody = document.createElement('tbody')
        currencyTableBody.classList.add('currencyTableBody');
        currencyTable.appendChild(currencyTableBody);
        
        this.drawTableHeaders(currencyTableBody);

        this.addInitialCurrency();

        setTimeout(()=>{
            this.currencyArray.forEach(currency => {
                this.drawTableRows(currencyTableBody,currency)
            })
        },400)
         

    }

    drawTableHeaders(currencyTableBody){

        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currencyTableRow');
        currencyTableBody.appendChild(currencyTableRow);
        
        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Country, Currency symbol';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Buying Rate';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Median rate';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Selling Rate';
        currencyTableRow.appendChild(currencyTableHeader);
    }

    drawTableRows(currencyTableBody,currency){

        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currencyTableRow');
        currencyTableBody.appendChild(currencyTableRow);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currencyTableData');
        currencyTableData.innerHTML = currency.abbreviation;
        currencyTableRow.appendChild(currencyTableData);

        var currencyImg = document.createElement('img');
        currencyImg.classList.add('tdImg');
        currencyImg.src = currency.flagUrl;
        currencyTableData.appendChild(currencyImg);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currencyTableData');
        currencyTableData.innerHTML = currency.buyingRate;
        currencyTableRow.appendChild(currencyTableData);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currencyTableData');
        currencyTableData.innerHTML = currency.medianRate;
        currencyTableRow.appendChild(currencyTableData);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currencyTableData');
        currencyTableData.innerHTML = currency.sellingRate;
        currencyTableRow.appendChild(currencyTableData);
        
    } 
}