import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from '../types/Image';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'https://picsum.photos/v2/list?page=1&limit=50'
        );
        const data = response.data;
        setImages(
          data.map((img: any) => ({
            id: img.id,
            title: `${img.author}`,
            url: img.download_url,
          }))
        );
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = images.filter((image) =>
    
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Image Gallery</h1>
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
        }}
      />
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredImages.map((image) => (
            <div key={image.id} style={{ textAlign: 'center' }}>
              <img
                src={image.url}
                alt={image.title}
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <p>{image.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
