import currencyList from './currencyList';
export default class draw{
    constructor(){
        
    }

    drawList(){

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

        //Crtanje Table Headera
        this.drawTableHeaders(currencyTableBody);
        /////////Dodavanje par valuta u tabelu koji se odmah prikazuju
        var currencyListObj;
        currencyListObj = new currencyList();
        var initalCurrencyArray = [1,2,4,8,15,18];
        initalCurrencyArray.forEach(currencyId => {
            currencyListObj.returnCurrency(currencyId)
                    .then(currency => this.drawTableRows(currencyTableBody,currencyLista,currency))
        });

        var addCurrencyButton = document.createElement('input');
        addCurrencyButton.type = "button";
        addCurrencyButton.value = "Add Currency";
        addCurrencyButton.classList.add('add-currency-button');
        tableContainer.appendChild(addCurrencyButton);

        currencyListObj.addCurrencyButtonFunctionality();
        //Crtanje pop-up liste valuta   
        var currencyLista = document.createElement('ul');
        currencyLista.classList.add('currency-list')
        tableContainer.appendChild(currencyLista);

        //Popunjavanje pop-up liste valuta
        currencyListObj.returnCurrencyArray()
                .then(data => {
                    data.forEach(currency =>this.drawCurrencyList(currency,currencyLista,initalCurrencyArray))
                })
        //Klikom na valuti u pop-up listi valuta dodaje se u tabelu valuta
        currencyListObj.addCurrencyToTable(currencyLista,currencyTableBody);
    }

    drawTableHeaders(currencyTableBody){

        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currency-table-row');
        currencyTableBody.appendChild(currencyTableRow);
        
        var currencyTableHeader = document.createElement('th');
        currencyTableHeader.classList.add('currency-table-header');
        currencyTableHeader.innerHTML = 'Country, Currency';
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

    drawTableRows(currencyTableBody,currencyLista,currency){

        
        var currencyTableRow = document.createElement('tr');
        currencyTableRow.classList.add('currency-table-row');
        currencyTableRow.setAttribute("currency-name",`${currency.abbreviation}`)
        currencyTableBody.appendChild(currencyTableRow);

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableData.innerHTML = currency.abbreviation;
        currencyTableRow.appendChild(currencyTableData);

        var currencyImg = document.createElement('img');
        currencyImg.classList.add('flag');
        currencyImg.src = currency.flagURL;
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

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableRow.appendChild(currencyTableData);

        var hiddenId =document.createElement('input');
        hiddenId.type="hidden"
        hiddenId.innerHTML = `${currency.id}`;
        hiddenId.classList.add('hiddenId');
        currencyTableData.appendChild(hiddenId);

        var removeCurrencyButton = document.createElement('input');
        removeCurrencyButton.type = "button";
        removeCurrencyButton.value = "X";
        removeCurrencyButton.classList.add('remove-currency-button');
        currencyTableData.appendChild(removeCurrencyButton);

        removeCurrencyButton.addEventListener("click" ,()=>{
            currencyLista.querySelector(`[list-data=${currency.abbreviation}]`).classList.remove("disabled");
            var parent = removeCurrencyButton.parentNode.parentNode;
            parent.remove();
        })

    }

    drawCurrencyList(currency,currencyLista,initalCurrencyArray){

        var listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.setAttribute('list-data',`${currency.abbreviation}`);
        currencyLista.appendChild(listItem);

        var listItemSpan = document.createElement('span');
        listItemSpan.classList.add('list-item-span');
        listItemSpan.innerHTML = `${currency.name}  (${currency.symbol})`;

        listItem.appendChild(listItemSpan);
        
        var currencyImg = document.createElement('img');
        currencyImg.classList.add('flag');
        currencyImg.src = currency.flagURL;
        listItemSpan.appendChild(currencyImg);

        var currencyHidden = document.createElement('input')
        currencyHidden.type = "hidden";
        currencyHidden.classList.add('hidden');
        currencyHidden.innerHTML = `${currency.id}`;
        listItem.appendChild(currencyHidden);

        for(let i = 0;i<initalCurrencyArray.length;i++){
            if(currency.id === initalCurrencyArray[i])
                listItem.classList.add('disabled');
        }
    

    }
    
}
