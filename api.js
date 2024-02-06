// const valuesAPI2url = 'https://yfapi.net/v6/finance/quote';
// const valuesAPI2key = '?access_key=Z1EVIMF28V618X3D';
// const valuesAPI2base = '&base=EUR';
// let valuesAPI2symbols = '&symbols='; //Add assetAbbs seperated with commas
// let valuesAPI2link;

// MXrzxkKCX04jatCdZBkaO6yYOJji3m4r2ZhUKd5e

//construct Api1 Request URL
export function constructApi1URL(assets2) {
    console.log("constructApi1URL");
    console.log(assets2);
    const valuesAPIurl = 'https://commodities-api.com/api/latest';
    const valuesAPIkey = '?access_key=6oemg05g8508q5s2rrzn2aqjv4ig7ac7t4oz04u0bukj500tq02t6jmwhits';
    const valuesAPIbase = '&base=EUR';
    let valuesAPIsymbols = '&symbols='; //Add assetAbbs seperated with commas

    for (let singleAsset in assets2) {
        if (assets2[singleAsset].assetAbb = undefined) { return }
        valuesAPIsymbols += assets2[singleAsset].assetAbb;
        valuesAPIsymbols += ',';
    }
    valuesAPIsymbols = valuesAPIsymbols.slice(0, -1);
    const valuesAPIlink = valuesAPIurl + valuesAPIkey + valuesAPIbase + valuesAPIsymbols
    console.log(valuesAPIlink);
    return valuesAPIlink
};

export async function updateAssetValues(assets2) {
    try {
        assets2 = await getValuesFromAPI1(assets2);
    } catch (e) {
        console.error(e);
        displayToast('Asset values could not be updated!')
    };
    try {
        assets2 = await getValuesFromAPI2(assets2);
    } catch (e) {
        console.error(e);
        displayToast('Asset values could not be updated!')
    };
    console.log('After Api1+2', assets2);

    assets2 = calculateAssetValue(assets2);
    console.log('After calculateAssetValue', assets2);
    userTotalValue = calcuserTotalValue(assets2);

    //update DB with assetValues
    await setDoc(doc(db, "assets", "assetValues"), assetValues);
    saveAssetsToDB(assets2)
    updateLocalStorage(userAssets);
    displayAssets(userAssets, assets2);
    displayToast('Asset values updated.');
}

export async function getValuesFromAPI1(assets2) {
    const valuesAPIlink = constructApi1URL(assets2);

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
    assets2.USD.assetValue = assetValuesFromApi.USD;
    // console.log(assetValues.USD);
    console.log('Before loop in Api1', assets2);
    for (let asset in assets2) {
        assets2[asset].assetValue = (1 / assetValuesFromApi[asset]).toFixed(2);
        // console.log(asset, [asset]);
    }
    console.log('End Api1', assets2);
    return assets2;
}

export async function getValuesFromAPI2(assets2) {
    console.log('Start Api2', assets2);
    for (let index in assets2) {
        if (assets2[index].assetValue === 'NaN')
            // get assetValues from API2
            try {
                let response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + assets2[index].assetAbb + '&apikey=Z1EVIMF28V618X3D');
                let assetValueFromApi2 = await response.json();
                assetValueFromApi2 = await assetValueFromApi2["Global Quote"]["05. price"];
                // console.log(assetValueFromApi2 / assetValues.USD);
                assets2[index].assetValue = (assetValueFromApi2 / assets2.USD.assetValue)
                console.log(assets2[index]);

            } catch (e) {
                console.error(e);
                displayToast('Asset values could not be updated!')
            };
    }
    return assets2;
}