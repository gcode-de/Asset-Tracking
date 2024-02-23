import Asset from "@/components/Asset";
import AssetControls from "@/components/AssetControls";
import Filters from "@/components/Filters";
import Form from "@/components/Form";
import SnackBar from "@/components/SnackBar";
import Footer from "@/components/Footer";
import TotalValue from "@/components/TotalValue";
import { useAssetStore, useCurrentAsset, useFormStore, useVisibleUserAssets } from "@/../state.js";
import Login from "@/components/Login";
import useSWR from "swr";
import axios from "axios";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";

export default function App() {
  const setFormIsVisible = useFormStore((state) => state.setFormIsVisible);
  const setCurrentAssetId = useFormStore((state) => state.setCurrentAssetId);
  const userAssets = useAssetStore((state) => state.userAssets);
  // const currentAssetId = useFormStore((state) => state.currentAssetId);
  const deleteAsset = useAssetStore((state) => state.handleDeleteAsset);
  const unDeleteAsset = useAssetStore((state) => state.handleUnDeleteAsset);
  const addAsset = useAssetStore((state) => state.handleAddAsset);
  const editAsset = useAssetStore((state) => state.handleEditAsset);

  const apiClient = axios.create({
    baseURL: "/api", // Passen Sie dies an die Basis-URL Ihrer API an
    headers: {
      "Content-Type": "application/json",
    },
  });

  // useEffect(() => {
  //   console.log(userAssets);
  // }, [userAssets]);

  async function fetchValuesFromApi() {
    // const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=Z1EVIMF28V618X3D";
    // const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=XAU&apikey=Z1EVIMF28V618X3D";
    // const url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=Z1EVIMF28V618X3D";
    // const url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=EUR&apikey=Z1EVIMF28V618X3D";
    // const url = "https://api.finage.co.uk/last/crypto/BTCUSD?apikey=API_KEYaeV4TA7IC5L7II8MLR5M3EHH4VID5RMA";
    // try {
    //   const response = await fetch(url, { mode: "no-cors" });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const { data: user, isLoading, error, mutate } = useSWR("/api/user");

  // console.log(user);

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    if (formProps.id) {
      //handle asset edits
      const assetToUpdate = userAssets.find((asset) => asset._id === Number(formProps.id));
      editAsset(Number(formProps.id), { quantity: formProps.quantity, notes: formProps.notes });
      // displayToast(`"${assetToUpdate.name}" was updated.`);
    } else {
      //handle asset creation
      const newAsset = {
        ...formProps,
        value: 0,
        baseValue: 0,
        isDeleted: false,
        // id: userAssets.length,
        abb: "", // TO DO
      };
      addAsset(newAsset);
      // displayToast(`Asset ${newAsset.name} was created.`);
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

  async function handleDeleteAsset(assetId) {
    // deleteAsset(id);
    try {
      const response = await apiClient.post(`/user`, {
        action: "softDelete",
        assetId,
      });
      console.log(response.data);
      // Weitere Aktionen...
    } catch (error) {
      console.error("Fehler beim Soft-Delete des Assets:", error);
    }
    // setUserAssets((prevUserAssets) => prevUserAssets.map((asset) => (asset.id === id ? { ...asset, isDeleted: true } : asset)));
    const assetName = userAssets.find((asset) => asset._id === assetId).name;
    // displaySnackbar(`"${assetName}" was deleted.`, "undo", () => {
    //   handleUnDeleteAsset(id);
    // });
  }

  async function handleUnDeleteAsset(assetId) {
    // unDeleteAsset(id);
    try {
      const response = await apiClient.post(`/user`, {
        action: "softUndelete",
        assetId,
      });
      console.log(response.data);
      // Weitere Aktionen...
    } catch (error) {
      console.error("Fehler beim Soft-Undelete des Assets:", error);
    }
    // setUserAssets((prevUserAssets) => prevUserAssets.map((asset) => (asset.id === id ? { ...asset, isDeleted: false } : asset)));
    const assetName = userAssets.find((asset) => asset._id === assetId).name;
    // displayToast(`"${assetName}" was restored successfully.`);
  }

  function handleEditAsset(id) {
    setCurrentAssetId(id);
    setFormIsVisible(true);

    //Handle Form Styling
    const assetForm__typeField = document.querySelector("#assetTypeField");
    const assetForm__nameField = document.querySelector("#assetNameField");
    const assetForm__quantityField = document.querySelector("#assetQuantityField");
    const assetForm__notesField = document.querySelector("#assetNotesField");

    assetForm__typeField.parentElement.classList.add("is-dirty", "is-upgraded");
    assetForm__nameField.parentElement.classList.add("is-dirty", "is-upgraded");
    assetForm__quantityField.parentElement.classList.add("is-dirty", "is-upgraded");
    assetForm__notesField.parentElement.classList.add("is-dirty", "is-upgraded");

    setTimeout(() => {
      //wait for form to render
      const assetFormContainer = document.querySelector(".assetFormContainer");
      assetFormContainer.scrollIntoView({ behavior: "smooth" });
    }, 0);
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

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return;
  }

  return (
    <>
      <div id="wrapper">
        <Login />
        <h1>Track your assets!</h1>
        <Form onFormSubmit={handleFormSubmit} resetForm={resetForm} />
        <div id="assetControls" className="layoutElement">
          <AssetControls handleUpdateValues={fetchValuesFromApi} />
          <Filters />
        </div>
        {/* <div id="asset-list" className="layoutElement">
          {useVisibleUserAssets().map((asset) => (
            <Asset key={asset.id} asset={asset} handleDeleteAsset={handleDeleteAsset} handleEditAsset={handleEditAsset} />
          ))}
        </div> */}
        <div id="asset-list" className="layoutElement">
          {user.assets.map((asset) => (
            <Asset key={asset._id} asset={asset} handleDeleteAsset={handleDeleteAsset} handleEditAsset={handleEditAsset} />
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
