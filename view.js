let DELETED_ASSET = {}

let totalValue

//display assetForm
function displayAssetForm(thisAssetType = '', thisAssetName = '', thisAssetQuantity = '', thisAssetNotes = '', isdirty = false) {
    console.log(isdirty);
    document.querySelector('#assetForm').innerHTML = `
    <form onsubmit="addAsset(this); return false;">
        <datalist id="assetTypeList">
            <option value="Crypto">
            <option value="Stocks">
            <option value="Metals">
        </datalist>
        <datalist id="Metals">
            <option value="Aluminum">
            <option value="Cobalt">
            <option value="Copper">
            <option value="Gold">
            <option value="Nickel">
            <option value="Palladium">
            <option value="Platinum">
            <option value="Ruthenium">
            <option value="Silver">  
            <option value="Zinc">
        </datalist>
        <datalist id="Stocks">
            <option value="Apple">
            <option value="Meta">
            <option value="Alphabet">
            <option value="Amazon">
        </datalist>
        <datalist id="Crypto">
            <option value="Bitcoin">
            <option value="Bitcoin Cash">
            <option value="Cardano">
            <option value="ChainLink">
            <option value="Ethereum">
            <option value="Dogecoin">
            <option value="Litecoin">
            <option value="Ripple">
            <option value="Solana">
            <option value="Stellar">
            <option value="Uniswap">
        </datalist>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? 'is-dirty' : ''}">
            <input class="mdl-textfield__input" type="text" list="assetTypeList" id="assetTypeField" autocomplete="off" value="${thisAssetType}">
            <label class="mdl-textfield__label" for="assetTypeField">Type</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? 'is-dirty' : ''}">
            <input class="mdl-textfield__input" type="text" id="assetNameField" value="${thisAssetName}" autocomplete="off" onclick="setAssetType()"">
            <label class="mdl-textfield__label" for="assetNameField">Asset</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? 'is-dirty' : ''}">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?"
                id="assetQuantityField" autocomplete="off" value="${thisAssetQuantity}">
            <label class="mdl-textfield__label" for="assetQuantityField"
                id="assetQuantityLabel">Quantity</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
            <span id="assetUnitField"></span>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? 'is-dirty' : ''}">
            <input class="mdl-textfield__input" type="text" id="assetNotesField" autocomplete="off" value="${thisAssetNotes}">
            <label class="mdl-textfield__label" for="assetNotesField">Notes</label>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" type="submit">
            Save
        </button>
    </form>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onclick="hideAssetForm()">
        Cancel
    </button>
    `
}

//hide assetForm and clear input fields and error message
function hideAssetForm() {
    document.querySelector('#assetForm').innerHTML = ''; //hide assetForm
    // assetTypeField.value = '';
    // assetNameField.value = '';
    // assetQuantityField.value = '';
    // assetNotesField.value = '';
}

//Prepare assetNameField dropdown and assetUnit in Form according to assetTypeField
function setAssetType() {
    if (document.getElementById("assetTypeField").value === "") {
        displayToast('Chose asset type first!')
        return
    }
    const assetType = document.getElementById("assetTypeField").value
    switch (assetType) {
        case 'Stocks':
            document.querySelector('#assetNameField').setAttribute("list", "Stocks")
            document.querySelector('#assetQuantityLabel').innerHTML = 'Quantity (Pieces)'
            break;
        case 'Metals':
            document.querySelector('#assetNameField').setAttribute("list", "Metals")
            document.querySelector('#assetQuantityLabel').innerHTML = 'Quantity (Oz)'
            break;
        case 'Crypto':
            document.querySelector('#assetNameField').setAttribute("list", "Crypto")
            document.querySelector('#assetQuantityLabel').innerHTML = 'Quantity (Pieces)'
            break;
    }
}

