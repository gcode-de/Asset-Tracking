import "./App.css";
import Asset from "./components/Asset";
import AssetControls from "./components/AssetControls";
import Filters from "./components/Filters";
import Form from "./components/Form";
import SnackBar from "./components/SnackBar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import TotalValue from "./components/TotalValue";

export default function App() {
  const [userAssets, setUserAssets] = useLocalStorageState("userAssets", {
    defaultValue: [
      { id: 0, name: "Bitcoin", quantity: 0.01288, notes: "", type: "crypto", abb: "btc", value: 10_000, baseValue: 40_000, isDeleted: false },
      { id: 1, name: "Ethereum", quantity: 0.029, notes: "", type: "crypto", abb: "eth", value: 10_000, baseValue: 4_000, isDeleted: false },
      { id: 2, name: "Silver", quantity: 754, notes: "", type: "metals", abb: "silver", value: 10_000, baseValue: 20.7, isDeleted: false },
      {
        id: 3,
        name: "Gold",
        quantity: 3.5,
        notes: "recently bought",
        type: "metals",
        abb: "gold",
        value: 10_000,
        baseValue: 1_900,
        isDeleted: false,
      },
      { id: 4, name: "Euro", quantity: 200, notes: "under the Pillow", type: "cash", abb: "eur", value: 200, baseValue: 1, isDeleted: false },
      { id: 5, name: "Beach house", quantity: 1, notes: "I wish", type: "real_estate", abb: "RE", value: 1, baseValue: 1, isDeleted: false },
    ],
  });
  const visibleUserAssets = userAssets.filter((asset) => !asset.isDeleted);

  const assetUnits = {
    stocks: "Piece/s",
    metals: "Oz",
    crypto: "Piece/s",
    real_estate: "Piece/s",
    cash: "Piece/s",
  };

  const [formIsVisible, setFormIsVisible] = useState(false);
  const [currentAssetId, setCurrentAssetId] = useState(null);
  const currentAsset = userAssets.find((asset) => asset.id === currentAssetId);

  useEffect(() => {
    console.log(userAssets);
  }, [userAssets]);

  async function fetchValuesFromApi() {
    // const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=Z1EVIMF28V618X3D";
    // const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=XAU&apikey=Z1EVIMF28V618X3D";
    // const url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=Z1EVIMF28V618X3D";
    // const url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=EUR&apikey=Z1EVIMF28V618X3D";
    const url = "https://api.finage.co.uk/last/crypto/BTCUSD?apikey=API_KEYaeV4TA7IC5L7II8MLR5M3EHH4VID5RMA";
    try {
      const response = await fetch(url, { mode: "no-cors" });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    if (formProps.id) {
      //handle asset edits
      // const assetToUpdate = userAssets.find((asset) => asset.id === Number(formProps.id));
      setUserAssets((prevUserAssets) =>
        prevUserAssets.map((asset) =>
          asset.id === Number(formProps.id) ? { ...asset, quantity: formProps.quantity, notes: formProps.notes } : asset
        )
      );
      // displayToast('Asset "' + assetToUpdate.name + '" was updated.');
    } else {
      //handle asset creation
      const newAsset = {
        ...formProps,
        value: 0,
        baseValue: 0,
        isDeleted: false,
        id: userAssets.length,
        abb: "", // TO DO
      };
      setUserAssets([...userAssets, newAsset]);
      displayToast('Asset "' + newAsset.name + '" was created.');
    }
    resetForm();
  }

  function resetForm() {
    setCurrentAssetId(null);
    const assetForm__typeField = document.querySelector("#assetTypeField");
    const assetForm__nameField = document.querySelector("#assetNameField");
    const assetForm__quantityField = document.querySelector("#assetQuantityField");
    const assetForm__notesField = document.querySelector("#assetNotesField");

    assetForm__typeField.parentElement.classList.remove("is-dirty", "is-upgraded");
    assetForm__nameField.parentElement.classList.remove("is-dirty", "is-upgraded");
    assetForm__quantityField.parentElement.classList.remove("is-dirty", "is-upgraded");
    assetForm__notesField.parentElement.classList.remove("is-dirty", "is-upgraded");
    setFormIsVisible(false);
  }

  function handleDeleteAsset(id) {
    setUserAssets((prevUserAssets) => prevUserAssets.map((asset) => (asset.id === id ? { ...asset, isDeleted: true } : asset)));
    displaySnackbar('"' + userAssets.find((asset) => asset.id === id).name + '" was deleted.', "undo", () => {
      handleUnDeleteAsset(id);
    });
  }

  function handleUnDeleteAsset(id) {
    setUserAssets((prevUserAssets) => prevUserAssets.map((asset) => (asset.id === id ? { ...asset, isDeleted: false } : asset)));
    displayToast('"' + userAssets.find((asset) => asset.id === id).name + '" was restored successfully.');
  }

  function handleEditAsset(id) {
    setCurrentAssetId(id);
    setFormIsVisible(true);
    const assetForm__typeField = document.querySelector("#assetTypeField");
    const assetForm__nameField = document.querySelector("#assetNameField");
    const assetForm__quantityField = document.querySelector("#assetQuantityField");
    const assetForm__notesField = document.querySelector("#assetNotesField");

    assetForm__typeField.parentElement.classList.add("is-dirty", "is-upgraded");
    assetForm__nameField.parentElement.classList.add("is-dirty", "is-upgraded");
    assetForm__quantityField.parentElement.classList.add("is-dirty", "is-upgraded");
    assetForm__notesField.parentElement.classList.add("is-dirty", "is-upgraded");
    document.querySelector(".assetFormContainer").scrollIntoView({ behavior: "smooth" });
  }

  function displayToast(error) {
    var notification = document.querySelector(".mdl-js-snackbar");
    notification.MaterialSnackbar.showSnackbar({
      message: error,
    });
  }

  function displaySnackbar(error, buttonText, buttonFunction) {
    var notification = document.querySelector(".mdl-js-snackbar");
    var data = {
      message: error,
      actionHandler: function () {
        buttonFunction();
      },
      actionText: buttonText,
      timeout: 4000,
    };
    notification.MaterialSnackbar.showSnackbar(data);
  }

  return (
    <>
      <div id="wrapper">
        <h1>Track your assets!</h1>
        <Form formIsVisible={formIsVisible} defaultData={currentAsset} onFormSubmit={handleFormSubmit} resetForm={resetForm} />
        <div id="assetControls" className="layoutElement">
          <AssetControls setFormIsVisible={setFormIsVisible} handleUpdateValues={fetchValuesFromApi} setCurrentAssetId={setCurrentAssetId} />
          <Filters />
        </div>
        <div id="asset-list" className="layoutElement">
          {visibleUserAssets.map((asset) => (
            <Asset
              key={asset.id}
              asset={asset}
              handleDeleteAsset={handleDeleteAsset}
              handleEditAsset={handleEditAsset}
              assetUnits={assetUnits}
              setFormIsVisible={setFormIsVisible}
            />
          ))}
        </div>
        <Footer>
          <TotalValue visibleUserAssets={visibleUserAssets} />
        </Footer>
        <SnackBar />
      </div>
    </>
  );
}
