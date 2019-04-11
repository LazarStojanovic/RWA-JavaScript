
export default class CurrencyList{
    constructor(){
        var currencyArray = [];
       // this.addCurrency();
       
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
            this.currencyArray.forEach(currency => {
                this.drawTableRows(currency)
            });
        }

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

        /*
        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currencyTableRow');
        currencyTableBody.appendChild(currencyTableRow);

        
        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currencyTableData');
        currencyTableData.innerHTML = 'USD';

        
        currencyTableRow.appendChild(currencyTableData);
        var img = document.createElement('img');
        img.classList.add('tdImg');
        img.src = "http://www.geonames.org/flags/l/us.gif";
        currencyTableData.appendChild(img);
        */
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
        img.src = currency.flagURL;
        currencyTableData.appendChild(currencyImg);
        
    } 
}