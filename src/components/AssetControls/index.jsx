import PropTypes from "prop-types";

export default function AssetControls({ setFormIsVisible, handleUpdateValues, setCurrentAssetId }) {
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
  setFormIsVisible: PropTypes.func.isRequired,
  handleUpdateValues: PropTypes.func.isRequired,
  setCurrentAssetId: PropTypes.func.isRequired,
};
