export default function Filters() {
  return (
    <div id="assetFilters">
      <span className="mdl-chip mdl-chip--deletable">
        <span className="mdl-chip__text">Crypto</span>
        <button type="button" className="mdl-chip__action">
          <i className="material-icons">cancel</i>
        </button>
      </span>
      <span className="mdl-chip mdl-chip--deletable">
        <span className="mdl-chip__text">Metal</span>
        <button type="button" className="mdl-chip__action">
          <i className="material-icons">cancel</i>
        </button>
      </span>
      <span className="mdl-chip mdl-chip--deletable">
        <span className="mdl-chip__text">Stocks</span>
        <button type="button" className="mdl-chip__action" id="cancel-button">
          <i className="material-icons">cancel</i>
        </button>
      </span>
    </div>
  );
}
