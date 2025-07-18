import React, { useState, useRef, useEffect } from 'react';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const galleryRef = useRef(null);

  const handleZoom = (e) => {
    if (!galleryRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setZoomLevel(prev => prev === 1 ? 2 : 1);
    setPosition({ x, y });
  };

  const handleTouch = (e) => {
    if (e.touches.length === 1) {
      if (!touchStart) {
        setTouchStart({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        });
      } else {
        const dx = e.touches[0].clientX - touchStart.x;
        const dy = e.touches[0].clientY - touchStart.y;
        
        if (Math.abs(dx) > 50) {
          setSelectedImage(prev => 
            dx > 0 
              ? (prev - 1 + images.length) % images.length 
              : (prev + 1) % images.length
          );
          setTouchStart(null);
        }
      }
    } else if (e.touches.length === 2) {
      setZoomLevel(2);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  return (
    <div className="space-y-4">
      <div 
        className="relative overflow-hidden rounded-2xl shadow-xl cursor-zoom-in touch-pan-y"
        onClick={() => setShowModal(true)}
        onTouchStart={(e) => setTouchStart({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        })}
        onTouchMove={handleTouch}
        onTouchEnd={() => setTouchStart(null)}
        ref={galleryRef}
      >
        <img 
          src={images[selectedImage]} 
          alt="Selected" 
          className="w-full h-[300px] object-cover transition-transform duration-500"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${position.x * 100}% ${position.y * 100}%`
          }}
          onMouseMove={handleZoom}
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          Cliquez pour agrandir
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className={`w-20 h-20 object-cover rounded-xl cursor-pointer transition-all duration-300 ${
              index === selectedImage 
                ? 'border-4 border-orange-500 scale-105 shadow-md' 
                : 'border border-gray-300 hover:border-orange-300'
            }`}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
      
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-modalIn"
          onClick={() => setShowModal(false)}
        >
          <div className="max-w-6xl w-full max-h-[90vh] relative">
            <button
              className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-center justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 px-4">
              <button
                className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => (prev - 1 + images.length) % images.length);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-40"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => (prev + 1) % images.length);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <img 
              src={images[selectedImage]} 
              alt="Zoomed" 
              className="w-full h-auto max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              Pincez pour zoomer | Glissez pour naviguer
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;