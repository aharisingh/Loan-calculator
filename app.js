//select targets.
var form = document.getElementById("form-1");
var loanAmountInput = document.getElementById("inlineFormInputGroup1"); 
console.log(loanAmountInput.value);
var interestRateInput = document.getElementById("inlineFormInputGroup2");
var tenure = document.getElementById("repaymentYear");
var calcBtn = document.getElementById("calcBtn");
var monthlyPayment = document.getElementById("inlineFormInputGroup3");
var totalPayment = document.getElementById("inlineFormInputGroup4");
var totalInterest = document.getElementById("inlineFormInputGroup5");
var payment = document.getElementById("payment");
var spinner = document.getElementById("loader");

//addEventListener
form.addEventListener("submit",showSpinner);

//calculation function
 function calculation(){
     //calculate rate of interest per month
     rateOfInterest = interestRateInput.value/1200;
     //calculate emi(loan amount to pay per month)
     var emi = (loanAmountInput.value)*(rateOfInterest)*Math.pow(1+rateOfInterest,12*tenure.value)/[Math.pow(1+rateOfInterest,12*tenure.value)-1];
     //calculate totalAmount to be paid.
     var totalAmountToBePaid =(emi*12*tenure.value);
     //calculate totalInterest to be paid.
     var TotalInterestToBePaid =(emi*12*tenure.value - loanAmountInput.value);

//using value of Emi to check whether its valid entry or not
     if(isFinite(emi)){
//set value to emi
     monthlyPayment.value = emi.toFixed(3);
     //set value to TotalAmountToBePaid
     totalPayment.value = totalAmountToBePaid.toFixed(3);
     //set value to TotalInterestToBePaid
     totalInterest.value = TotalInterestToBePaid.toFixed(3);
     //on submiting form display Payment.
     payment.style.display = "block";
     spinner.style.display = "none";
     }
     else{
         //error function to be called for invalid input.
         errorFunction();
         spinner.style.display = "none";
     }
       
 }


 //initially payment is not displayed
 payment.style.display = "none";
 //initially loader is not displayed.
 spinner.style.display = "none";

 //showspinner function(to be called on submitting the form.)
 function showSpinner(e){
     spinner.style.display = "block";
     setTimeout(calculation,3000);
     e.preventDefault();
 }
//error function to be called(when input data does not satisfy validity condition.)
 function errorFunction(){
     //create Container for error message
     var errorContainer = document.createElement("div");
     //add class to container
     errorContainer.className = "alert alert-danger";
     //select card in which errorContainer to be placed
     var card = document.getElementById("card");
     //select header above which errorMessage is to be displayed.
     var header = document.querySelector(".card-header");
     //create Textnode
     var text = document.createTextNode("Please Enter the Input Correctly.");
     //append text to errorContainer(add errormessage to errorContainer)
     errorContainer.appendChild(text);
     //insert errorContainer in card before header
     card.insertBefore(errorContainer,header);
     //remove the error message after 4s being it called.
     setTimeout(removeError,5000);
 }

 //removeError function to be called after 4s error message is displayed.
 function removeError(){
    var header = document.querySelector(".card-header");
     header.previousSibling.remove();
 }