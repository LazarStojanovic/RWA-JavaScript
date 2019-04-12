
export default class CurrencyList{
    constructor(){
        var currencyArray = [];
       
    }

    //funkcija koja dodaje inicojalno prve 4-5 valute!, kako lista ne bi bila prazna na pocetku

    //dugme koje dodaje valute u listu valuta
    
    //dugme koje brise valutu iz liste

    //napraviti fetch u currency koji vraca valutu u odnosu na primljeni id (napraviti da currency prima neki broj za koji se ispituje da li takva valuta postoji u vazi ili ne)
    //ova funkcija ce ucitati valutu iz baze pretvoriti je iz json response u js objekat i taj objekat pushovati u currency Array

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