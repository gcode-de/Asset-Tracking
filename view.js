import { userAssets, assetUnits, updateLocalStorage } from "./main.js";

export let DELETED_ASSET = {};

export function displayAssetFormEmpty() {
  hideAssetForm();
  displayAssetForm();
}

//display assetForm
export function displayAssetForm(thisAssetType = "", thisAssetName = "", thisAssetQuantity = "", thisAssetNotes = "", isdirty = false) {
  document.querySelector("#assetForm-hidden").innerHTML = `
    <h2>Add/Edit asset</h2>
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

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? "is-dirty" : ""}">
            <input class="mdl-textfield__input" type="text" list="assetTypeList" id="assetTypeField" autocomplete="off" value="${thisAssetType}">
            <label class="mdl-textfield__label" for="assetTypeField">Type</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? "is-dirty" : ""}">
            <input class="mdl-textfield__input" type="text" id="assetNameField" value="${thisAssetName}" autocomplete="off" onclick="setAssetType()"">
            <label class="mdl-textfield__label" for="assetNameField">Asset</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? "is-dirty" : ""}">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?"
                id="assetQuantityField" autocomplete="off" value="${thisAssetQuantity}">
            <label class="mdl-textfield__label" for="assetQuantityField"
                id="assetQuantityLabel">Quantity</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
            <span id="assetUnitField"></span>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${isdirty ? "is-dirty" : ""}">
            <input class="mdl-textfield__input" type="text" id="assetNotesField" autocomplete="off" value="${thisAssetNotes}">
            <label class="mdl-textfield__label" for="assetNotesField">Notes</label>
        </div>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" type="submit" id="saveButton">
            Save
        </button>
    </form>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="cancelButton">
        Cancel
    </button>
    `;
  document.querySelector("#assetForm-hidden").setAttribute("id", "assetForm"); //hide assetForm
  setIsdirty();
  document.querySelector("#cancelButton").addEventListener("click", hideAssetForm);
}

//hide assetForm and clear input fields and error message
export function hideAssetForm() {
  // document.querySelector('#assetForm').innerHTML = ''; //hide assetForm
  if (document.querySelector("#assetForm") === null) {
    return;
  }
  document.querySelector("#assetForm").setAttribute("id", "assetForm-hidden"); //hide assetForm
  assetTypeField.value = "";
  assetNameField.value = "";
  assetQuantityField.value = "";
  assetNotesField.value = "";
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

export function setIsdirty() {
  //mark filled input fields as isdirty
  document.getElementById("assetTypeField").addEventListener("input", function () {
    console.log("focusout");
    this.parentNode.classList.add("is-dirty");
  });
  document.getElementById("assetNameField").addEventListener("input", function () {
    console.log("focusout");
    this.parentNode.classList.add("is-dirty");
  });
  document.getElementById("assetQuantityField").addEventListener("input", function () {
    console.log("focusout");
    this.parentNode.classList.add("is-dirty");
  });
  document.getElementById("assetNotesField").addEventListener("input", function () {
    console.log("focusout");
    this.parentNode.classList.add("is-dirty");
  });
}

//Push form input to assets
export function addAsset(form) {
  //Make sure form is filled completely
  if (form.assetTypeField.value === "") {
    displayToast("Enter asset type!");
    return;
  }
  if (form.assetNameField.value === "") {
    displayToast("Enter asset name!");
    return;
  }
  if (form.assetTypeField.value === "") {
    displayToast("Chose asset type!");
    return;
  }
  if (form.assetQuantityField.value === "") {
    displayToast("Enter asset quantity!");
    return;
  }

  //find assetUnit for assetType
  // const thisAssetQuantityUnit = assetQuantityUnits.find(assetUnit => assetUnit.name === form.assetTypeField.value).unit;

  //Push asset to userAssets
  userAssets[form.assetNameField.value] = {
    assetQuantity: form.assetQuantityField.value,
    assetNotes: form.assetNotesField.value,
  };
  displayToast("Asset saved successfully!");
  calculateAssetValue(assets2, userAssets);
  userTotalValue = calcuserTotalValue(userAssets);
  updateLocalStorage(userAssets);
  hideAssetForm();
  displayAssets(userAssets, assets2, assetUnits);
}

export function deleteAsset(id) {
  const asset = userAssets[id];
  if (confirm('Sure, you want to delete Asset "' + asset.name + '"?') === false) return;
  const assetIndex = userAssets.findIndex((asset) => asset.id === id);
  if (assetIndex !== -1) {
    userAssets[assetIndex].isDeleted = true;
  }

  updateLocalStorage();
  displayAssets();
  displaySnackbar('Asset "' + asset.name + '" deleted.', "undo", () => {
    undoDeleteAsset(id);
  });
}

export function undoDeleteAsset(id) {
  const assetIndex = userAssets.findIndex((asset) => asset.id === id);
  if (assetIndex !== -1) {
    userAssets[assetIndex].isDeleted = false;
  }
  // assets.push(deletedAsset);
  updateLocalStorage();
  //   userAssets = calculateAssetValue(userAssets);
  displayAssets();
  displayToast('Asset "' + DELETED_ASSET.name + '" restored successfully.');
}

export function editAsset(id) {
  const { name, type, quantity, notes } = userAssets.find((asset) => asset.id === id);
  hideAssetForm();
  displayAssetForm(type, name, quantity, notes, true);

  // updateLocalStorage();
  // calcuserTotalValue();
  // hideAssetForm()
  // displayAssets();
}

//Display Toast for wrong form inputs and other information
export function displayToast(error) {
  var notification = document.querySelector(".mdl-js-snackbar");
  notification.MaterialSnackbar.showSnackbar({
    message: error,
  });
}

//Display Snackbar for wrong form inputs and other information
export function displaySnackbar(error, buttonText, buttonFunction) {
  var notification = document.querySelector(".mdl-js-snackbar");
  var data = {
    message: error,
    actionHandler: function (event) {
      buttonFunction();
    },
    actionText: buttonText,
    timeout: 5000,
  };
  notification.MaterialSnackbar.showSnackbar(data);
}

export function displayAssets() {
  document.querySelector("#asset-list").innerHTML = "";
  //To do: vorm Anzeigen sortieren?
  userAssets
    .filter((asset) => !asset.isDeleted)
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .forEach(({ id, name, quantity, notes, type, abb, value, baseValue }) => {
      document.querySelector("#asset-list").innerHTML += `
        <div class="demo-card-square mdl-card mdl-shadow--2dp ${type}" id="${id}" assetname="${name}">
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">${name} (${abb})</h2>
            </div>
            <div class="mdl-card__supporting-text">
                ${quantity} ${assetUnits[type]}<br>
                Value: ${value?.toLocaleString("de-DE")}€ (${baseValue?.toLocaleString("de-DE")}€/${assetUnits[type]})<br>
                Notes: ${notes}
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#assetForm"  id="${id}-edit-button">
                    edit
                </a>
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="${id}-delete-button">
                    delete
                </a>
            </div>
        </div>
        `;
    });

  userAssets
    .filter((asset) => !asset.isDeleted)
    .forEach((asset) => {
      // console.log(assets[singleAsset]);
      // const delBtn = document.getElementById(assets[singleAsset].assetAbb + '-delete-button').id
      // console.log(delBtn);
      document.getElementById(asset.id + "-delete-button").addEventListener("click", (event) => {
        deleteAsset(asset.id);
      });
      document.getElementById(asset.id + "-edit-button").addEventListener("click", (event) => {
        editAsset(asset.id);
      });
    });
}
