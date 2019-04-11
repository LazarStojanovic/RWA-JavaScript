
export default class CurrencyList{
    constructor(){
        var currencyArray = [];
       // this.addCurrency();
        this.drawList();
       
    }

    /*addCurrency(currency){
        this.currencyArray.push(currency);
    }*/

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

        if(this.currencyArray !== undefined){
            this.currencyArray.forEach(element => {
                this.drawTableRows(element)
            });
        }

    }

    drawTableHeaders(currencyTableBody){
        
        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Country, Currency symbol';
        currencyTableBody.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Buying Rate';
        currencyTableBody.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Median rate';
        currencyTableBody.appendChild(currencyTableHeader);

        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currencyTableHeader');
        currencyTableHeader.innerHTML = 'Selling Rate';
        currencyTableBody.appendChild(currencyTableHeader);

    }

    drawTableRows(element){
        var currencyRow = document.createElement('tr');
        currencyRow.classList.add('currencyRow');
        currencyTable.appendChild(currencyRow);
    } 
}