import PropTypes from "prop-types";

import "./Form.css";
export default function Form({ setFormIsVisible, formIsVisible, defaultData, setCurrentAssetId, onFormSubmit, resetForm }) {
  // const assetForm = document.querySelector("#form");
  // const assetForm__typeField = document.querySelector("#assetTypeField");
  // const assetForm__nameField = document.querySelector("#assetNameField");
  // const assetForm__quantityField = document.querySelector("#assetQuantityField");
  // const assetForm__notesField = document.querySelector("#assetNotesField");

  // assetForm__typeField.parentElement.classList.remove("is-dirty", "is-upgraded");
  // assetForm__nameField.parentElement.classList.remove("is-dirty", "is-upgraded");
  // assetForm__quantityField.parentElement.classList.remove("is-dirty", "is-upgraded");
  // assetForm__notesField.parentElement.classList.remove("is-dirty", "is-upgraded");

  return (
    <div className={`assetFormContainer layoutElement ${formIsVisible || "hidden"}`}>
      <h2>Add/Edit asset</h2>
      <form id="form" onSubmit={onFormSubmit}>
        {/* <select id="assetTypeList">
            <option value="Crypto" />
            <option value="Stocks" />
            <option value="Metals" />
          </select>
          <select id="Metals">
            <option value="Aluminum" />
            <option value="Cobalt" />
            <option value="Copper" />
            <option value="Gold" />
            <option value="Nickel" />
            <option value="Palladium" />
            <option value="Platinum" />
            <option value="Ruthenium" />
            <option value="Silver" />
            <option value="Zinc" />
          </select>
          <select id="Stocks">
            <option value="Apple" />
            <option value="Meta" />
            <option value="Alphabet" />
            <option value="Amazon" />
          </select>
          <select id="Crypto">
            <option value="Bitcoin" />
            <option value="Bitcoin Cash" />
            <option value="Cardano" />
            <option value="ChainLink" />
            <option value="Ethereum" />
            <option value="Dogecoin" />
            <option value="Litecoin" />
            <option value="Ripple" />
            <option value="Solana" />
            <option value="Stellar" />
            <option value="Uniswap" />
          </select> */}

        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <label className="mdl-textfield__label" htmlFor="assetTypeField">
            Type
          </label>
          <select className="mdl-textfield__input" id="assetTypeField" autoComplete="off" name="type" required value={defaultData?.type}>
            <option value=""></option>
            {/* <option value="">Choose asset type:</option> */}
            <option value="crypto">Crypto</option>
            <option value="metals">Precious Metal</option>
            <option value="stocks">Stock</option>
            <option value="real_estate">Real Estate</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <label className="mdl-textfield__label" htmlFor="assetNameField">
            Asset
          </label>
          <input
            className="mdl-textfield__input"
            type="text"
            id="assetNameField"
            autoComplete="off"
            name="name"
            required
            defaultValue={defaultData?.name}
          />
        </div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <label className="mdl-textfield__label" htmlFor="assetQuantityField" id="assetQuantityLabel">
            Quantity
          </label>
          <input
            className="mdl-textfield__input"
            type="text"
            pattern="-?[0-9]*(\.[0-9]+)?"
            id="assetQuantityField"
            autoComplete="off"
            name="quantity"
            defaultValue={defaultData?.quantity}
          />
          <span className="mdl-textfield__error">Input is not a number!</span>
          <span id="assetUnitField"></span>
        </div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <label className="mdl-textfield__label" htmlFor="assetNotesField">
            Notes
          </label>
          <input
            className="mdl-textfield__input"
            type="text"
            id="assetNotesField"
            autoComplete="off"
            name="notes"
            defaultValue={defaultData?.notes}
          />
        </div>
        <input type="text" id="assetIdField" name="id" hidden defaultValue={defaultData?.id} />
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="saveButton">
          Save
        </button>
      </form>
      <button
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        id="cancelButton"
        onClick={() => {
          resetForm();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

Form.propTypes = {
  formIsVisible: PropTypes.bool.isRequired,
  setFormIsVisible: PropTypes.func.isRequired,
  setCurrentAssetId: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  defaultData: PropTypes.object,
};
