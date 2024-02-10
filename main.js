// import { constructApi1URL, updateAssetValues, getValuesFromAPI1 } from "./api.js";
import { deleteAsset, undoDeleteAsset, displayToast, displaySnackbar, displayAssets } from "./view.js";
import { displayAssetForm, hideAssetForm, setAssetType, handleFormSubmit } from "./Form.js";
// import { getAssetUnitsFromDB, getAssetsFromDB, saveAssetsToDB } from "./db.js";

// bind buttons to functions
document.querySelector("#updateValuesButton").addEventListener("click", () => {
  updateAssetValues();
});
function updateAssetValues() {
  console.log("Einen Scheiß werde ich updaten! :-D");
  displayToast("This function has yet to be implemented!");
}

//TO DO:  MVC, Dependency Injection, Clean Code - Uncle Bob

export let totalValue = null;

export let userAssets = [
  { id: 0, name: "Bitcoin", quantity: 0.01288, notes: "", type: "crypto", abb: "btc", value: 10_000, baseValue: 40_000, isDeleted: false },
  { id: 1, name: "Ethereum", quantity: 0.029, notes: "", type: "crypto", abb: "eth", value: 10_000, baseValue: 4_000, isDeleted: false },
  { id: 2, name: "Silver", quantity: 754, notes: "", type: "metals", abb: "silver", value: 10_000, baseValue: 20.7, isDeleted: false },
  { id: 3, name: "Gold", quantity: 3.5, notes: "recently bought", type: "metals", abb: "gold", value: 10_000, baseValue: 1_900, isDeleted: false },
];

export const assetUnits = {
  stocks: "Piece/s",
  metals: "Oz",
  crypto: "Piece/s",
};

//SETUP
window.addEventListener("load", async function () {
  getUserAssetsFromLocalStorage();
});

export function updateView() {
  calculateAssetValue();
  calcTotalValue();
  displayAssets(userAssets, assetUnits);
  updateLocalStorage(userAssets);
}

async function calculateAssetValue() {
  console.log(userAssets);
  await userAssets.forEach((asset) => {
    asset.value = asset.baseValue * asset.quantity;
  });
}

export function calcTotalValue() {
  let totalValue = userAssets.filter((asset) => !asset.isDeleted).reduce((acc, asset) => acc + asset.value, 0);
  document.querySelector("#total-value").innerHTML = `Total Worth ${totalValue.toLocaleString("de-DE")} €`;
}

async function getUserAssetsFromLocalStorage() {
  console.log("Local Storage = ", localStorage.getItem("userAssets"));
  if (localStorage.getItem("userAssets") == null || localStorage.getItem("userAssets") == "undefined") {
    console.log("could not get userAssets from Local Storage.");
    return NaN;
  }
  userAssets = JSON.parse(localStorage.getItem("userAssets"));
  console.log("got userAssets from Local Storage.", userAssets);
  updateView();
}

export async function updateLocalStorage() {
  console.log("Updating Local Storage with: ", userAssets);
  if (userAssets == null || userAssets == "undefined") {
    console.log("Found no userAssets to update to Local Storage.");
    return;
  }
  await localStorage.setItem("userAssets", JSON.stringify(userAssets));
}
