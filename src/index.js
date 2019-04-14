import currencyList from './currencyList';
import currency from './currency';

var List1 = new currencyList();
List1.drawList();
setTimeout(()=>{  List1.addCurrencyDb();  },3000)
console.log(List1.currencyArray)
