import PropTypes from "prop-types";
export default function TotalValue({ userAssets }) {
  return (
    <>
      Total Worth: $
      {Math.round(userAssets.filter((asset) => !asset.isDeleted).reduce((acc, asset) => acc + asset.baseValue * asset.quantity, 0)).toLocaleString(
        "de-DE"
      )}{" "}
      €
    </>
  );
}

TotalValue.propTypes = {
  userAssets: PropTypes.array.isRequired,
};
