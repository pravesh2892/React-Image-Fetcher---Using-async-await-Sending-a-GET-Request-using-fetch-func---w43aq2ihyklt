import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
      const data = await response.json();
      setPhotoData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="app">
      <input
        type="number"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      {loading ? <Loader /> : null}
      {photoData && <PhotoFrame url={photoData.url} title={photoData.title} />}
    </div>
  );
};

export default App;
