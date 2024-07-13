const URL = "https://v6.exchangerate-api.com/v6/1d2ed017c57f1fcf6a3cd53b/pair";

const dropdowns = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("form button");

const currFrom = document.querySelector(".from select");
const currTo = document.querySelector(".to select");
const updateMsg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
};

let loadWindow = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // console.log(currFrom.value,currTo.value);

  const newURL = `${URL}/${currFrom.value}/${currTo.value}`;
  let response = await fetch(newURL);
  let data = await response.json();
  let rate = data.conversion_rate;

  let finalAmt = amtVal * rate;
  // console.log(finalAmt);
  updateMsg.innerText = ` ${amtVal} ${currFrom.value}  = ${finalAmt} ${currTo.value}`;
};
window.addEventListener("load", () => {
    loadWindow();
});


btn.addEventListener("click", (event) => {
  event.preventDefault();
  loadWindow();
});
