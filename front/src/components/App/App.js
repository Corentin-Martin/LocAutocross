import axios from 'axios';
import { useState } from 'react';
import './App.scss';

function App() {
  const [brands, setBrands] = useState([]);

  axios.get('http://localhost:8000/api/brands')
    .then((response) => {
      setBrands(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="app">
      <ul>
        {brands.map((brand) => <li key={brand.id}>{brand.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
