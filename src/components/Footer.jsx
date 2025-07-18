
import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Menuvo</h3>
            <p className="text-gray-400">
              Solution innovante pour la commande numérique dans les restaurants, bars et pâtisseries.
            </p>
          </div> 
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <address className="not-italic text-gray-400">
              <p>Marcory Bietry, Abidjan Côte d'Ivoire</p>
              <p>Email: contact@menuvo.ci</p>
              <p>Tél: +225 0779253069/0172527765</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Menuvo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;