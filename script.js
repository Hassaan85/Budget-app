let totalAmount =document.getElementById("total-amount");
let userAmount =document.getElementById("user-amount");

const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError= document.getElementById("product-title-error");
const productCostError=document.getElementById("product-cost-errpr");
const amount=document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list=document.getElementById("list");
let tempAmount=0;


//Set Budget Part

totalAmountButton.addEventListener("click",() => {
    tempAmount= totalAmount.value;


//empty or negative inpur 

if (tempAmount ==="" ||tempAmount < 0) {
    errorMessage.classList.remove("hide");
}

else {
    errorMessage.classList.add("hide");
  //Set Budget
  amount.innerHTML = tempAmount;

  //set balance 
  balanceValue.innerText= tempAmount -
  expenditureValue.innerText

  //clear Input Box
  totalAmount.value ="";
  }

});

//function to disable edit and delete buttom 
const disableButtons = (bool) =>{
let editButtons = document.getElementsByClassName("edit");
Array.from(editButtons).forEach((element) => {
    element.disabled=bool;
});
};

//funtion to modify list elements
const modifyElement = (element, edit=false) => {
    let parenttDiv = element.parentElement;
    let currentbalance = balanceValue.innerText;
    let currenttExpense = expenditureValue.innerText;
    let parentAmount = parenttDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parenttDiv.querySelector(".product").innerText;
        productTitle.value =parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt
    (currentbalance) + parseInt (parentAmount);
    expenditureValue.innerText =parseInt
    (currenttExpense) - parseInt
    (parentAmount);
    parenttDiv.remove();

};

//function to create list 

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement
    ("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product"> ${expenseName} </p>
    <p class="amount">
    ${expenseValue} </p>`;
    let editButton = document.createElement
    ("button");
    editButton.classList.add("fa-solid" ,"fa-pen-to-square","edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid","fa-trash" ,"delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild
    (sublistContent);
};

//function to Add expenses 

checkAmountButton.addEventListener("click", () => {
    //empty checks
    if (!userAmount.value || !productTitle.value) {

      productTitleError.clearlist.remove("hide");
      return false;
    }

    //Enable Buttons
    disableButtons(false);

    //Expense
    let expenditure = parseInt(userAmount.value);

    //total Expenses
    let sum = parseInt (expenditureValue.innerText) + expenditure;
    expenditureValue.innerText =sum;
    //total balance(budget -total expense)
    const totalBalance = tempAmount -sum;
    balanceValue.innerText =totalBalance;
  //create list
    listCreator(productTitle.value ,userAmount.value);

    //Empty inputs
    productTitle.value ="";
    userAmount.value ="";
});