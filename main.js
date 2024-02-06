import { constructApi1URL, updateAssetValues, getValuesFromAPI1 } from './api.js';
import { DELETED_ASSET, displayAssetForm, displayAssetFormEmpty, hideAssetForm, setAssetType, setIsdirty, addAsset, deleteAsset, undoDeleteAsset, editAsset, displayToast, displaySnackbar, displayAssets } from './view.js';
import { getAssetUnitsFromDB, getAssetsFromDB, saveAssetsToDB, } from './db.js';
import './node_modules/material-design-lite/material.min.css';

//bind buttons to functions
document.querySelector('#addAssetButton').addEventListener('click', displayAssetFormEmpty)
document.querySelector('#updateValuesButton').addEventListener('click', function () { updateAssetValues(assets2) })

//shady workaround for modules
window.deleteAsset = deleteAsset
window.undoDeleteAsset = undoDeleteAsset
window.editAsset = editAsset
window.displayToast = displayToast
window.displaySnackbar = displaySnackbar
window.setAssetType = setAssetType
window.setIsdirty = setIsdirty
window.addAsset = addAsset
window.DELETED_ASSET = DELETED_ASSET
window.calculateAssetValue = calculateAssetValue
window.calcTotalValue = calcTotalValue
window.updateLocalStorage = updateLocalStorage
// window.setDoc = setDoc
// window.doc = doc
// window.db = db
window.getAssetUnitsFromDB = getAssetUnitsFromDB
window.getAssetsFromDB = getAssetsFromDB
window.saveAssetsToDB = saveAssetsToDB


//TO DO:  MVC, Dependency Injection, Clean Code - Uncle Bob

let totalValue
window.totalValue = totalValue

let assets2 = {}
window.assets2 = assets2

let userAssets = {
    Bitcoin: {
        assetQuantity: 0.01288,
        assetNotes: '',
    },
    Ethereum: {
        assetQuantity: 0.029,
        assetNotes: '',
    },
    Silver: {
        assetQuantity: 754,
        assetNotes: '',
    },
    Gold: {
        assetQuantity: 2.25,
        assetNotes: '',
    },

}
window.userAssets = userAssets;


let assetUnits = {
    'Stocks': 'Pieces',
    'Metals': 'Oz',
    'Crypto': 'Pieces',
};
window.assetUnits = assetUnits;

//SETUP
window.addEventListener('load', async function () {
    //Load userAssets from localstorage if available
    // userAssets = getUserAssetsFromLocalStorage();

    //Get assets2 from db
    console.log(assets2);
    assets2 = await getAssetsFromDB();

    userAssets = calculateAssetValue(assets2, userAssets);
    totalValue = calcTotalValue(userAssets);
    displayAssets(userAssets, assets2, assetUnits);
    updateLocalStorage(userAssets);
    // saveAbbsToDB(assetCodes);
    // saveUnitsToDB(assetQuantityUnits2);
    // getUnitsFromDB()
    // console.log(assetQuantityUnits);

    // constructApi1URL(assets2);
})

function calculateAssetValue(assets2, userAssets) {
    console.log('Start calcAssetValue', userAssets);
    //calculate assetValue (assetBaseValue * assetQuantity)
    for (let singleAsset in userAssets) {
        // console.log(singleAsset);
        // console.log(userAssets[singleAsset]);
        userAssets[singleAsset].assetValue = assets2[singleAsset].assetValue * userAssets[singleAsset].assetQuantity;
    }
    console.log('End calcAssetValue', userAssets);
    return userAssets;
};

function calcTotalValue(userAssets) {
    let totalValue = 0
    console.log('Start calcTotalValue', totalValue, userAssets);
    //Calculate and dispuserTay totalValue of Assets

    for (let singleAsset in userAssets) {
        // console.log('assetValue', userAssets[singleAsset].assetValue);
        totalValue = totalValue + userAssets[singleAsset].assetValue
        // console.log('TotalValuuserT', totalValue);
    }
    document.querySelector('#total-value').innerHTML = `Total Worth ${totalValue.toLocaleString("de-DE")} €`;
    console.log('End calcTotaValue', totalValue);
    return totalValue;
}

async function getUserAssetsFromLocalStorage() {
    //Load userAssets from localstorage if available
    console.log("Local Storage = ", localStorage.getItem("userAssets"));
    if (localStorage.getItem("userAssets") == null || localStorage.getItem("userAssets") == 'undefined') {
        console.log("could not get userAssets from Local Storage.");
        return NaN;
    } else {
        userAssets = JSON.parse(localStorage.getItem("userAssets"));
        console.log("got userAssets from Local Storage.", userAssets);
        return userAssets;
    }
}

async function updateLocalStorage(userAssets) {
    //update assets in localstorage
    console.log("Updating Local Storage with: ", userAssets);
    if (userAssets == null || userAssets == 'undefined') {
        console.log("Found no userAssets to update to Local Storage.");
        return;
    } else {
        await localStorage.setItem("userAssets", JSON.stringify(userAssets));
    }
}