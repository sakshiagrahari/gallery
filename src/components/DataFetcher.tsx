import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../types/ApiTypes'; 
const DataFetcher: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        setLoading(true); 
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data); 
      } 
      catch (err) 
      {
        setError('Failed to fetch data. Please try again.'); 
      } 
      finally 
      {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
