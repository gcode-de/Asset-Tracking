import { userAssets } from "./main";

export const assetFormContainer = document.querySelector(".assetFormContainer");
export const assetForm = document.querySelector("#form");
export const assetForm__typeField = document.querySelector("#assetTypeField");
export const assetForm__nameField = document.querySelector("#assetNameField");
export const assetForm__quantityField = document.querySelector("#assetQuantityField");
export const assetForm__notesField = document.querySelector("#assetNotesField");
export const assetForm__idField = document.querySelector("#assetIdField");

document.querySelector("#addAssetButton").addEventListener("click", displayAssetForm);
document.querySelector("#form").addEventListener("submit", (event) => {
  handleFormSubmit(event);
});
document.querySelector("#cancelButton").addEventListener("click", hideAssetForm);

export function displayAssetForm(id = null) {
  assetFormContainer.classList.remove("hidden");
  if (typeof id === "number") {
    const asset = userAssets.find((asset) => asset.id === id);
    console.log(asset);
    assetForm__typeField.value = asset.type;
    assetForm__nameField.value = asset.name;
    assetForm__quantityField.value = asset.quantity;
    assetForm__notesField.value = asset.notes;
    assetForm__idField.value = asset.id;
  }
}

export function populateAssetForm(asset) {
  assetFormContainer.classList.remove("hidden");
  //populate
}

//hide assetForm and clear input fields
export function hideAssetForm() {
  assetFormContainer.classList.toggle("hidden");
  assetForm.reset();
}

//Prepare assetNameField dropdown and assetUnit in Form according to assetTypeField
export function setAssetType() {
  if (document.getElementById("assetTypeField").value === "") {
    displayToast("Chose asset type first!");
    return;
  }
  const assetType = document.getElementById("assetTypeField").value;
  switch (assetType) {
    case "stocks":
      document.querySelector("#assetNameField").setAttribute("list", "Stocks");
      document.querySelector("#assetQuantityLabel").innerHTML = "Quantity (Pieces)";
      break;
    case "metals":
      document.querySelector("#assetNameField").setAttribute("list", "Metals");
      document.querySelector("#assetQuantityLabel").innerHTML = "Quantity (Oz)";
      break;
    case "crypto":
      document.querySelector("#assetNameField").setAttribute("list", "Crypto");
      document.querySelector("#assetQuantityLabel").innerHTML = "Quantity (Pieces)";
      break;
  }
}

// export function setIsdirty() {
//   //mark filled input fields as isdirty
//   document.getElementById("assetTypeField").addEventListener("input", function () {
//     console.log("focusout");
//     this.parentNode.classList.add("is-dirty");
//   });
//   document.getElementById("assetNameField").addEventListener("input", function () {
//     console.log("focusout");
//     this.parentNode.classList.add("is-dirty");
//   });
//   document.getElementById("assetQuantityField").addEventListener("input", function () {
//     console.log("focusout");
//     this.parentNode.classList.add("is-dirty");
//   });
//   document.getElementById("assetNotesField").addEventListener("input", function () {
//     console.log("focusout");
//     this.parentNode.classList.add("is-dirty");
//   });
// }

export function handleFormSubmit(event) {
  event.preventDefault();
  //   const newAsset = { id };
  console.log(
    assetForm__typeField.value,
    assetForm__nameField.value,
    assetForm__quantityField.value,
    assetForm__notesField.value,
    assetForm__idField.value
  );
  //   event.target.reset();
  //   event.target.elements.name.focus();
}
