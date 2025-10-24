import { getImageSrc, getWeight } from "../utils/hogUtils";

export default function HogCard({ hog, expanded, onToggleExpand, onHide }) {
  const { name, specialty, greased } = hog;
  const highestMedal = hog["highest medal achieved"]; // <-- correct key
  const weight = getWeight(hog);
  const img = getImageSrc(hog);

  return (
    <div aria-label="hog card" className="ui card">
      <div className="image" style={{ cursor: "pointer" }} onClick={onToggleExpand}>
        <img src={img} alt={`Photo of ${name}`} />
      </div>
      <div className="content" style={{ cursor: "pointer" }} onClick={onToggleExpand}>
        <h3 className="header">{name}</h3>
      </div>

      {expanded && (
        <div className="content">
          <div className="meta">Specialty: {specialty || "—"}</div>
          <div className="description">
            <p><strong>Weight:</strong> {weight}</p>
            <p><strong>Greased:</strong> {greased ? "Greased" : "Nongreased"}</p>
            <p><strong>Highest Medal:</strong> {highestMedal || "—"}</p>
          </div>
        </div>
      )}

      <div className="extra content">
        <button className="ui tiny button" onClick={onHide}>Hide Me</button>
      </div>
    </div>
  );
}
 