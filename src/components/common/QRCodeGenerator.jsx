// import React from 'react';
// import { QRCodeSVG } from 'qrcode.react'; // Utilisation de l'export nommé

// const QRCodeGenerator = ({ value, size = 128 }) => {
//   return (
//     <div className="flex flex-col items-center p-4">
//       <QRCodeSVG 
//         value={value} 
//         size={size}
//         fgColor="#ea580c"
//         bgColor="#ffffff"
//         includeMargin={true}
//       />
//       <div className="mt-3 text-center">
//         <p className="text-sm text-gray-600">Scannez pour accéder au menu</p>
//         <p className="text-xs text-gray-500 mt-1">Établissement: {value.split('/').pop()}</p>
//       </div>
//     </div>
//   );
// };

// export default QRCodeGenerator;





// import React, { useRef } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
// import html2canvas from 'html2canvas';

// const QRGenerator = ({ data, establishmentName, onSave, onCancel }) => {
//   const qrRef = useRef(null);

//   const handleSave = () => {
//     html2canvas(qrRef.current).then(canvas => {
//       const dataUrl = canvas.toDataURL('image/png');
//       onSave(dataUrl);
//     });
//   };

//   const handlePrint = () => {
//     const printWindow = window.open('', '_blank');
    
//     // Extract SVG safely
//     const svgElement = qrRef.current.querySelector('svg');
//     const svgString = new XMLSerializer().serializeToString(svgElement);
//     const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>QR Code - ${establishmentName}</title>
//           <style>
//             body { 
//               display: flex; 
//               justify-content: center; 
//               align-items: center; 
//               height: 100vh; 
//               margin: 0; 
//               font-family: Arial, sans-serif;
//             }
//             .qr-container {
//               text-align: center;
//               padding: 20px;
//             }
//             .qr-title {
//               font-size: 24px;
//               font-weight: bold;
//               margin-bottom: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="qr-container">
//             <div class="qr-title">${establishmentName}</div>
//             <img src="${svgDataUrl}" width="280" />
//           </div>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <div className="flex flex-col items-center animate-fadeIn">
//       <div 
//         ref={qrRef} 
//         className="bg-white p-6 rounded-2xl shadow-2xl"
//       >
//         <QRCodeSVG 
//           value={data} 
//           size={280}
//           bgColor={"#ffffff"}
//           fgColor={"#000000"}
//           level={"L"}
//           includeMargin={true}
//         />
//         <div className="text-center mt-4 font-bold text-2xl text-gray-800">
//           {establishmentName}
//         </div>
//       </div>
      
//       <div className="mt-8 flex flex-wrap justify-center gap-4 w-full max-w-md">
//         <button
//           onClick={onCancel}
//           className="flex-1 min-w-[120px] bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-xl"
//         >
//           Annuler
//         </button>
//         <button
//           onClick={handleSave}
//           className="flex-1 min-w-[120px] bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl"
//         >
//           Enregistrer
//         </button>
//         <button
//           onClick={handlePrint}
//           className="flex-1 min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl"
//         >
//           Imprimer
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QRGenerator;


import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

const QRGenerator = ({ data, establishmentName, onSave, onCancel }) => {
  const qrRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    } catch (error) {
      console.error("Erreur lors de la génération du QR Code:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = async () => {
    if (!qrRef.current.querySelector('svg')) {
      alert("Veuillez d'abord enregistrer le QR Code avant d'imprimer");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Créer une version simplifiée pour l'impression
      const printWindow = window.open('', '_blank');
      const svgElement = qrRef.current.querySelector('svg');
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${establishmentName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #f5f5f5;
              }
              .qr-container {
                text-align: center;
                padding: 30px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                max-width: 100%;
              }
              .qr-title {
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 25px;
                color: #333;
              }
              .qr-image {
                max-width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <div class="qr-title">${establishmentName}</div>
              <img src="${svgDataUrl}" class="qr-image" />
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 1000);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error("Erreur d'impression:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={qrRef} 
        className="bg-white p-5 rounded-2xl shadow-lg"
        style={{
          background: '#ffffff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}
      >
        <QRCodeSVG 
          value={data} 
          size={window.innerWidth > 768 ? 280 : 200}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={true}
        />
        <div className="text-center mt-4 font-bold text-xl text-gray-800">
          {establishmentName}
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-3 w-full max-w-md">
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 min-w-[100px] bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-colors"
        >
          Annuler
        </button>
        
        <button
          onClick={handleSave}
          disabled={isProcessing}
          className={`flex-1 min-w-[100px] py-2 px-3 rounded-lg transition-colors ${
            isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {isProcessing ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        
        <button
          onClick={handlePrint}
          disabled={isProcessing}
          className={`flex-1 min-w-[100px] py-2 px-3 rounded-lg transition-colors ${
            isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isProcessing ? 'Traitement...' : 'Imprimer'}
        </button>
      </div>
      
      {isProcessing && (
        <div className="mt-4 text-sm text-gray-600">
          Patientez pendant le traitement...
        </div>
      )}
    </div>
  );
};

export default QRGenerator;