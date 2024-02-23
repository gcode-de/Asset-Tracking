import PropTypes from "prop-types";
import { useFormStore, useCurrentAsset } from "../../../state";
// import "./Form.css";
import styles from "./Form.module.css";
import { useState, useEffect } from "react";

export default function Form({ onFormSubmit, resetForm }) {
  const currentAsset = useCurrentAsset();
  const [selectedType, setSelectedType] = useState("");
  const formIsVisible = useFormStore((state) => state.formIsVisible);

  useEffect(() => {
    if (currentAsset && currentAsset.type) {
      setSelectedType(currentAsset.type);
    } else {
      setSelectedType("");
    }
  }, [currentAsset, formIsVisible]);

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  console.log(currentAsset);

  return (
    <div className={`assetFormContainer layoutElement ${formIsVisible || "hidden"}`}>
      <h2>{useCurrentAsset()?.id ? "Edit asset" : "Add asset"}</h2>
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
          <select
            className="mdl-textfield__input"
            id="assetTypeField"
            autoComplete="off"
            name="type"
            required
            value={selectedType}
            onChange={handleChange}
          >
            <option value=""></option>
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
            defaultValue={useCurrentAsset()?.name}
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
            defaultValue={useCurrentAsset()?.quantity}
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
            defaultValue={useCurrentAsset()?.notes}
          />
        </div>
        <input type="text" id="assetIdField" name="id" hidden defaultValue={useCurrentAsset()?._id} />
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
  resetForm: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