//Push form input to ASSETS
function addAsset(form) {
    //Make sure form is filled completely
    if (form.assetTypeField.value === "") {
        displayToast('Enter asset type!')
        return
    }
    if (form.assetNameField.value === "") {
        displayToast('Enter asset name!')
        return
    }
    if (form.assetTypeField.value === "") {
        displayToast('Chose asset type!')
        return
    }
    if (form.assetQuantityField.value === "") {
        displayToast('Enter asset quantity!')
        return
    }

    //find assetUnit for assetType
    const thisAssetQuantityUnit = assetQuantityUnits.find(assetUnit => assetUnit.name === form.assetTypeField.value).unit;

    //Push asset to ASSETS
    ASSETS[form.assetNameField.value] = { assetType: form.assetTypeField.value, assetName: form.assetNameField.value, assetAbb: "", assetQuantity: form.assetQuantityField.value, assetUnit: thisAssetQuantityUnit, assetValue: "", assetNotes: form.assetNotesField.value }
    displayToast('Asset saved successfully!')
    updateAssetAbbs()
    updateAssetValues()
    totalValue = calcTotalValue(ASSETS);
    updateLocalStorage(ASSETS);
    hideAssetForm()
    displayAssets(ASSETS);
}

function deleteAsset(singleAsset, singleAssetName) {
    if (confirm('Sure, you want to delete Asset "' + singleAssetName + '"?') === false)     // alert('löschen...');
        return
    DELETED_ASSET = ASSETS[singleAsset];
    delete ASSETS[singleAsset]

    updateLocalStorage();
    ASSETS = calculateAssetValue(ASSETS);
    displayAssets(ASSETS);
    // displayToast('Asset "' + singleAssetName + '" deleted.');
    displaySnackbar(('Asset "' + singleAssetName + '" deleted.'), 'undo', undoDeleteAsset);
}

function undoDeleteAsset() {
    ASSETS[DELETED_ASSET.value] = DELETED_ASSET
    // ASSETS.push(deletedAsset);
    updateLocalStorage();
    ASSETS = calculateAssetValue(ASSETS);
    displayAssets(ASSETS);
    displayToast('Asset "' + DELETED_ASSET.assetName + '" restored successfully.')
}

function editAsset(singleAsset) {
    displayAssetForm(ASSETS[singleAsset].assetType, ASSETS[singleAsset].assetName, ASSETS[singleAsset].assetQuantity, ASSETS[singleAsset].assetNotes, true);

    // updateLocalStorage();
    // calcTotalValue();
    // hideAssetForm()
    // displayAssets();
}

//Display Toast for wrong form inputs and other information
function displayToast(error) {
    var notification = document.querySelector('.mdl-js-snackbar');
    notification.MaterialSnackbar.showSnackbar(
        {
            message: error
        }
    );
}

//Display Snackbar for wrong form inputs and other information
function displaySnackbar(error, buttonText, buttonFunction) {
    var notification = document.querySelector('.mdl-js-snackbar');
    var data = {
        message: error,
        actionHandler: function (event) { buttonFunction() },
        actionText: buttonText,
        timeout: 10000
    };
    notification.MaterialSnackbar.showSnackbar(data);
}

//Display Assets from ASSETS
function displayAssets(ASSETS) {
    console.log('Start displayAssets', ASSETS);
    document.querySelector('#asset-list').innerHTML = '';
    for (let singleAsset in ASSETS) {
        // console.log(singleAsset, ASSETS[singleAsset])
        // console.log(ASSETS[singleAsset].assetType)

        document.querySelector('#asset-list').innerHTML += `
        <div class="demo-card-square mdl-card mdl-shadow--2dp ${ASSETS[singleAsset].assetType}">
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">${ASSETS[singleAsset].assetName} (${ASSETS[singleAsset].assetAbb})</h2>
            </div>
            <div class="mdl-card__supporting-text">
                ${ASSETS[singleAsset].assetQuantity} ${ASSETS[singleAsset].assetUnit}<br>
                Value: ${ASSETS[singleAsset].assetValue.toLocaleString("de-DE")}€<br>
                Notes: ${ASSETS[singleAsset].assetNotes}
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="editAsset('${singleAsset}', '${ASSETS[singleAsset].assetName}')">
                    edit
                </a>
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="deleteAsset('${singleAsset}', '${ASSETS[singleAsset].assetName}')">
                    delete
                </a>
            </div>
        </div>
        `;
    }
}