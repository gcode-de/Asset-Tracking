// import { constructApi1URL, updateAssetValues, getValuesFromAPI1 } from "./api.js";
import {
  DELETED_ASSET,
  displayAssetForm,
  displayAssetFormEmpty,
  hideAssetForm,
  setAssetType,
  setIsdirty,
  addAsset,
  deleteAsset,
  undoDeleteAsset,
  editAsset,
  displayToast,
  displaySnackbar,
  displayAssets,
} from "./view.js";
// import { getAssetUnitsFromDB, getAssetsFromDB, saveAssetsToDB } from "./db.js";
// import "./node_modules/material-design-lite/material.min.css";

//bind buttons to functions
document.querySelector("#addAssetButton").addEventListener("click", displayAssetFormEmpty);
document.querySelector("#updateValuesButton").addEventListener("click", () => {
  updateAssetValues(userAssets);
});

//TO DO:  MVC, Dependency Injection, Clean Code - Uncle Bob

export let totalValue = null;

export let userAssets = [
  { id: 0, name: "Bitcoin", quantity: 0.01288, notes: "", type: "crypto", abb: "btc", value: 10_000, baseValue: 40_000 },
  { id: 1, name: "Ethereum", quantity: 0.029, notes: "", type: "crypto", abb: "eth", value: 10_000, baseValue: 4_000 },
  { id: 2, name: "Silver", quantity: 754, notes: "", type: "metals", abb: "silver", value: 10_000, baseValue: 22 },
  { id: 3, name: "Gold", quantity: 3.5, notes: "recently bought", type: "metals", abb: "gold", value: 10_000, baseValue: 1_600 },
];

export const assetUnits = {
  stocks: "Piece/s",
  metals: "Oz",
  crypto: "Piece/s",
};

//SETUP
window.addEventListener("load", async function () {
  //Load userAssets from localstorage if available
  //   userAssets = getUserAssetsFromLocalStorage();

  //Get assets2 from db
  // assets2 = await getAssetsFromDB();

  //   userAssets = calculateAssetValue(assets2, userAssets);
  calculateAssetValue();
  calcTotalValue();
  displayAssets(userAssets, assetUnits);
  updateLocalStorage(userAssets);
  // saveAbbsToDB(assetCodes);
  // saveUnitsToDB(assetQuantityUnits2);
  // getUnitsFromDB()
  // console.log(assetQuantityUnits);
  // constructApi1URL(assets2);
});

function calculateAssetValue() {
  userAssets.forEach((asset) => {
    asset.value = asset.baseValue * asset.quantity;
  });
  return userAssets;
}

function calcTotalValue() {
  let totalValue = userAssets.reduce((acc, asset) => acc + asset.value, 0);
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
  return userAssets;
}

export async function updateLocalStorage() {
  console.log("Updating Local Storage with: ", userAssets);
  if (userAssets == null || userAssets == "undefined") {
    console.log("Found no userAssets to update to Local Storage.");
    return;
  } else {
    await localStorage.setItem("userAssets", JSON.stringify(userAssets));
  }
}
