import currency from './currency';

export default class CurrencyList{
    constructor(){
        this.initialCurrencyArrayIndexes = [1,2,3,4,5,6];
        this.initialCurrencyArray = []
        this.currencyArray=[];
        this.addCurrencyButton;
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
    addInitialCurrencyToTable(){
            this.initialCurrencyArrayIndexes.forEach(currencyId => {
                this.fetchCurrency(currencyId)
                     .then(currency =>{this.initialCurrencyArray.push(currency)})
            });   
        }  

    addCurrencyDb(){
        for(let i = 1;i<33;i++){
                this.fetchCurrency(i)
                    .then(currency =>{this.currencyArray.push(currency)})
        }   
    }

    buttonFunctionality(){
        this.addCurrencyButton = document.getElementsByClassName('add-currency-button')[0];
        this.addCurrencyButton.addEventListener("click", ()=>{this.addCurrencyButton.style.background = "black"});
    }


    

    //dugme koje dodaje valute u listu valuta(pritiskom na dugme se otvara slide window gde sve vide sve preostale valute(onclike u listi se brise ta valuta iz liste i dodaje u drugu))
    
    //dugme koje brise valutu iz liste(isto vazi za dugme koje brise valutu iz liste)

    drawList()
    {
        var wrapAll = document.createElement('div');
        wrapAll.classList.add('wrap-all');
        document.body.appendChild(wrapAll);

        var currencyHeader = document.createElement('header');
        currencyHeader.classList.add('currency-header');
        currencyHeader.innerHTML = 'Currency List and Converter';
        wrapAll.appendChild(currencyHeader);

        var tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');
        wrapAll.appendChild(tableContainer);

        var currencyTable = document.createElement('table');
        currencyTable.classList.add('currency-table');
        tableContainer.appendChild(currencyTable);

        var currencyTableBody = document.createElement('tbody')
        currencyTableBody.classList.add('currency-table-body');
        currencyTable.appendChild(currencyTableBody);
        
        this.drawTableHeaders(currencyTableBody);

        this.addInitialCurrencyToTable();

        setTimeout(()=>{
            this.initialCurrencyArray.forEach(currency => {
                this.drawTableRows(currencyTableBody,currency)
            })
        },400)
         
        var addCurrencyButton = document.createElement('input');
        addCurrencyButton.type = "button";
        addCurrencyButton.value = "Add Currency";
        addCurrencyButton.classList.add('add-currency-button');
        wrapAll.appendChild(addCurrencyButton);
        this.buttonFunctionality();

        var currencyList = document.createElement('ul');
        currencyList.classList.add('currency-list')
        tableContainer.appendChild(currencyList);

        this.addCurrencyDb();

        setTimeout(()=>{
            this.currencyArray.forEach(currency => {
                this.drawCurrencyList(currency,currencyList)
            })
        },800)
        
        
        
        
    }

    drawTableHeaders(currencyTableBody){

        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currency-table-row');
        currencyTableBody.appendChild(currencyTableRow);
        
        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currency-table-header');
        currencyTableHeader.innerHTML = 'Country, Currency symbol';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currency-table-header');
        currencyTableHeader.innerHTML = 'Buying Rate';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currency-table-header');
        currencyTableHeader.innerHTML = 'Median rate';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currency-table-header');
        currencyTableHeader.innerHTML = 'Selling Rate';
        currencyTableRow.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currency-table-header');
        currencyTableHeader.innerHTML = 'Remove currency';
        currencyTableRow.appendChild(currencyTableHeader);
    }

    drawTableRows(currencyTableBody,currency){

        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currency-table-row');
        currencyTableBody.appendChild(currencyTableRow);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableData.innerHTML = currency.abbreviation;
        currencyTableRow.appendChild(currencyTableData);

        var currencyImg = document.createElement('img');
        currencyImg.classList.add('flag');
        currencyImg.src = currency.flagUrl;
        currencyTableData.appendChild(currencyImg);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableData.innerHTML = currency.buyingRate;
        currencyTableRow.appendChild(currencyTableData);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableData.innerHTML = currency.medianRate;
        currencyTableRow.appendChild(currencyTableData);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableData.innerHTML = currency.sellingRate;
        currencyTableRow.appendChild(currencyTableData);

        var removeCurrencyButton = document.createElement('input');
        removeCurrencyButton.type = "button";
        removeCurrencyButton.value = "X";
        removeCurrencyButton.classList.add('remove-currency-button');
        currencyTableRow.appendChild(removeCurrencyButton);
        
    } 

    drawCurrencyList(currency,currencyList){

        var listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML = `${currency.name}`
        currencyList.appendChild(listItem);
        
        
/*
        var currencyImg = document.createElement('img');
        currencyImg.classList.add('flag');
        currencyImg.src = currency.flagUrl;
        listItem.appendChild(currencyImg);*/

        

    }
}