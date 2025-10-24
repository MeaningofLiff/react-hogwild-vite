import HogCard from "./HogCard.jsx";

export default function HogList({ hogs, expandedIds, onToggleExpand, onHide }) {
  return (
    <div className="ui cards">
      {hogs.map((hog) => (
        <HogCard
          key={hog.id}
          hog={hog}
          expanded={expandedIds.has(hog.id)}
          onToggleExpand={() => onToggleExpand(hog.id)}
          onHide={() => onHide(hog.id)}
        />
      ))}
    </div>
  );
}
 