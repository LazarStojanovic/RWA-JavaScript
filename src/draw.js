import {fromEvent, Subject, interval, zip, from, forkJoin, timer } from 'rxjs';
import { debounceTime, map, filter, scan, take, takeUntil, repeat, pairwise, sampleTime } from 'rxjs/operators';
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
                    .then(currency => this.drawTableRows(currencyTableBody,currencyLista,currency,converterContainer))
        });
        //Crtanje add currency button elementa
        var addCurrencyButton = document.createElement('input');
        addCurrencyButton.type = "button";
        addCurrencyButton.value = "Add Currency";
        addCurrencyButton.classList.add('add-currency-button');
        tableContainer.appendChild(addCurrencyButton);
        //Dodavanje event listener-a buttonu
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
        
        //Crtanje currency converter-a
        var converterContainer = document.createElement('div');
        converterContainer.classList.add('converter-container');
        converterContainer.classList.add("grid-container");
        tableContainer.appendChild(converterContainer);

        this.drawCurrencyConverter(converterContainer,initalCurrencyArray,currencyListObj);

        //Klikom na valuti u pop-up listi valuta dodaje se u tabelu valuta
        currencyListObj.addCurrencyToTable(currencyLista,currencyTableBody,converterContainer);
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

    drawTableRows(currencyTableBody,currencyLista,currency,converterContainer){

        
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
            var option1 = converterContainer.childNodes[2].querySelector(`[option-name=${currency.abbreviation}]`)
            option1.remove();
            var option2 = converterContainer.childNodes[3].querySelector(`[option-name=${currency.abbreviation}]`)
            option2.remove();
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
    
    drawCurrencyConverter(converterContainer,initalCurrencyArray,currencyListObj){
       

        var textInput1 = document.createElement('input');
        textInput1 .type ='text';
        textInput1 .classList.add('text-input1');
        converterContainer.appendChild(textInput1 );

        fromEvent(textInput1,'input')
        .pipe(
            debounceTime(200),
            take(10),
            
        )
        .subscribe(()=>{
            var selectedValue1 = converterContainer.querySelector('.select1').value;
            var selectedValue2 = converterContainer.querySelector('.select2').value;
            currencyListObj.returnCurrencyArray()
                        .then(currencyArray => {
                            var selectedCurrency1 = currencyArray.filter(currency => currency.name === selectedValue1);
                            var selectedCurrency2 = currencyArray.filter( currency => currency.name == selectedValue2);
                            textInput2.value = (parseFloat(textInput1.value)*parseFloat(selectedCurrency1[0].buyingRate))/parseFloat(selectedCurrency2[0].sellingRate);
                            
                        })
            
            
    })

        /*
        textInput1.addEventListener('input',()=>{
                var selectedValue1 = converterContainer.querySelector('.select1').value;
                var selectedValue2 = converterContainer.querySelector('.select2').value;
                currencyListObj.returnCurrencyArray()
                            .then(currencyArray => {
                                var selectedCurrency1 = currencyArray.filter(currency => currency.name === selectedValue1);
                                var selectedCurrency2 = currencyArray.filter( currency => currency.name == selectedValue2);
                                textInput2.value = (parseFloat(textInput1.value)*parseFloat(selectedCurrency1[0].buyingRate))/parseFloat(selectedCurrency2[0].sellingRate);
                                
                            })
                
                
        });
        */
        var textInput2 = document.createElement('input');
        textInput2.type ='text';
        textInput2.classList.add('text-input2');
        converterContainer.appendChild(textInput2);

        //textinput2 eventlistener

        var select1 = document.createElement('select');
        select1.classList.add("select");
        select1.classList.add("select1");
        converterContainer.appendChild(select1);

        initalCurrencyArray.forEach(currencyId =>{ 
                currencyListObj.returnCurrency(currencyId)
                        .then(currency=>{
                            var option = document.createElement('option');
                            option.classList.add(`option`);
                            option.setAttribute("option-name",`${currency.abbreviation}`);
                            option.innerHTML = currency.name;
                            select1.appendChild(option);
                        })
        })

        var select2 = document.createElement('select');
        select2.classList.add("select");
        select2.classList.add("select2");
        converterContainer.appendChild(select2);   
        
        initalCurrencyArray.forEach(currencyId =>{ 
            currencyListObj.returnCurrency(currencyId)
                    .then(currency=>{
                        var option = document.createElement('option');
                        option.classList.add(`option`);
                        option.setAttribute("option-name",`${currency.abbreviation}`);
                        option.innerHTML = currency.name;
                        select2.appendChild(option);
                    })
    })
    }
}
