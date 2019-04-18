import currency from './currency';

export default class CurrencyList{
    constructor(){
        this.initialCurrencyArrayIndexes = [1,2,4,8,12,18];
        this.initialCurrencyArray = []
        this.currencyArray=[];
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

    addCurrencyButtonFunctionality(){
        var addCurrencyButton = document.getElementsByClassName('add-currency-button')[0];
        addCurrencyButton.addEventListener("click", ()=>{
            addCurrencyButton.classList.toggle("open");
        });
    }

    addCurrencyToTable(currencyList,currencyTableBody){
        currencyList.addEventListener("click", ()=>{
            var clickedListItem = event.target.closest("li");
               if(!clickedListItem.classList.contains('disabled')){
                    clickedListItem.classList.add("disabled");
                    var num = clickedListItem.children[1].innerText;
                    this.fetchCurrency(num)
                        .then(currency => {setTimeout(()=>{ currencyTableBody.insertAdjacentHTML("beforeend",
                                                `<tr class="currency-table-row" currency-name=${currency.abbreviation}>
                                                        <td class="currency-table-data">${currency.abbreviation} <img class="flag" src="${currency.flagUrl}"></td>
                                                        <td class="currency-table-data">${currency.buyingRate}</td>
                                                        <td class="currency-table-data">${currency.medianRate}</td>
                                                        <td class="currency-table-data">${currency.sellingRate}</td> 
                                                        <td><input type="button" class="remove-currency-button-${currency.idNumber} newButton" value="X" tag=${currency.idNumber}></td>        
                                                </tr>`)
                                                },500)
                                            setTimeout(()=>{
                                                var button = document.getElementsByClassName(`remove-currency-button-${currency.idNumber}`)[0];
                                                button.addEventListener("click",()=>{
                                                    currencyList.querySelector(`[list-data=${currency.abbreviation}]`).classList.remove("disabled");
                                                    var parent = button.parentNode.parentNode;
                                                    parent.remove();
                                                })
                                                },600)
                                            })
                    }
        });
    }
   
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
                this.drawTableRows(currencyTableBody,currencyList,currency)
            })
        },400)
         
        var addCurrencyButton = document.createElement('input');
        addCurrencyButton.type = "button";
        addCurrencyButton.value = "Add Currency";
        addCurrencyButton.classList.add('add-currency-button');
        tableContainer.appendChild(addCurrencyButton);

        this.addCurrencyButtonFunctionality();

        var currencyList = document.createElement('ul');
        currencyList.classList.add('currency-list')
        tableContainer.appendChild(currencyList);

        this.addCurrencyDb();
        
        setTimeout(()=>{
            this.currencyArray.forEach(currency => {
                this.drawCurrencyList(currency,currencyList)
            })
        },800)
        
        this.addCurrencyToTable(currencyList,currencyTableBody);
        
        
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

    drawTableRows(currencyTableBody,currencyList,currency){

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

        var currencyTableData = document.createElement('td');
        currencyTableData.classList.add('currency-table-data');
        currencyTableRow.appendChild(currencyTableData);

        var hiddenId =document.createElement('input');
        hiddenId.type="hidden"
        hiddenId.innerHTML = `${currency.idNumber}`;
        hiddenId.classList.add('hiddenId');
        currencyTableData.appendChild(hiddenId);

        var removeCurrencyButton = document.createElement('input');
        removeCurrencyButton.type = "button";
        removeCurrencyButton.value = "X";
        removeCurrencyButton.classList.add('remove-currency-button');
        currencyTableData.appendChild(removeCurrencyButton);

        removeCurrencyButton.addEventListener("click" ,()=>{
            currencyList.querySelector(`[list-data=${currency.abbreviation}]`).classList.remove("disabled");
            var parent = removeCurrencyButton.parentNode.parentNode;
            parent.remove();
        })
        
    } 

    drawCurrencyList(currency,currencyList){

        var listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.setAttribute('list-data',`${currency.abbreviation}`);
        currencyList.appendChild(listItem);

        var listItemSpan = document.createElement('span');
        listItemSpan.classList.add('list-item-span');
        listItemSpan.innerHTML = `${currency.name}  (${currency.symbol})`;

        listItem.appendChild(listItemSpan);
        
        var currencyImg = document.createElement('img');
        currencyImg.classList.add('flag');
        currencyImg.src = currency.flagUrl;
        listItemSpan.appendChild(currencyImg);

        var currencyHidden = document.createElement('input')
        currencyHidden.type = "hidden";
        currencyHidden.classList.add('hidden');
        currencyHidden.innerHTML = `${currency.idNumber}`;
        listItem.appendChild(currencyHidden);

        for(let i = 0;i<this.initialCurrencyArrayIndexes.length;i++){
            if(currency.idNumber === this.initialCurrencyArrayIndexes[i])
                listItem.classList.add('disabled');
        }
   

    }
}