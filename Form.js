import { userAssets, updateView } from "./main.js";
import { displayToast } from "./view.js";

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
  assetForm__typeField.parentElement.classList.remove("is-dirty", "is-upgraded");
  assetForm__nameField.parentElement.classList.remove("is-dirty", "is-upgraded");
  assetForm__quantityField.parentElement.classList.remove("is-dirty", "is-upgraded");
  assetForm__notesField.parentElement.classList.remove("is-dirty", "is-upgraded");
  assetFormContainer.scrollIntoView({ behavior: "smooth" });
  assetForm__nameField.addEventListener("click", setAssetType);

  if (typeof id === "number") {
    const asset = userAssets.find((asset) => asset.id === id);
    assetForm__typeField.value = asset.type;
    assetForm__typeField.dispatchEvent(new Event("input", { bubbles: true }));
    assetForm__nameField.value = asset.name;
    assetForm__nameField.dispatchEvent(new Event("input", { bubbles: true }));
    assetForm__quantityField.value = asset.quantity;
    assetForm__quantityField.dispatchEvent(new Event("input", { bubbles: true }));
    assetForm__notesField.value = asset.notes;
    assetForm__notesField.dispatchEvent(new Event("input", { bubbles: true }));
    assetForm__idField.value = asset.id;
    assetForm__idField.dispatchEvent(new Event("input", { bubbles: true }));
    setAssetType();
  }
}

export function hideAssetForm() {
  assetFormContainer.classList.toggle("hidden");
  assetForm__nameField.removeEventListener("input", setAssetType);
  assetForm.reset();
}

//Prepare assetNameField dropdown and assetUnit in Form according to assetTypeField
export function setAssetType() {
  if (assetForm__typeField.value === "") {
    displayToast("Chose asset type first!");
    return;
  }
  const assetType = assetForm__typeField.value;
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

export function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  console.log(formProps);
  if (formProps.id) {
    const assetIndex = userAssets.findIndex((asset) => asset.id === Number(formProps.id));
    console.log(assetIndex, userAssets[assetIndex]);
    userAssets[assetIndex] = { ...userAssets[assetIndex], quantity: formProps.quantity, notes: formProps.notes };
    displayToast('Asset "' + userAssets[assetIndex].name + '" was updated.');
  } else {
    const newAsset = {
      ...formProps,
      value: 0,
      baseValue: 0,
      isDeleted: false,
      id: userAssets.length,
      abb: "", // TO DO
    };
    userAssets.push(newAsset);
    displayToast('Asset "' + newAsset.name + '" was created.');
  }
  updateView();
  hideAssetForm();
}
