
const taxAmount = document.getElementById("taxAmount");
const paye = document.getElementById("calculate");
const inputSalary = document.getElementById("inputSalary");
const napsa = 0.05;
const taxThreshold = 4800;
const firstBracket = 0.2;
const nextBracket = 0.3;
const lastBracket = 0.375;
const bandOne = 2000;
const bandTwo = 2100;
const napsaCeiling = 1342;

function taxCalculator(emoluments) {
  let tax;
  let napsaValue = emoluments*napsa;
  if (napsaValue >= napsaCeiling) {
    napsaValue = napsaCeiling;
  };

  if(emoluments <= taxThreshold) {
    //taxAmount.innerHTML = "k" + 0;
    
    return taxAmount.innerHTML = "k" + 0;
    
  };

  if (emoluments > taxThreshold) {
   var postNapsa = emoluments - napsaValue;
    console.log(emoluments);
    
    if(postNapsa > taxThreshold) {
      var taxOne = postNapsa -taxThreshold;
      if(taxOne > bandOne) {
       tax = bandOne * firstBracket;
      //taxAmount.innerHTML = "k" + tax;
      var tax2 = taxOne - bandOne;
      return tax;
      } else {
       tax = taxOne * firstBracket;
       console.log(tax);
        //taxAmount.innerHTML = "k" + taxLess;
      };
      
      } else {
       // taxAmount.innerHTML = "k" + 0;
       var noTax = 0;
       return noTax;

      }
    };
    //second tax band calculation(tax @30%).
    if(tax2 > bandTwo) {
     var secondTax = bandTwo * nextBracket;
     var tax3 = tax2 - bandTwo; 
     console.log(secondTax);
    } else if(tax2 < bandTwo) {
      secondTax = tax2 * nextBracket;
    };
    
    //Balance over(tx @37.5%).
    if(tax3 > 0) {
      var finalTax = tax3 * lastBracket;
      console.log(tax3);
    };
let answer = tax + finalTax + secondTax;
let finalAnswer = taxAmount.innerHTML = "k" + answer;
return finalAnswer;
};
paye.addEventListener("click",() => {
  taxCalculator(inputSalary.value);
  inputSalary.value = "";

});
