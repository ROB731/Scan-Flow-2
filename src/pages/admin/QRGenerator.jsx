import React, { useState, useRef } from 'react';

const QRGenerator = ({ data, onSave, onCancel }) => {
  const [qrValue, setQrValue] = useState(data);
  const canvasRef = useRef(null);
  
  const generateQR = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Effacer le canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Taille du QR code
    const qrSize = 200;
    const padding = 20;
    
    // Position de départ
    const startX = (canvas.width - qrSize) / 2;
    const startY = (canvas.height - qrSize) / 2;
    
    // Dessiner le fond blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(startX - padding, startY - padding, qrSize + padding * 2, qrSize + padding * 2);
    
    // Dessiner un QR code simplifié (carrés)
    ctx.fillStyle = '#000000';
    
    // Grand carré extérieur
    ctx.fillRect(startX, startY, qrSize, qrSize);
    
    // Carré intérieur blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(startX + 40, startY + 40, qrSize - 80, qrSize - 80);
    
    // Carré central noir
    ctx.fillStyle = '#000000';
    ctx.fillRect(startX + 80, startY + 80, qrSize - 160, qrSize - 160);
    
    // Ajouter du texte
    ctx.fillStyle = '#333333';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(data, canvas.width / 2, startY + qrSize + 30);
    
    // Logo au centre
    ctx.fillStyle = '#EA580C';
    ctx.font = 'bold 40px Arial';
    ctx.fillText('R', canvas.width / 2, startY + qrSize / 2 + 15);
  };

  const handleDownload = () => {
    generateQR();
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave(dataUrl);
  };

  // Générer le QR code au montage
  useState(() => {
    generateQR();
  }, []);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <canvas 
          ref={canvasRef} 
          width="300" 
          height="350"
          className="border border-gray-300"
        ></canvas>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lien du QR Code
        </label>
        <input
          type="text"
          value={qrValue}
          onChange={(e) => setQrValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={generateQR}
          className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-sm"
        >
          Générer à nouveau
        </button>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md"
        >
          Annuler
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md"
        >
          Enregistrer QR Code
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;