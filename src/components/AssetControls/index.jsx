import PropTypes from "prop-types";
import { useFormStore } from "../../../state";

export default function AssetControls({ handleUpdateValues }) {
  const setFormIsVisible = useFormStore((state) => state.setFormIsVisible);
  const setCurrentAssetId = useFormStore((state) => state.setCurrentAssetId);

  return (
    <>
      <div className="buttons">
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
          id="addAssetButton"
          onClick={() => {
            setFormIsVisible(true);
            setCurrentAssetId(null);
          }}
        >
          Add Asset
        </button>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="updateValuesButton" onClick={handleUpdateValues}>
          Update Values
        </button>
      </div>
    </>
  );
}

AssetControls.propTypes = {
  handleUpdateValues: PropTypes.func.isRequired,
};
