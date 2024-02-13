export default function Footer({ children }) {
  return (
    <div id="footer">
      <p id="total-value" className="layoutElement">
        {children}
      </p>
      <br />
      <p className="layoutElement">
        This app keeps track of your assets and gets real time price data from separate APIs.
        <br />
        Your assets are stored on local cache so they will be available when you come back!
      </p>
    </div>
  );
}
