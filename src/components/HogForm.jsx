import { useState } from 'react';

export default function HogForm({ onAddHog }) {
  const [form, setForm] = useState({
    name: '',
    specialty: '',
    greased: false,
    weight: '',
    highestMedalAchieved: '',
    image: ''
  });

  const ids = {
    name: 'hogName',
    specialty: 'hogSpecialty',
    greased: 'hogGreased',
    weight: 'hogWeight',
    medal: 'hogMedal',
    image: 'hogImage'
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHog(form);
    setForm({
      name: '',
      specialty: '',
      greased: false,
      weight: '',
      highestMedalAchieved: '',
      image: ''
    });
  };

  return (
    <form className="ui segment form" onSubmit={handleSubmit}>
      <h4 className="ui dividing header">Add a New Hog</h4>

      <div className="fields">
        <div className="eight wide field">
          <label htmlFor={ids.name}>Name:</label>
          <input
            id={ids.name}
            name="name"
            placeholder="Porkchop"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="eight wide field">
          <label htmlFor={ids.specialty}>Specialty:</label>
          <input
            id={ids.specialty}
            name="specialty"
            placeholder="Truffle Finder"
            value={form.specialty}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="fields">
        <div className="six wide field">
          <label htmlFor={ids.weight}>Weight:</label>
          <input
            id={ids.weight}
            name="weight"
            type="number"
            step="0.01"
            placeholder="0.0"
            value={form.weight}
            onChange={handleChange}
          />
        </div>
        <div className="six wide field">
          <label htmlFor={ids.medal}>Highest Medal Achieved:</label>
          <input
            id={ids.medal}
            name="highestMedalAchieved"
            placeholder="gold/silver/bronze"
            value={form.highestMedalAchieved}
            onChange={handleChange}
          />
        </div>
        <div className="four wide field">
          <div className="ui checkbox" style={{ marginTop: 24 }}>
            <input
              id={ids.greased}
              name="greased"
              type="checkbox"
              checked={form.greased}
              onChange={handleChange}
            />
            <label htmlFor={ids.greased}>Greased?</label> 
          </div>
        </div>
      </div>

      <div className="field">
        <label htmlFor={ids.image}>Image URL (optional):</label>
        <input
          id={ids.image}
          name="image"
          placeholder="https://..."
          value={form.image}
          onChange={handleChange}
        />
      </div>

      <button className="ui primary button" type="submit">
        Add Hog
      </button>
    </form>
  );
}
 