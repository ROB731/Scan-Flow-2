
import React, { useEffect, useRef } from 'react';
const QRScanner = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    let stream = null;
    let animationFrameId = null;

    const initScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        // Simuler un scan pour le développement
        setTimeout(() => {
          onScanSuccess(JSON.stringify({ establishmentId: 'demo' }));
        }, 2000);
      }
    };

    const scanQRCode = () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simuler la détection de QR code en développement
        if (process.env.NODE_ENV === 'development') {
          if (Math.random() > 0.8) {
            onScanSuccess(JSON.stringify({ establishmentId: 'demo' }));
            return;
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(scanQRCode);
    };

    initScanner();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onScanSuccess]);

  return (
    <div className="w-full">
      <video 
        ref={videoRef} 
        className="w-full h-auto rounded-md"
        playsInline
      />
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="mt-4 text-center text-gray-600">
        <p>Scannez le QR code de votre table</p>
        <p className="text-sm mt-2">Positionnez le code dans le cadre pour le scanner</p>
      </div>
    </div>
  );
};
export default QRScanner;