import { create } from "zustand";

const initialAssets = [
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
];

export const useAssetStore = create((set) => ({
  userAssets: [...initialAssets],
  assetUnits: {
    stocks: "Piece/s",
    metals: "Oz",
    crypto: "Piece/s",
    real_estate: "Piece/s",
    cash: "Piece/s",
  },
  handleDeleteAsset: (assetId) => {
    set((state) => ({ userAssets: state.userAssets.map((asset) => (asset.id === assetId ? { ...asset, isDeleted: true } : asset)) }));
  },
  handleUnDeleteAsset: (assetId) => {
    set((state) => ({ userAssets: state.userAssets.map((asset) => (asset.id === assetId ? { ...asset, isDeleted: false } : asset)) }));
  },
  handleAddAsset: (newAsset) => {
    set((state) => ({
      userAssets: [...state.userAssets, newAsset],
    }));
  },
  handleEditAsset: (assetId, updates) => {
    set((state) => {
      const updatedUserAssets = state.userAssets.map((asset) => {
        if (asset.id === assetId) {
          return {
            ...asset,
            ...updates,
          };
        }
        return asset;
      });
      return { userAssets: updatedUserAssets };
    });
  },
}));

export const useVisibleUserAssets = () => {
  const visibleUserAssets = useAssetStore((state) => state.userAssets.filter((asset) => !asset.isDeleted));
  return visibleUserAssets;
};

export const useTotalValue = () => {
  const userAssets = useAssetStore((state) => state.userAssets);
  return userAssets
    .filter((asset) => !asset.isDeleted)
    .reduce((acc, asset) => acc + asset.baseValue * asset.quantity, 0)
    .toLocaleString("de-DE");
};

export const useFormStore = create((set) => ({
  formIsVisible: false,
  setFormIsVisible: (isVisible) => {
    set(() => ({ formIsVisible: isVisible }));
  },
  currentAssetId: null,
  setCurrentAssetId: (assetId) => {
    set({ currentAssetId: assetId });
  },
}));

export const useCurrentAsset = () => {
  const currentAssetId = useFormStore((state) => state.currentAssetId);
  console.log(currentAssetId);
  //klappt nicht, da von MongoDB andere IDs kommen.
  const userAssets = useAssetStore((state) => state.userAssets);

  const currentAsset = userAssets.find((asset) => asset.id === currentAssetId);
  return currentAsset;
};
