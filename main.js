// let ASSETS = {}
let ASSETS = {
    Bitcoin: {
        assetType: 'Crypto',
        assetName: 'Bitcoin',
        assetAbb: 'BTC',
        assetQuantity: 0.01288,
        assetUnit: 'Piece',
        assetBaseValue: 30000,
        assetValue: 1000,
        assetNotes: '',
    },
    Ethereum: {
        assetType: 'Crypto',
        assetName: 'Ethereum',
        assetAbb: 'ETH',
        assetQuantity: 0.029,
        assetUnit: 'Piece',
        assetBaseValue: 1000,
        assetValue: 1000,
        assetNotes: '',
    },
    Silver: {
        assetType: 'Metals',
        assetName: 'Silver',
        assetAbb: '',
        assetQuantity: 754,
        assetUnit: 'Oz',
        assetBaseValue: 20,
        assetValue: 1000,
        assetNotes: '',
    },
    Gold: {
        assetType: 'Metals',
        assetName: 'Gold',
        assetAbb: '',
        assetQuantity: 2.25,
        assetUnit: 'Oz',
        assetBaseValue: 1000,
        assetValue: 1000,
        assetNotes: '',
    },
}

const assetQuantityUnits = [
    { name: 'Stocks', unit: ' pieces' },
    { name: 'Metals', unit: ' Oz' },
    { name: 'Crypto', unit: ' pieces' },
];

const assetCodes = {
    "ADA": "Cardano",
    "ALU": "Aluminum",
    "AAPL": "Apple",
    "GOOG": "Alphabet",
    "AMZN": "Amazon",
    "BCH": "Bitcoin Cash",
    "BTC": "Bitcoin",
    "ETH": "Ethereum",
    "IRD": "Iridium",
    "LCO": "Cobalt",
    "LINK": "Chainlink",
    "LTC": "Litecoin",
    "FB": "Meta",
    "NI": "Nickel",
    "RUTH": "Ruthenium",
    "UNI": "Uniswap",
    "XAG": "Silver",
    "XAU": "Gold",
    "XCU": "Copper",
    "XLM": "Stellar",
    "XPD": "Palladium",
    "XPT": "Platinum",
    "XRP": "Ripple",
    "ZNC": "Zinc",
    "USD": "USD per EURO",
}

let assetValues = {
    "ADA": 0.3,
    "ALU": 10,
    "AAPL": 2000,
    "GOOG": 1500,
    "AMZN": 500,
    "BCH": 1000,
    "BTC": 40000,
    "ETH": 6000,
    "IRD": 50,
    "LCO": 50,
    "LINK": 50,
    "LTC": 200,
    "FB": 800,
    "NI": 200,
    "RUTH": 200,
    "UNI": 50,
    "XAG": 25,
    "XAU": 1600,
    "XCU": 200,
    "XLM": 15,
    "XPD": 3000,
    "XPT": 5000,
    "XRP": 0.8,
    "ZNC": 500,
    "USD": 1,
}

function updateLocalStorage(ASSETS) {
    //update ASSETS in localstorage
    localStorage.setItem("ASSETS", JSON.stringify(ASSETS));
}

//SETUP
window.addEventListener('load', function () {
    //Load ASSET from localstorage if available
    if (localStorage.getItem("ASSETS") !== null && localStorage.getItem("ASSETS") !== 'undefined') {
        ASSETS = JSON.parse(localStorage.getItem("ASSETS"));
    }

    updateAssetAbbs();
    updateLocalStorage(ASSETS);
    totalValue = calcTotalValue(ASSETS);
    displayAssets(ASSETS);
    console.log('assets updated');
})

function updateAssetAbbs() {
    // Update assetAbb-Property in ASSETS from assetCodes
    for (let singleAsset in ASSETS) {
        const thisAssetAbb = Object.keys(assetCodes).find(key => assetCodes[key] === ASSETS[singleAsset].assetName);
        ASSETS[singleAsset].assetAbb = thisAssetAbb;
    }
    updateLocalStorage(ASSETS);
}

function calculateAssetBaseValue(ASSETS, assetValues) {
    //Update assetBaseValue
    // console.log(ASSETS, assetValues);
    console.log('Start calcAssetBaseValue', assetValues);
    let assetsTemp = ASSETS;
    for (let singleAsset in assetsTemp) {
        const thisAssetAbb = assetsTemp[singleAsset].assetAbb;
        const thisAssetBaseValue = assetValues[thisAssetAbb];
        assetsTemp[singleAsset].assetBaseValue = thisAssetBaseValue;
    }
    console.log('End calcAssetBaseValue', assetsTemp);
    return assetsTemp;
};

function calculateAssetValue(ASSETS) {
    console.log('Start calcAssetValue', ASSETS);
    //calculate assetValue (assetBaseValue * assetQuantity)
    for (let singleAsset in ASSETS) {
        ASSETS[singleAsset].assetValue = ASSETS[singleAsset].assetBaseValue * ASSETS[singleAsset].assetQuantity;
    }
    console.log('End calcAssetValue', ASSETS);
    return ASSETS;
};

function calcTotalValue(ASSETS) {
    console.log('Start calcTotalValue', totalValue, ASSETS);
    //Calculate and display totalValue of Assets
    totalValue = 0
    for (let singleAsset in ASSETS) {
        // console.log('assetValue', ASSETS[singleAsset].assetValue);
        totalValue = totalValue + ASSETS[singleAsset].assetValue
        // console.log('TotalValue', totalValue);
    }
    document.querySelector('#total-value').innerHTML = `Total Worth: ${totalValue.toLocaleString("de-DE")} €`;
    console.log('End calcTotalValue', totalValue);
    return totalValue;
}