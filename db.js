import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
// import firebaseConfig from "./.env";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// get asset details from db
export async function getAssetsFromDB() {
  console.log("getting assets2 from db");
  const assetsFromDB = {};
  // console.log(assetsFromDB);

  const querySnapshot = await getDocs(collection(db, "assets2"));

  querySnapshot.forEach((asset) => {
    // asset.data() is never undefined for query doc snapshots
    // console.log(asset.id, " => ", asset.data());
    // assets2[asset.id] = asset.data();
    assetsFromDB[asset.id] = {
      assetAbb: asset.data().assetAbb,
      assetType: asset.data().assetType,
      assetValue: asset.data().assetValue,
    };
    // console.log(assetsFromDB[asset.id]?.assetAbb);
  });
  console.log(assetsFromDB);
  return assetsFromDB;
}

export async function saveAssetsToDB(assets2) {
  for (let asset in assets2) {
    // asset.data() is never undefined for query doc snapshots
    // console.log(asset.id, " => ", asset.data());
    // assetsNew[asset.id] = {};
    // assetsNew[asset.id].assetAbb = asset.data().assettAbb;
    // assetsNew[asset.id].assetValue = asset.data().assetValue;
    // assetsNew[asset.id].assetType = asset.data().assetType;
    console.log(assets2[asset].assettAbb);
    setDoc(doc(db, "assets2", asset), {
      assetAbb: assets2[asset].assettAbb,
      assetValue: assets2[asset].assetValue,
      assetType: assets2[asset].assetType,
    });
  }
}

// assetUnits = getAssetUnitsFromDB();
export async function getAssetUnitsFromDB() {
  // const assets2 = {};
  // console.log('getting assetUnits from db');

  const assetUnits = await getDoc(db, "general", "assetUnits");
  if (assetUnits.exists()) {
    console.log("Document data:", assetUnits.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return assetUnits;
}
