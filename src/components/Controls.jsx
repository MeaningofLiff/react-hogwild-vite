export default function Controls({ greasedOnly, onGreasedChange, sortBy, onSortChange }) {
  const checkboxId = "greasedOnly";
  const selectId = "sortBy";

  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="fields">
          <div className="field">
            <div className="ui checkbox">
              <input
                id={checkboxId}
                type="checkbox"
                checked={greasedOnly}
                onChange={(e) => onGreasedChange(e.target.checked)}
              />
         <label htmlFor="greasedOnly">Greased Pigs Only?</label>
 
            </div>
          </div>

          <div className="field">
          <label htmlFor="sortBy">Sort by:</label> 
            <select
              id={selectId}
              className="ui dropdown"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="">(none)</option>
              <option value="name">Name</option>
              <option value="weight">Weight</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
 