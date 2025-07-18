


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './contexts/CartContext';
// import { MenuProvider } from './contexts/MenuContext';
// import { OrderProvider } from './contexts/OrderContext';
// import { StatsProvider } from './contexts/StatsContext';
// import { StockProvider } from './contexts/StockContext';
// import { CashierProvider } from './contexts/CashierContext';

// import HomePage from './pages/client/HomePage';
// import MenuPage from './pages/client/MenuPage';
// import ProductDetailPage from './pages/client/ProductDetailPage';
// import CartPage from './pages/client/CartPage';
// import OrderTrackingPage from './pages/client/OrderTrackingPage';
// import AdminRoutes from './pages/admin/AdminRoutes';
// import ManagerRoutes from './pages/manager/ManagerRoutes';
// import CashierSpace from './pages/cashier/CashierSpace';
// import Header from './components/Header';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <CartProvider>
//       <MenuProvider>
//         <OrderProvider>
//           <StatsProvider>
//             <StockProvider>
//               <CashierProvider>
//                 <Router>
//                   <div className="flex flex-col min-h-screen">
//                     <Header />
//                     <main className="flex-grow bg-gray-50">
//                       <Routes>
//                         {/* Public Routes */}
//                         <Route path="/" element={<HomePage />} />
//                         <Route path="/menu/:establishmentId" element={<MenuPage />} />
//                         <Route path="/product/:productId" element={<ProductDetailPage />} />
//                         <Route path="/cart" element={<CartPage />} />
//                         <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
                        
//                         {/* Espaces admin/manager accessibles sans authentification */}
//                         <Route path="/admin/*" element={<AdminRoutes />} />
//                         <Route path="/manager/*" element={<ManagerRoutes />} />
//                         <Route path="/cashier/*" element={<CashierSpace />} />
                        
//                         {/* Redirection par défaut */}
//                         <Route path="/" element={<HomePage />} />
//                       </Routes>
//                     </main>
//                     <Footer />
//                   </div>
//                 </Router>
//               </CashierProvider>
//             </StockProvider>
//           </StatsProvider>
//         </OrderProvider>
//       </MenuProvider>
//     </CartProvider>
//   );
// }
// export default App;







import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { MenuProvider } from './contexts/MenuContext';
import { OrderProvider } from './contexts/OrderContext';
import { StatsProvider } from './contexts/StatsContext';
import { StockProvider } from './contexts/StockContext';
import { CashierProvider } from './contexts/CashierContext';
import { AnimatePresence } from 'framer-motion';

import HomePage from './pages/client/HomePage';
import MenuPage from './pages/client/MenuPage';
import ProductDetailPage from './pages/client/ProductDetailPage';
import CartPage from './pages/client/CartPage';
import OrderTrackingPage from './pages/client/OrderTrackingPage';
import AdminRoutes from './pages/admin/AdminRoutes';
import ManagerRoutes from './pages/manager/ManagerRoutes';
import CashierSpace from './pages/cashier/CashierSpace';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <MenuProvider>
        <OrderProvider>
          <StatsProvider>
            <StockProvider>
              <CashierProvider>
                <Router>
                  <div className="flex flex-col min-h-screen bg-gray-50">
                    <Header />
                    <main className="flex-grow">
                      <AnimatePresence mode="wait">
                        <Routes>
                          {/* Public Routes */}
                          <Route 
                            path="/" 
                            element={
                              <HomePage />
                            } 
                          />
                          <Route 
                            path="/menu/:establishmentId" 
                            element={<MenuPage />} 
                          />
                          <Route 
                            path="/product/:productId" 
                            element={<ProductDetailPage />} 
                          />
                          <Route 
                            path="/cart" 
                            element={<CartPage />} 
                          />
                          <Route 
                            path="/track-order/:orderId" 
                            element={<OrderTrackingPage />} 
                          />
                          
                          {/* Espaces admin/manager/cashier */}
                          <Route 
                            path="/admin/*" 
                            element={<AdminRoutes />} 
                          />
                          <Route 
                            path="/manager/*" 
                            element={<ManagerRoutes />} 
                          />
                          <Route 
                            path="/cashier/*" 
                            element={<CashierSpace />} 
                          />
                          {/* Redirection par défaut */}
                          <Route 
                            path="*" 
                            element={<HomePage />} 
                          />
                        </Routes>
                      </AnimatePresence>
                    </main>
                    <Footer />
                  </div>
                </Router>
              </CashierProvider>
            </StockProvider>
          </StatsProvider>
        </OrderProvider>
      </MenuProvider>
    </CartProvider>
  );
}

export default App;
