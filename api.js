// const valuesAPI2url = 'https://yfapi.net/v6/finance/quote';
// const valuesAPI2key = '?access_key=Z1EVIMF28V618X3D';
// const valuesAPI2base = '&base=EUR';
// let valuesAPI2symbols = '&symbols='; //Add assetAbbs seperated with commas
// let valuesAPI2link;

// MXrzxkKCX04jatCdZBkaO6yYOJji3m4r2ZhUKd5e

//construct Api1 Request URL
export function constructApi1URL(assetValues) {

    const valuesAPIurl = 'https://commodities-api.com/api/latest';
    const valuesAPIkey = '?access_key=6oemg05g8508q5s2rrzn2aqjv4ig7ac7t4oz04u0bukj500tq02t6jmwhits';
    const valuesAPIbase = '&base=EUR';
    let valuesAPIsymbols = '&symbols='; //Add assetAbbs seperated with commas

    for (let singleAsset in assetValues) {
        valuesAPIsymbols += singleAsset;
        valuesAPIsymbols += ',';
    }
    valuesAPIsymbols = valuesAPIsymbols.slice(0, -1);
    const valuesAPIlink = valuesAPIurl + valuesAPIkey + valuesAPIbase + valuesAPIsymbols
    return valuesAPIlink
};

export async function updateAssetValues(assetValues) {
    try {
        assetValues = await getValuesFromAPI1(assetValues);
    } catch (e) {
        console.error(e);
        displayToast('Asset values could not be updated!')
    };
    try {
        assetValues = await getValuesFromAPI2(assetValues);
    } catch (e) {
        console.error(e);
        displayToast('Asset values could not be updated!')
    };
    console.log('After Api1+2', assetValues);
    assets = calculateAssetBaseValue(assets, assetValues)
    console.log('After calculateAssetBaseValue', assets);
    assets = calculateAssetValue(assets);
    console.log('After calculateAssetValue', assets);
    userTotalValue = calcuserTotalValue(assets);

    //update DB with assetValues
    await setDoc(doc(db, "assets", "assetValues"), assetValues);
    saveAssetsToDB(assets2)
    updateLocalStorage(userAssets);
    displayAssets(userAssets, assets2);
    displayToast('Asset values updated.');
}

export async function getValuesFromAPI1(assetValues) {
    const valuesAPIlink = constructApi1URL(assetValues);

    let assetValuesFromApi = {
        "ADA": 1.193330973679504,
        "ALU": 10.514131371630041,
        "BCH": 0.0033696857249744575,
        "BTC": 0.000027339894361282296,
        "ETH": 0.00036791100378043246,
        "IRD": 0.0002160703832587034,
        "LCO": 0.02921272565975125,
        "LINK": 0.08032822952760443,
        "LTC": 0.010056770315122874,
        "NI": 0.00003252599096522526,
        "RUTH": 0.0014403972198641973,
        "UNI": 0.11888624033728191,
        "XAG": 0.041357832033735754,
        "XAU": 0.0005424889761551438,
        "XCU": 3.573590625642131,
        "XLM": 5.520685882314111,
        "XPD": 0.0004573520381290784,
        "XPT": 0.001059369727054926,
        "XRP": 1.4430462888642641,
        "ZNC": 0.0002414652785689414,
        "USD": 1,
    };

    // get assetValues from API1
    try {
        let response = await fetch(valuesAPIlink);
        assetValuesFromApi = await response.json();
        assetValuesFromApi = assetValuesFromApi.data.rates;
    } catch (e) {
        console.error(e);
        displayToast('Asset values could not be updated!')
    };
    assetValues.USD = assetValuesFromApi.USD;
    // console.log(assetValues.USD);
    console.log('Before loop in Api1', assetValues);
    for (let index in assetValues) {
        assetValues[index] = (1 / assetValuesFromApi[index]).toFixed(2);
        // console.log(index, [index]);
    }
    console.log('End Api1', assetValues);
    return assetValues;
}

export async function getValuesFromAPI2(assetValues) {
    console.log('Start Api2', assetValues);
    for (let index in assetValues) {
        if (assetValues[index] === 'NaN')
            // get assetValues from API2
            try {
                let response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + index + '&apikey=Z1EVIMF28V618X3D');
                let assetValueFromApi2 = await response.json();
                assetValueFromApi2 = await assetValueFromApi2["Global Quote"]["05. price"];
                // console.log(assetValueFromApi2 / assetValues.USD);
                assetValues[index] = (assetValueFromApi2 / assetValues.USD)
                console.log(assetValues[index]);

            } catch (e) {
                console.error(e);
                displayToast('Asset values could not be updated!')
            };
    }
    return assetValues;
}