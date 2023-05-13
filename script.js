
const taxAmount = document.getElementById("taxAmount");
const paye = document.getElementById("calculate");


const napsa = 0.05;
const taxThreshold = 4800;
const firstBracket = 0.2;
const nextBracket = 0.3;
const lastBracket = 0.375;
const bandOne = 2000;
const bandTwo = 2100;
const napsaCeiling = 1342;
const nhima = 0.01;

function taxCalculator(emoluments) {
  //var napsaValue = emoluments*napsa;
  var beforeTax = emoluments - preTaxDeductions();
   var tax = 0;

  /*if (napsaValue >= napsaCeiling) {
    napsaValue = napsaCeiling;
    var postNapsa = emoluments - napsaValue;
    console.log("napsa = " + napsaValue);
  } else {
    var postNapsa = emoluments - napsaValue;
  }*/

  if(beforeTax <= taxThreshold) {
    console.log(napsaValue);
    //taxAmount.innerHTML = "k" + 0;
    return taxAmount.innerHTML =  0 + " ZMK";
    
  } else {
    var taxable = beforeTax - taxThreshold;
    console.log(taxable);
    if(taxable < bandOne) {
      tax = taxable * firstBracket;

      console.log("PAYE = " + tax);
      

    } else {
      var tax1 = bandOne * firstBracket;
      tax += tax1;
      console.log(taxable + " ??");
      var minusFb = taxable - bandOne;
      console.log(minusFb);
      console.log("taxable is: " + taxable);
    }
  }

    //second tax band calculation(tax @30%).
    if(minusFb > bandTwo) {
     var secondTax = bandTwo * nextBracket;
     tax += secondTax;
     var tax3 = minusFb - bandTwo; 
     console.log(taxable);
    } else if(minusFb < bandTwo) {
      secondTax = tax * nextBracket;
      tax += secondTax;
      console.log(secondTax);
    };
    
    //Balance over(tx @37.5%).
    if(tax3 > 0) {
      var finalTax = tax3 * lastBracket;
      tax += finalTax;
      console.log(tax3 + " why");
    };
    
var answer = tax;
var finalAnswer = taxAmount.innerHTML = answer + " ZMK";
return finalAnswer;
};

function findGross() {
  const inputSalary = document.getElementById("inputSalary");
  const allowances = document.getElementById("inputAllowance");
  if(!allowances.value) {
    var gross = inputSalary.value;
  } else {
    gross = +inputSalary.value + +allowances.value;
    
  }
return gross;
}
findGross();
const grossTotal = findGross();

 function preTaxDeductions() {
  const inputSalary = document.getElementById("inputSalary");
  const allowances = document.getElementById("inputAllowance");
  if(allowances.value) {
    let nhimaValue = +inputSalary.value * nhima;
    let napsaValue = grossTotal * napsa;
    let total = nhimaValue + napsaValue;
    return total;
  } else {
    let nhimaValue = grossTotal * nhima;
    let napsaValue = grossTotal * napsa;
    if(napsaValue > napsaCeiling) {
      napsaValue = napsaCeiling;
    }
    let total = nhimaValue + napsaValue;
    return total;
  }
  
 }
 preTaxDeductions();

 function findTaxable() {
  let deductions = preTaxDeductions();
  let taxableValue = grossTotal - deductions;
  if(taxableValue > taxThreshold) {
    let taxable = taxableValue -taxThreshold;
    
    return taxable;
  } else {
    taxable = 0;
    return taxable;
  }
 }
 findTaxable();


paye.addEventListener("click",() => {
  const inputSalary = document.getElementById("inputSalary"); 
  taxCalculator(grossTotal);
  //inputSalary.value = "";

});

paye.addEventListener("click",() => {
  const taxPayable = document.getElementById("taxPayable");
  taxPayable.value = taxAmount.innerHTML;
});

paye.addEventListener("click",() => {
  const pretax = document.getElementById("preTax-deduction");
  pretax.value = preTaxDeductions() + " ZMK";
});

paye.addEventListener("click",() => {
  const taxableInput = document.getElementById("taxableValue");
  taxableInput.value = findTaxable() + " ZMK";
})





