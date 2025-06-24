import React, { useState } from 'react';
import './MediaGallery.css';

const MediaGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      category: 'events',
      src: require('../assets/images/general/event1.jpg'),
      title: 'Graduation Ceremony 2024',
      description: 'Celebrating our successful graduates'
    },
    {
      id: 2,
      type: 'image',
      category: 'events',
      src: require('../assets/images/general/event2.jpg'),
      title: 'Skills Exhibition',
      description: 'Showcasing student projects and achievements'
    },
    {
      id: 3,
      type: 'image',
      category: 'events',
      src: require('../assets/images/general/event3.jpg'),
      title: 'Community Outreach',
      description: 'Engaging with the local community'
    },
    {
      id: 4,
      type: 'image',
      category: 'events',
      src: require('../assets/images/general/event4.jpg'),
      title: 'Training Workshop',
      description: 'Hands-on learning experience'
    },
    {
      id: 5,
      type: 'image',
      category: 'training',
      src: require('../assets/images/general/465A4602.jpg'),
      title: 'Computer Training Session',
      description: 'Students learning computer skills'
    },
    {
      id: 6,
      type: 'image',
      category: 'training',
      src: require('../assets/images/general/465A4605.jpg'),
      title: 'Fashion Design Class',
      description: 'Creative fashion design workshop'
    },
    {
      id: 7,
      type: 'image',
      category: 'training',
      src: require('../assets/images/general/465A4608.jpg'),
      title: 'Practical Training',
      description: 'Hands-on skill development'
    },
    {
      id: 8,
      type: 'image',
      category: 'training',
      src: require('../assets/images/general/465A4610.jpg'),
      title: 'Group Learning',
      description: 'Collaborative learning environment'
    },
    {
      id: 9,
      type: 'image',
      category: 'facilities',
      src: require('../assets/images/general/465A4615.jpg'),
      title: 'Training Facility',
      description: 'Modern training equipment and space'
    },
    {
      id: 10,
      type: 'image',
      category: 'facilities',
      src: require('../assets/images/general/465A4621.jpg'),
      title: 'Workshop Area',
      description: 'Well-equipped workshop for practical training'
    },
    {
      id: 11,
      type: 'image',
      category: 'facilities',
      src: require('../assets/images/general/465A4625.jpg'),
      title: 'Learning Environment',
      description: 'Conducive learning atmosphere'
    },
    {
      id: 12,
      type: 'video',
      category: 'promotional',
      src: require('../assets/images/general/465A4626.jpg'),
      title: 'BCFSA Overview',
      description: 'Introduction to our programs and facilities',
      videoSrc: '../assets/vedios/Bago CFSA.mp4'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Media' },
    { id: 'events', name: 'Events' },
    { id: 'training', name: 'Training' },
    { id: 'facilities', name: 'Facilities' },
    { id: 'promotional', name: 'Videos' }
  ];

  const filteredMedia = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="media-gallery">
      <h2>Media Gallery</h2>
      <p>Explore our journey through photos and videos showcasing our programs, events, and achievements</p>

      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredMedia.map(item => (
          <div key={item.id} className="gallery-item" onClick={() => openModal(item)}>
            <div className="gallery-image">
              <img src={item.src} alt={item.title} />
              {item.type === 'video' && (
                <div className="video-overlay">
                  <span className="play-button">▶️</span>
                </div>
              )}
              <div className="gallery-overlay">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-media">
              {selectedImage.type === 'video' ? (
                <video controls width="100%">
                  <source src={selectedImage.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={selectedImage.src} alt={selectedImage.title} />
              )}
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaGallery;
