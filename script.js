
const taxAmount = document.getElementById("taxAmount");
const paye = document.getElementById("calculate");
const taxPayable = document.getElementById("taxPayable");


const napsa = 0.05;
const taxThreshold = 4800;
const firstBracket = 0.2;
const nextBracket = 0.3;
const lastBracket = 0.375;
const bandOne = 2000;
const bandTwo = 2100;
const napsaCeiling = 1221.80;
const nhima = 0.01;

function taxCalculator(emoluments) {
  
  //var napsaValue = emoluments*napsa;
  //var beforeTax = emoluments - preTaxDeductions();
   var tax = 0;

  /*if (napsaValue >= napsaCeiling) {
    napsaValue = napsaCeiling;
    var postNapsa = emoluments - napsaValue;
    console.log("napsa = " + napsaValue);
  } else {
    var postNapsa = emoluments - napsaValue;
  }*/
  if(emoluments <= 0) {
    //taxAmount.innerHTML = "k" + 0;
    taxPayable.value = 0 + " ZMK";
    return 0;
    
    
  } else {
    //var taxable = beforeTax - taxThreshold;
    //console.log(taxable);
    if(emoluments < bandOne) {
      tax = emoluments * firstBracket;
    } else {
      tax = bandOne * firstBracket;
      
      //tax = tax1;
      var minusFb = emoluments - bandOne;
      console.log(minusFb);

    }
  }

    //second tax band calculation(tax @30%).
    if(minusFb > bandTwo) {
     //var secondTax = bandTwo * nextBracket;
     tax = tax + (bandTwo * nextBracket);
     var tax3 = minusFb - bandTwo;
    } else if(minusFb < bandTwo) {
      secondTax = minusFb * nextBracket;
      tax += secondTax;
    };
    
    //Balance over(tx @37.5%).
    if(tax3 > 0) {
      var finalTax = tax3 * lastBracket;
      tax += finalTax;
      console.log(tax + " final-tax")
      
    };
    
var answer = tax;
var finalAnswer = answer;
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

 function preTaxDeductions() {
  const inputSalary = document.getElementById("inputSalary");
  const allowances = document.getElementById("inputAllowance");
  if(allowances.value) {
    let nhimaValue = +inputSalary.value * nhima;
    let napsaValue = findGross() * napsa;
    if(napsaValue > napsaCeiling) {
      napsaValue = napsaCeiling;
    };
    var total = nhimaValue + napsaValue + taxCalculator(findTaxable());
    return total;
  } else {
    let nhimaValue = findGross() * nhima;
    let napsaValue = findGross() * napsa;
    if(napsaValue > napsaCeiling) {
      napsaValue = napsaCeiling;
    };
    total = nhimaValue + napsaValue + taxCalculator(findTaxable());
    return total;
  }
  
 }
 preTaxDeductions();

 function findTaxable() {
  //let deductions = preTaxDeductions();
  //let taxableValue = findGross() - deductions;
  if(findGross() > taxThreshold) {
    let taxable = findGross() -taxThreshold;
    
    return taxable;
  } else {
    taxable = 0;
    return taxable;
  }
 }
 findTaxable();


paye.addEventListener("click",() => {
  const inputSalary = document.getElementById("inputSalary"); 
  taxCalculator(findTaxable());
  //inputSalary.value = "";

});

paye.addEventListener("click",() => {
  const taxPayable = document.getElementById("taxPayable");
  //taxPayable.value = taxAmount.innerHTML;
  taxPayable.value = taxCalculator(findTaxable()).toFixed(2) + " ZMK";
  
});

paye.addEventListener("click",() => {
  const pretax = document.getElementById("preTax-deduction");
  pretax.value = preTaxDeductions().toFixed(2) + " ZMK";
});

paye.addEventListener("click",() => {
  const taxableInput = document.getElementById("taxableValue");
  taxableInput.value = findTaxable().toFixed(2) + " ZMK";
});