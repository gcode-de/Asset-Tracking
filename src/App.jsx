import "./App.css";
import Asset from "./components/Asset";
import AssetControls from "./components/AssetControls";
import Filters from "./components/Filters";
import Form from "./components/Form";
import SnackBar from "./components/SnackBar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import TotalValue from "./components/TotalValue";
import { useAssetStore, useFormStore, useVisibleUserAssets } from "../state.js";

export default function App() {
  const toggleFormIsVisible = useFormStore((state) => state.toggleFormIsVisible);
  const setCurrentAssetId = useFormStore((state) => state.setCurrentAssetId);
  const userAssets = useAssetStore((state) => state.userAssets);
  const currentAssetId = useFormStore((state) => state.currentAssetId);
  const deleteAsset = useAssetStore((state) => state.handleDeleteAsset);
  const unDeleteAsset = useAssetStore((state) => state.handleUnDeleteAsset);
  const addAsset = useAssetStore((state) => state.handleAddAsset);
  const editAsset = useAssetStore((state) => state.handleEditAsset);

  // useEffect(() => {
  //   console.log(userAssets);
  // }, [userAssets]);

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
    console.log(formProps);
    if (formProps.id) {
      //handle asset edits
      const assetToUpdate = userAssets.find((asset) => asset.id === Number(formProps.id));
      editAsset(assetToUpdate, { quantity: formProps.quantity, notes: formProps.notes });
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
      addAsset(newAsset);
      displayToast(`Asset ${newAsset.name} was created.`);
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
    toggleFormIsVisible();
  }

  function handleDeleteAsset(id) {
    deleteAsset(id);
    // setUserAssets((prevUserAssets) => prevUserAssets.map((asset) => (asset.id === id ? { ...asset, isDeleted: true } : asset)));
    displaySnackbar(` was deleted.`, "undo", () => {
      handleUnDeleteAsset(id);
    });
  }

  function handleUnDeleteAsset(id) {
    unDeleteAsset(id);
    // setUserAssets((prevUserAssets) => prevUserAssets.map((asset) => (asset.id === id ? { ...asset, isDeleted: false } : asset)));
    displayToast(` was restored successfully.`);
  }

  function handleEditAsset(id) {
    console.log(currentAssetId);
    setCurrentAssetId(id);
    toggleFormIsVisible();
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
        <Form onFormSubmit={handleFormSubmit} resetForm={resetForm} />
        <div id="assetControls" className="layoutElement">
          <AssetControls handleUpdateValues={fetchValuesFromApi} />
          <Filters />
        </div>
        <div id="asset-list" className="layoutElement">
          {useVisibleUserAssets().map((asset) => (
            <Asset key={asset.id} asset={asset} handleDeleteAsset={handleDeleteAsset} handleEditAsset={handleEditAsset} />
          ))}
        </div>
        <Footer>
          <TotalValue />
        </Footer>
        <SnackBar />
      </div>
    </>
  );
}
