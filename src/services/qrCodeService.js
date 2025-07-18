// Génération de QR Code
export const generateQRCodeData = (establishmentId) => {
    return JSON.stringify({
      establishmentId,
      timestamp: Date.now()
    });
  };
  
  export const downloadQRCode = (dataUrl, fileName) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };