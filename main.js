import { constructApi1URL, updateAssetValues, getValuesFromAPI1 } from './api.js';
import { DELETED_ASSET, displayAssetForm, displayAssetFormEmpty, hideAssetForm, setAssetType, setIsdirty, addAsset, deleteAsset, undoDeleteAsset, editAsset, displayToast, displaySnackbar, displayAssets } from './view.js';
import './node_modules/material-design-lite/material.min.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAPZIGG6BLKh16z4K1gCZdagIW4xxR0Ceg",
    authDomain: "asset-tracker-5c25e.firebaseapp.com",
    projectId: "asset-tracker-5c25e",
    storageBucket: "asset-tracker-5c25e.appspot.com",
    messagingSenderId: "761013757539",
    appId: "1:761013757539:web:0963e33076d9460448ba56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// window.displayAssetForm = displayAssetForm
document.querySelector('#addAssetButton').addEventListener('click', displayAssetFormEmpty)
// window.hideAssetForm = hideAssetForm
document.querySelector('#updateValuesButton').addEventListener('click', function () { updateAssetValues(assetValues) })
window.deleteAsset = deleteAsset
window.undoDeleteAsset = undoDeleteAsset
window.editAsset = editAsset
window.displayToast = displayToast
window.displaySnackbar = displaySnackbar
window.setAssetType = setAssetType
window.setIsdirty = setIsdirty
window.addAsset = addAsset
window.DELETED_ASSET = DELETED_ASSET
// window.calculateAssetBaseValue = calculateAssetBaseValue
window.calculateAssetValue = calculateAssetValue
window.calcTotalValue = calcTotalValue
// window.updateAssetAbbs = updateAssetAbbs
// window.updateAssetValues = updateAssetValues
window.updateLocalStorage = updateLocalStorage
window.setDoc = setDoc
window.doc = doc
window.db = db

// import './node_modules/material-design-lite/material.min.css'

let totalValue
window.totalValue = totalValue

let assets2
window.assets2 = assets2

// get asset details from db
async function getAssetsFromDB() {
    const assets2 = {};
    console.log('getting assets2 from db');

    const querySnapshot = await getDocs(collection(db, "assets2"));
    querySnapshot.forEach((asset) => {
        // asset.data() is never undefined for query doc snapshots
        // console.log(asset.id, " => ", asset.data());
        assets2[asset.id] = asset.data();
    });
    // console.log(assets2);
    return assets2;
};

async function saveAssetsToDB(assets2) {
    for (let asset in assets2) {
        // asset.data() is never undefined for query doc snapshots
        // console.log(asset.id, " => ", asset.data());
        // assetsNew[asset.id] = {};
        // assetsNew[asset.id].assetAbb = asset.data().assettAbb;
        // assetsNew[asset.id].assetValue = asset.data().assetValue;
        // assetsNew[asset.id].assetType = asset.data().assetType;
        console.log(assets2[asset].assettAbb);
        setDoc(doc(db, "assets2", asset), { assetAbb: assets2[asset].assettAbb, assetValue: assets2[asset].assetValue, assetType: assets2[asset].assetType });
    };
}





// let assets = {}
// let assets = {
//     Bitcoin: {
//         assetType: 'Crypto',
//         assetName: 'Bitcoin',
//         assetAbb: 'BTC',
//         assetQuantity: 0.01288,
//         assetUnit: 'Piece',
//         assetBaseValue: 30000,
//         assetValue: 1000,
//         assetNotes: '',
//     },
//     Ethereum: {
//         assetType: 'Crypto',
//         assetName: 'Ethereum',
//         assetAbb: 'ETH',
//         assetQuantity: 0.029,
//         assetUnit: 'Piece',
//         assetBaseValue: 1000,
//         assetValue: 1000,
//         assetNotes: '',
//     },
//     Silver: {
//         assetType: 'Metals',
//         assetName: 'Silver',
//         assetAbb: '',
//         assetQuantity: 754,
//         assetUnit: 'Oz',
//         assetBaseValue: 20,
//         assetValue: 1000,
//         assetNotes: '',
//     },
//     Gold: {
//         assetType: 'Metals',
//         assetName: 'Gold',
//         assetAbb: '',
//         assetQuantity: 2.25,
//         assetUnit: 'Oz',
//         assetBaseValue: 1000,
//         assetValue: 1000,
//         assetNotes: '',
//     },
// }

// let assets2 = {
//     Bitcoin: {
//         assetType: 'Crypto',
//         assetName: 'Bitcoin',
//         assetAbb: 'BTC',
//         assetUnit: 'Piece',
//         assetBaseValue: 30000,
//     },
//     Ethereum: {
//         assetType: 'Crypto',
//         assetName: 'Ethereum',
//         assetAbb: 'ETH',
//         assetUnit: 'Piece',
//         assetBaseValue: 1000,
//     },
//     Silver: {
//         assetType: 'Metals',
//         assetName: 'Silver',
//         assetAbb: '',
//         assetUnit: 'Oz',
//         assetBaseValue: 20,
//     },
//     Gold: {
//         assetType: 'Metals',
//         assetName: 'Gold',
//         assetAbb: '',
//         assetUnit: 'Oz',
//         assetBaseValue: 1000,
//     },
// }

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

// async function saveAbbsToDB(assetCodes) {
//     await setDoc(doc(db, "assets", "assetCodes"), assetCodes);
// };

// window.assets = assets

// let assetQuantityUnits = [
//     { name: 'Stocks', unit: ' pieces' },
//     { name: 'Metals', unit: ' Oz' },
//     { name: 'Crypto', unit: ' pieces' },
// ];

const assetQuantityUnits2 = {
    'Stocks': ' pieces',
    'Metals': ' Oz',
    'Crypto': ' pieces',
};



// assetQuantityUnits = getUnitsFromDB()

// window.assetQuantityUnits = assetQuantityUnits

// const assetCodes = {
//     "ADA": "Cardano",
//     "ALU": "Aluminum",
//     "AAPL": "Apple",
//     "GOOG": "Alphabet",
//     "AMZN": "Amazon",
//     "BCH": "Bitcoin Cash",
//     "BTC": "Bitcoin",
//     "ETH": "Ethereum",
//     "IRD": "Iridium",
//     "LCO": "Cobalt",
//     "LINK": "Chainlink",
//     "LTC": "Litecoin",
//     "FB": "Meta",
//     "NI": "Nickel",
//     "RUTH": "Ruthenium",
//     "UNI": "Uniswap",
//     "XAG": "Silver",
//     "XAU": "Gold",
//     "XCU": "Copper",
//     "XLM": "Stellar",
//     "XPD": "Palladium",
//     "XPT": "Platinum",
//     "XRP": "Ripple",
//     "ZNC": "Zinc",
//     "USD": "USD per EURO",
// }




// assets2 = {
//     "Alphabet": {
//         "assetType": "Stocks",
//         "assettAbb": "GOOG",
//         "assetValue": 1500,
//     },
//     "Aluminum": {
//         "assetValue": 10,
//         "assettAbb": "ALU",
//         "assetType": "Metals"
//     },
//     "Amazon": {
//         "assetType": "Stocks",
//         "assetValue": 500,
//         "assettAbb": "AMZN"
//     },
//     "Apple": {
//         "assettAbb": "AAPL",
//         "assetType": "Stocks",
//         "assetValue": 2000
//     },
//     "Bitcoin": {
//         "assetType": "Crypto",
//         "assetValue": 40000,
//         "assettAbb": "BTC"
//     },
//     "Bitcoin Cash": {
//         "assetType": "Crypto",
//         "assetValue": 1000,
//         "assettAbb": "BCH"
//     },
//     "Cardano": {
//         "assettAbb": "ADA",
//         "assetType": "Crypto",
//         "assetValue": 0.3
//     },
//     "Chainlink": {
//         "assetType": "Crypto",
//         "assetValue": 50,
//         "assettAbb": "LINK"
//     },
//     "Cobalt": {
//         "assetValue": 50,
//         "assetType": "Metals",
//         "assettAbb": "LCO"
//     },
//     "Copper": {
//         "assetType": "Metals",
//         "assetValue": 200,
//         "assettAbb": "XCU"
//     },
//     "Ethereum": {
//         "assettAbb": "ETH",
//         "assetType": "Crypto",
//         "assetValue": 6000
//     },
//     "Gold": {
//         "assetValue": 1600,
//         "assetType": "Metals",
//         "assettAbb": "XAU"
//     },
//     "Iridium": {
//         "assetType": "Metals",
//         "assetValue": 50,
//         "assettAbb": "IRD"
//     },
//     "Litecoin": {
//         "assetType": "Crypto",
//         "assettAbb": "LTC",
//         "assetValue": 200
//     },
//     "Meta": {
//         "assetValue": 800,
//         "assettAbb": "FB",
//         "assetType": "Stocks"
//     },
//     "Nickel": {
//         "assetType": "Metals",
//         "assetValue": 200,
//         "assettAbb": "NI"
//     },
//     "Palladium": {
//         "assetType": "Metals",
//         "assettAbb": "XPD",
//         "assetValue": 3000
//     },
//     "Platinum": {
//         "assetValue": 5000,
//         "assetType": "Metals",
//         "assettAbb": "XPT"
//     },
//     "Ripple": {
//         "assettAbb": "XRP",
//         "assetValue": 0.8,
//         "assetType": "Crypto"
//     },
//     "Ruthenium": {
//         "assettAbb": "RUTH",
//         "assetType": "Metals",
//         "assetValue": 200
//     },
//     "Silver": {
//         "assetType": "Metals",
//         "assettAbb": "XAG",
//         "assetValue": 25
//     },
//     "Stellar": {
//         "assetType": "Crypto",
//         "assettAbb": "XLM",
//         "assetValue": 15
//     },
//     "USD per EURO": {
//         "assetType": "Currencies",
//         "assettAbb": "USD",
//         "assetValue": 1
//     },
//     "Uniswap": {
//         "assetType": "Crypto",
//         "assettAbb": "UNI",
//         "assetValue": 50
//     },
//     "Zinc": {
//         "assetType": "Metals",
//         "assettAbb": "ZNC",
//         "assetValue": 500
//     }
// }



