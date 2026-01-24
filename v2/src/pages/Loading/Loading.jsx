import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-brand">
          VITA<span>PREP</span>
        </div>
        <div className="loading-line-wrapper">
          <div className="loading-line-active"></div>
        </div>
        <p className="loading-status">Synchronizing secure data...</p>
      </div>
    </div>
  );
}