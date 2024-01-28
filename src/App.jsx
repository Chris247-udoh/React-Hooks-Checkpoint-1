import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const url =
      'https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20&lang=en';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c6c84c2b9amsh10fa03634939db1p1d9a00jsn93b1199f2f32',
        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setMovies(result.titles);
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchMovies when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    card: {
      width: '300px',
      margin: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
  };

  return (
    <>
      <h1>Movies List App</h1>

      <div style={styles.container}>
        {movies.map((movie) => (
          <div key={movie.summary.id} style={styles.card}>
            <img
              width="300px"
              height="200px"
              src={movie.jawSummary.backgroundImage.url}
              alt={movie.jawSummary.title}
            />

            <h2>{movie.jawSummary.title}</h2>
            <p>{movie.jawSummary.releaseYear}</p>
            <p>{movie.jawSummary.synopsis}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
