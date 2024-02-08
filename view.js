import { userAssets, assetUnits, updateView } from "./main.js";
import { displayAssetForm, hideAssetForm, handleFormSubmit } from "./Form.js";

//Push form input to assets
// export function addAsset(form) {
//   //Make sure form is filled completely
//   if (form.assetTypeField.value === "") {
//     displayToast("Enter asset type!");
//     return;
//   }
//   if (form.assetNameField.value === "") {
//     displayToast("Enter asset name!");
//     return;
//   }
//   if (form.assetTypeField.value === "") {
//     displayToast("Chose asset type!");
//     return;
//   }
//   if (form.assetQuantityField.value === "") {
//     displayToast("Enter asset quantity!");
//     return;
//   }

//find assetUnit for assetType
// const thisAssetQuantityUnit = assetQuantityUnits.find(assetUnit => assetUnit.name === form.assetTypeField.value).unit;

//Push asset to userAssets
//   userAssets[form.assetNameField.value] = {
//     assetQuantity: form.assetQuantityField.value,
//     assetNotes: form.assetNotesField.value,
//   };
//   displayToast("Asset saved successfully!");
//   calculateAssetValue(assets2, userAssets);
//   userTotalValue = calcuserTotalValue(userAssets);
//   updateLocalStorage(userAssets);
//   hideAssetForm();
//   displayAssets(userAssets, assets2, assetUnits);
// }

export function deleteAsset(id) {
  const asset = userAssets[id];
  if (confirm('Sure, you want to delete Asset "' + asset.name + '"?') === false) return;
  const assetIndex = userAssets.findIndex((asset) => asset.id === id);
  if (assetIndex !== -1) {
    userAssets[assetIndex].isDeleted = true;
  }

  updateView();
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
  updateView();
  displayToast('Asset "' + userAssets[assetIndex].name + '" restored successfully.');
}

// export function editAsset(id) {
//   const { name, type, quantity, notes } = userAssets.find((asset) => asset.id === id);
//   hideAssetForm();
//   displayAssetForm(id);

//   // updateLocalStorage();
//   // calcuserTotalValue();
//   // hideAssetForm()
//   // displayAssets();
// }

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
    timeout: 4000,
  };
  notification.MaterialSnackbar.showSnackbar(data);
}

export function displayAssets() {
  const assetListElement = document.querySelector("#asset-list");
  assetListElement.innerHTML = ""; // Leeren des Containers zu Beginn

  userAssets
    .filter((asset) => !asset.isDeleted)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((asset) => {
      const card = document.createElement("div");
      card.className = `demo-card-square mdl-card mdl-shadow--2dp ${asset.type}`;
      card.setAttribute("id", asset.id);
      card.setAttribute("assetname", asset.name);

      card.innerHTML = `
          <div class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">${asset.name} (${asset.abb})</h2>
          </div>
          <div class="mdl-card__supporting-text">
            ${asset.quantity} ${assetUnits[asset.type]}<br>
            Value: ${asset.value?.toLocaleString("de-DE")}€ (${asset.baseValue?.toLocaleString("de-DE")}€/${assetUnits[asset.type]})<br>
            Notes: ${asset.notes}
          </div>`;

      const actions = document.createElement("div");
      actions.className = "mdl-card__actions mdl-card--border";

      const editButton = document.createElement("button");
      editButton.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
      editButton.id = `${asset.id}-edit-button`;
      editButton.textContent = "edit";
      editButton.addEventListener("click", () => displayAssetForm(asset.id));
      editButton.addEventListener("touchend", () => displayAssetForm(asset.id));

      const deleteButton = document.createElement("button");
      deleteButton.className = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
      deleteButton.id = `${asset.id}-delete-button`;
      deleteButton.textContent = "delete";
      deleteButton.addEventListener("click", () => deleteAsset(asset.id));
      deleteButton.addEventListener("touchstart", () => deleteAsset(asset.id));

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      card.appendChild(actions);

      assetListElement.appendChild(card);
    });
}