// async function renameInDB() {

//     // const assetsNew = {};
//     // console.log('getting assets2 from db');

//     // const querySnapshot = await getDocs(collection(db, "assets2"));
//     // assets2.forEach((asset) =>
//     for (let asset in assets2) {
//         // asset.data() is never undefined for query doc snapshots
//         // console.log(asset.id, " => ", asset.data());
//         // assetsNew[asset.id] = {};
//         // assetsNew[asset.id].assetAbb = asset.data().assettAbb;
//         // assetsNew[asset.id].assetValue = asset.data().assetValue;
//         // assetsNew[asset.id].assetType = asset.data().assetType;
//         console.log(assets2[asset].assettAbb);
//         setDoc(doc(db, "assets2", asset), { assetAbb: assets2[asset].assettAbb, assetValue: assets2[asset].assetValue, assetType: assets2[asset].assetType });
//     };
//     console.log(assetsNew);

//     //     };
//     // return assets2;


//     // console.log(assets2)
//     // for (let key in assetCodes) {
//     //     console.log(key);
//     //     console.log(assetCodes[key]);
//     //     console.log(assetValues[key]);
//     //     assets2[assetCodes[key]] = { assettAbb: key, assetValue: assetValues[key] };

//     //     async function popAssets2toDB() {
//     //         await setDoc(doc(db, "assets2", assetCodes[key]), { assettAbb: key, assetValue: assetValues[key] });
//     //     };
//     //     popAssets2toDB();
//     // }
//     // console.log(assets2);
// }

// let assetValues = {
//     "ADA": 0.3,
//     "ALU": 10,
//     "AAPL": 2000,
//     "GOOG": 1500,
//     "AMZN": 500,
//     "BCH": 1000,
//     "BTC": 40000,
//     "ETH": 6000,
//     "IRD": 50,
//     "LCO": 50,
//     "LINK": 50,
//     "LTC": 200,
//     "FB": 800,
//     "NI": 200,
//     "RUTH": 200,
//     "UNI": 50,
//     "XAG": 25,
//     "XAU": 1600,
//     "XCU": 200,
//     "XLM": 15,
//     "XPD": 3000,
//     "XPT": 5000,
//     "XRP": 0.8,
//     "ZNC": 500,
//     "USD": 1,
// }
// window.assetValues = assetValues

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

//SETUP
window.addEventListener('load', async function () {
    //Load userAssets from localstorage if available
    // userAssets = getUserAssetsFromLocalStorage();

    //Get assets2 from db
    assets2 = await getAssetsFromDB();
    // console.log(assets2);

    userAssets = calculateAssetValue(assets2, userAssets);
    totalValue = calcTotalValue(userAssets);
    displayAssets(userAssets, assets2);
    updateLocalStorage(userAssets);
    // saveAbbsToDB(assetCodes);
    // saveUnitsToDB(assetQuantityUnits2);
    // getUnitsFromDB()
    // console.log(assetQuantityUnits);

    // renameInDB();
})

// async function getDataFromJson() {
//     console.log('Start getDataFromJson')
//     const rawResponse = await fetch('./data.json')
//     const content = await rawResponse.json();
//     console.dir(content);
//     console.log('assets fetched from json');
// }

// function updateAssetAbbs() {
//     // Update assetAbb-Property in assets from assetCodes
//     for (let singleAsset in assets) {
//         const thisAssetAbb = Object.keys(assetCodes).find(key => assetCodes[key] === assets[singleAsset].assetName);
//         assets[singleAsset].assetAbb = thisAssetAbb;
//     }
//     updateLocalStorage(assets);
// }

// function calculateAssetBaseValue(assets, userAssets) {
//     //Update assetBaseValue
//     // console.log(assets, assetValues);
//     console.log('Start calcAssetBaseValue');
//     let assetsTemp = assets;
//     for (let singleAsset in assetsTemp) {
//         const thisAssetAbb = assetsTemp[singleAsset].assetAbb;
//         const thisAssetBaseValue = assetValues[thisAssetAbb];
//         assetsTemp[singleAsset].assetBaseValue = thisAssetBaseValue;
//     }
//     console.log('End calcAssetBaseValue', assetsTemp);
//     return assetsTemp;
// };

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