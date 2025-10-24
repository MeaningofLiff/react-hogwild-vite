import { useMemo, useState } from "react";
import hogData from "../porkers_data.js";
import Nav from "./Nav.jsx";
import Controls from "./Controls.jsx";
import HogList from "./HogList.jsx";
import HogForm from "./HogForm.jsx";
import { getWeight } from "../utils/hogUtils.js";
import "semantic-ui-css/semantic.min.css"; 

export default function App() {
  // attach stable id to each initial hog
  const initialHogs = useMemo(
    () => hogData.map((hog, idx) => ({ id: String(idx), ...hog })),
    []
  );

  const [hogs, setHogs] = useState(initialHogs);
  const [hiddenIds, setHiddenIds] = useState(() => new Set());
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [idCounter, setIdCounter] = useState(initialHogs.length);

  // derived visible list
  const visibleSorted = useMemo(() => {
    let list = hogs.filter(h => !hiddenIds.has(h.id));
    if (greasedOnly) list = list.filter(h => !!h.greased);

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'weight') {
      list = [...list].sort((a, b) => getWeight(a) - getWeight(b));
    }
    return list;
  }, [hogs, hiddenIds, greasedOnly, sortBy]);

  // handlers
  const handleToggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleHide = (id) => {
    setHiddenIds(prev => new Set(prev).add(id));
  };

  const handleGreasedChange = (checked) => setGreasedOnly(checked);
  const handleSortChange = (value) => setSortBy(value);

  const handleAddHog = (formValues) => {
    const newId = String(idCounter);
    setIdCounter(c => c + 1);
    const newHog = {
      id: newId,
      name: formValues.name.trim() || `Unnamed Hog #${newId}`,
      specialty: formValues.specialty || '',
      greased: !!formValues.greased,
      weight: Number(formValues.weight) || 0,
      highestMedalAchieved: formValues.highestMedalAchieved || '',
      image: formValues.image || '', // optional url
    };
    setHogs(prev => [newHog, ...prev]);
  };

  return (
    <div className="ui container" style={{ paddingTop: 20, paddingBottom: 60 }}>
      <Nav />
      <Controls
        greasedOnly={greasedOnly}
        onGreasedChange={handleGreasedChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <HogForm onAddHog={handleAddHog} />
      <HogList
        hogs={visibleSorted}
        expandedIds={expandedIds}
        onToggleExpand={handleToggleExpand}
        onHide={handleHide}
      />
    </div>
  );
}
 