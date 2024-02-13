import PropTypes from "prop-types";
export default function TotalValue({ visibleUserAssets }) {
  return (
    <>Total Worth: {Math.round(visibleUserAssets.reduce((acc, asset) => acc + asset.baseValue * asset.quantity, 0)).toLocaleString("de-DE")} €</>
  );
}

TotalValue.propTypes = {
  visibleUserAssets: PropTypes.array.isRequired,
};
