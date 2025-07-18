// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiSave, FiEdit, FiTrash, FiPlus, FiLock, FiUnlock, FiX, FiCheck, FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

// const AdminSettings = () => {
//   // États pour la gestion des rôles et permissions
//   const [roles, setRoles] = useState([
//     {
//       id: 'super-admin',
//       name: 'Super Admin',
//       description: 'Accès complet à toutes les fonctionnalités',
//       permissions: [
//         'dashboard:view',
//         'establishments:manage',
//         'managers:manage',
//         'settings:edit',
//         'reports:view',
//         'users:manage',
//         'roles:manage',
//         'analytics:view',
//         'billing:manage'
//       ]
//     },
//     {
//       id: 'admin',
//       name: 'Admin',
//       description: 'Accès à la gestion des établissements et managers',
//       permissions: [
//         'dashboard:view',
//         'establishments:manage',
//         'managers:manage',
//         'reports:view'
//       ]
//     },
//     {
//       id: 'manager',
//       name: 'Manager',
//       description: 'Gestion d\'un établissement spécifique',
//       permissions: [
//         'dashboard:view',
//         'orders:manage',
//         'menu:manage',
//         'reports:view'
//       ]
//     }
//   ]);

//   const [newRole, setNewRole] = useState({
//     name: '',
//     description: '',
//     permissions: []
//   });
  
//   const [editingRoleId, setEditingRoleId] = useState(null);
//   const [isAddingRole, setIsAddingRole] = useState(false);
//   const [isAddingPermission, setIsAddingPermission] = useState(false);
//   const [newPermission, setNewPermission] = useState({ name: '', id: '' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [expandedPermissions, setExpandedPermissions] = useState([]);
  
//   // Toutes les permissions disponibles
//   const [allPermissions, setAllPermissions] = useState([
//     { id: 'dashboard:view', name: 'Voir le tableau de bord' },
//     { id: 'establishments:manage', name: 'Gérer les établissements' },
//     { id: 'managers:manage', name: 'Gérer les managers' },
//     { id: 'orders:manage', name: 'Gérer les commandes' },
//     { id: 'menu:manage', name: 'Gérer le menu' },
//     { id: 'settings:edit', name: 'Modifier les paramètres' },
//     { id: 'reports:view', name: 'Voir les rapports' },
//     { id: 'users:manage', name: 'Gérer les utilisateurs' },
//     { id: 'roles:manage', name: 'Gérer les rôles' },
//     { id: 'analytics:view', name: 'Voir les analyses' },
//     { id: 'billing:manage', name: 'Gérer la facturation' },
//     { id: 'inventory:manage', name: 'Gérer l\'inventaire' },
//     { id: 'reservations:manage', name: 'Gérer les réservations' },
//     { id: 'promotions:manage', name: 'Gérer les promotions' }
//   ]);

//   // Filtrer les permissions en fonction de la recherche
//   const filteredPermissions = allPermissions.filter(permission => 
//     permission.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     permission.id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Gestion des permissions
//   const togglePermission = (roleId, permissionId) => {
//     setRoles(roles.map(role => {
//       if (role.id === roleId) {
//         if (role.permissions.includes(permissionId)) {
//           return {
//             ...role,
//             permissions: role.permissions.filter(p => p !== permissionId)
//           };
//         } else {
//           return {
//             ...role,
//             permissions: [...role.permissions, permissionId]
//           };
//         }
//       }
//       return role;
//     }));
//   };

//   // Gestion de l'ajout de rôle
//   const handleAddRole = () => {
//     if (!newRole.name.trim()) return;
    
//     const role = {
//       id: newRole.name.toLowerCase().replace(/\s+/g, '-'),
//       name: newRole.name,
//       description: newRole.description,
//       permissions: newRole.permissions
//     };
    
//     setRoles([...roles, role]);
//     setIsAddingRole(false);
//     setNewRole({ name: '', description: '', permissions: [] });
//   };

//   // Gestion de la suppression de rôle
//   const handleDeleteRole = (roleId) => {
//     if (roleId === 'super-admin') return; // Ne pas supprimer le super admin
//     setRoles(roles.filter(role => role.id !== roleId));
//   };

//   // Gestion de l'édition de rôle
//   const handleEditRole = (roleId) => {
//     if (editingRoleId === roleId) {
//       setEditingRoleId(null);
//     } else {
//       setEditingRoleId(roleId);
//     }
//   };

//   // Basculer une permission dans le nouveau rôle
//   const toggleNewRolePermission = (permissionId) => {
//     if (newRole.permissions.includes(permissionId)) {
//       setNewRole({
//         ...newRole,
//         permissions: newRole.permissions.filter(p => p !== permissionId)
//       });
//     } else {
//       setNewRole({
//         ...newRole,
//         permissions: [...newRole.permissions, permissionId]
//       });
//     }
//   };

//   // Ajouter une nouvelle permission
//   const handleAddPermission = () => {
//     if (!newPermission.name.trim() || !newPermission.id.trim()) return;
    
//     // Vérifier si la permission existe déjà
//     if (allPermissions.some(p => p.id === newPermission.id)) {
//       alert('Une permission avec cet ID existe déjà !');
//       return;
//     }
    
//     setAllPermissions([...allPermissions, {
//       id: newPermission.id,
//       name: newPermission.name
//     }]);
    
//     setNewPermission({ name: '', id: '' });
//     setIsAddingPermission(false);
//   };

//   // Supprimer une permission
//   const handleDeletePermission = (permissionId) => {
//     // Vérifier si la permission est utilisée dans un rôle
//     const isUsed = roles.some(role => role.permissions.includes(permissionId));
    
//     if (isUsed) {
//       alert('Cette permission est utilisée dans un ou plusieurs rôles et ne peut pas être supprimée.');
//       return;
//     }
    
//     setAllPermissions(allPermissions.filter(p => p.id !== permissionId));
//   };

//   // Toggle l'expansion d'une permission
//   const togglePermissionExpansion = (permissionId) => {
//     if (expandedPermissions.includes(permissionId)) {
//       setExpandedPermissions(expandedPermissions.filter(id => id !== permissionId));
//     } else {
//       setExpandedPermissions([...expandedPermissions, permissionId]);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.4 }
//     }
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8"
//     >
//       <motion.div 
//         className="mb-8"
//         initial={{ y: -20 }}
//         animate={{ y: 0 }}
//       >
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Paramètres Administrateur</h1>
//         <p className="text-gray-600">
//           Configurez les droits d'accès et les permissions pour chaque rôle dans votre application
//         </p>
//       </motion.div>

//       {/* Section de gestion des rôles */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Liste des rôles existants */}
//         <motion.div 
//           className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
//           initial={{ x: -30 }}
//           animate={{ x: 0 }}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 flex items-center">
//               <FiLock className="mr-2 text-orange-500" />
//               Rôles et Permissions
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsAddingRole(!isAddingRole)}
//               className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-md font-medium"
//             >
//               <FiPlus className="mr-2" />
//               Ajouter un rôle
//             </motion.button>
//           </div>

//           <motion.div 
//             className="space-y-6"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             {roles.map((role) => (
//               <motion.div
//                 key={role.id}
//                 variants={itemVariants}
//                 className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-gray-100"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="font-bold text-lg text-gray-800 flex items-center">
//                       {role.name}
//                       {role.id === 'super-admin' && (
//                         <span className="ml-2 px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full">
//                           Super Admin
//                         </span>
//                       )}
//                     </h3>
//                     <p className="text-gray-600 text-sm mt-1">{role.description}</p>
//                   </div>
//                   <div className="flex space-x-2">
//                     {role.id !== 'super-admin' && (
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => handleDeleteRole(role.id)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//                       >
//                         <FiTrash />
//                       </motion.button>
//                     )}
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleEditRole(role.id)}
//                       className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
//                     >
//                       {editingRoleId === role.id ? <FiCheck /> : <FiEdit />}
//                     </motion.button>
//                   </div>
//                 </div>

//                 {editingRoleId === role.id ? (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     className="mt-4"
//                   >
//                     <h4 className="font-medium text-gray-700 mb-3">Permissions:</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       {allPermissions.map(permission => (
//                         <motion.label
//                           key={permission.id}
//                           whileHover={{ scale: 1.02 }}
//                           className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
//                             role.permissions.includes(permission.id)
//                               ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
//                               : 'bg-white border border-gray-200 hover:bg-gray-50'
//                           }`}
//                         >
//                           <input
//                             type="checkbox"
//                             checked={role.permissions.includes(permission.id)}
//                             onChange={() => togglePermission(role.id, permission.id)}
//                             className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
//                             disabled={role.id === 'super-admin'}
//                           />
//                           <span className="ml-3 text-sm text-gray-700">{permission.name}</span>
//                         </motion.label>
//                       ))}
//                     </div>
//                     <div className="flex justify-end mt-4">
//                       <motion.button
//                         whileHover={{ scale: 1.03 }}
//                         whileTap={{ scale: 0.97 }}
//                         onClick={() => setEditingRoleId(null)}
//                         className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium flex items-center"
//                       >
//                         <FiSave className="mr-2" />
//                         Enregistrer
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <div>
//                     <h4 className="font-medium text-gray-700 mb-2">Permissions:</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {role.permissions.map(permissionId => {
//                         const permission = allPermissions.find(p => p.id === permissionId);
//                         return permission ? (
//                           <motion.span
//                             key={permissionId}
//                             whileHover={{ scale: 1.05 }}
//                             className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 text-xs rounded-full shadow-sm"
//                           >
//                             {permission.name}
//                           </motion.span>
//                         ) : null;
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Ajout d'un nouveau rôle et gestion des permissions */}
//         <motion.div 
//           className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
//           initial={{ x: 30 }}
//           animate={{ x: 0 }}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 flex items-center">
//               {isAddingRole ? (
//                 <>
//                   <FiPlus className="mr-2 text-green-500" />
//                   Nouveau Rôle
//                 </>
//               ) : (
//                 <>
//                   <FiUnlock className="mr-2 text-blue-500" />
//                   Permissions Disponibles
//                 </>
//               )}
//             </h2>
//             {!isAddingRole && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsAddingPermission(!isAddingPermission)}
//                 className="flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm"
//               >
//                 <FiPlus className="mr-1" />
//                 {isAddingPermission ? "Annuler" : "Ajouter"}
//               </motion.button>
//             )}
//           </div>

//           {isAddingRole ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="space-y-5"
//             >
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Nom du rôle</label>
//                 <input
//                   type="text"
//                   value={newRole.name}
//                   onChange={(e) => setNewRole({...newRole, name: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Ex: Support Client"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   value={newRole.description}
//                   onChange={(e) => setNewRole({...newRole, description: e.target.value})}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Description du rôle..."
//                   rows="3"
//                 />
//               </div>

//               <div>
//                 <h3 className="font-medium text-gray-700 mb-3">Sélectionnez les permissions:</h3>
//                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//                   {allPermissions.map(permission => (
//                     <motion.label
//                       key={permission.id}
//                       whileHover={{ scale: 1.02 }}
//                       className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
//                         newRole.permissions.includes(permission.id)
//                           ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200'
//                           : 'bg-white border border-gray-200 hover:bg-gray-50'
//                       }`}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={newRole.permissions.includes(permission.id)}
//                         onChange={() => toggleNewRolePermission(permission.id)}
//                         className="h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
//                       />
//                       <span className="ml-3 text-sm text-gray-700">{permission.name}</span>
//                     </motion.label>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex space-x-3">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => setIsAddingRole(false)}
//                   className="flex-1 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg font-medium"
//                 >
//                   Annuler
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={handleAddRole}
//                   className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium flex items-center justify-center"
//                 >
//                   <FiSave className="mr-2" />
//                   Créer le rôle
//                 </motion.button>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="space-y-4"
//             >
//               {isAddingPermission ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-purple-50 rounded-lg p-4 border border-purple-200"
//                 >
//                   <h3 className="font-medium text-purple-800 mb-3">Ajouter une nouvelle permission</h3>
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">ID de la permission</label>
//                     <input
//                       type="text"
//                       value={newPermission.id}
//                       onChange={(e) => setNewPermission({...newPermission, id: e.target.value})}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                       placeholder="Ex: inventory:manage"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Format recommandé: domaine:action</p>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la permission</label>
//                     <input
//                       type="text"
//                       value={newPermission.name}
//                       onChange={(e) => setNewPermission({...newPermission, name: e.target.value})}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                       placeholder="Ex: Gérer l'inventaire"
//                     />
//                   </div>
//                   <div className="flex space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={() => setIsAddingPermission(false)}
//                       className="flex-1 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-md font-medium text-sm"
//                     >
//                       Annuler
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.97 }}
//                       onClick={handleAddPermission}
//                       className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md font-medium text-sm flex items-center justify-center"
//                     >
//                       <FiPlus className="mr-1" />
//                       Ajouter
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Rechercher une permission..."
//                       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <FiSearch className="absolute left-3 top-3 text-gray-400" />
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-4">
//                     Toutes les permissions disponibles dans le système. Sélectionnez celles que vous souhaitez attribuer à un nouveau rôle.
//                   </p>
                  
//                   <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
//                     {filteredPermissions.length === 0 ? (
//                       <div className="text-center py-6 text-gray-500">
//                         Aucune permission trouvée
//                       </div>
//                     ) : (
//                       filteredPermissions.map(permission => (
//                         <motion.div
//                           key={permission.id}
//                           whileHover={{ scale: 1.01 }}
//                           className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden"
//                         >
//                           <div 
//                             className="flex items-center justify-between p-3 cursor-pointer"
//                             onClick={() => togglePermissionExpansion(permission.id)}
//                           >
//                             <div>
//                               <h3 className="font-medium text-gray-800">{permission.name}</h3>
//                               <p className="text-xs text-gray-500 mt-1">ID: {permission.id}</p>
//                             </div>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className="text-gray-500 hover:text-gray-700"
//                             >
//                               {expandedPermissions.includes(permission.id) ? <FiChevronUp /> : <FiChevronDown />}
//                             </motion.button>
//                           </div>
                          
//                           <AnimatePresence>
//                             {expandedPermissions.includes(permission.id) && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: 'auto', opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 className="px-3 pb-3"
//                               >
//                                 <div className="pt-2 border-t border-gray-200">
//                                   <div className="flex justify-between items-center">
//                                     <span className="text-sm text-gray-600">Utilisé dans {roles.filter(r => r.permissions.includes(permission.id)).length} rôle(s)</span>
//                                     <motion.button
//                                       whileHover={{ scale: 1.1 }}
//                                       whileTap={{ scale: 0.9 }}
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleDeletePermission(permission.id);
//                                       }}
//                                       className="text-red-500 hover:text-red-700 p-1"
//                                     >
//                                       <FiTrash />
//                                     </motion.button>
//                                   </div>
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       ))
//                     )}
//                   </div>
//                 </>
//               )}
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* Section d'audit */}
//       <motion.div 
//         className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
//         initial={{ y: 30 }}
//         animate={{ y: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//           <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           Journal d'Activité Administrateur
//         </h2>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               <motion.tr 
//                 className="hover:bg-gray-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Aujourd'hui, 14:32</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Super Admin</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Modification des permissions</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">Ajout de "Gérer la facturation" au rôle Admin</td>
//               </motion.tr>
//               <motion.tr 
//                 className="hover:bg-gray-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hier, 09:15</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Création d'un nouveau rôle</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">Rôle "Support Technique" créé avec 4 permissions</td>
//               </motion.tr>
//               <motion.tr 
//                 className="hover:bg-gray-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 Juil. 2023, 16:45</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Super Admin</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Modification des paramètres système</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">Configuration des limites d'accès pour les managers</td>
//               </motion.tr>
//               <motion.tr 
//                 className="hover:bg-gray-50"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Juil. 2023, 11:20</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Suppression d'un rôle</td>
//                 <td className="px-6 py-4 text-sm text-gray-500">Rôle "Contrôle Qualité" supprimé du système</td>
//               </motion.tr>
//             </tbody>
//           </table>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AdminSettings;













import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSave, FiEdit, FiTrash, FiPlus, FiLock, FiUnlock, FiX, FiCheck, FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';

const AdminSettings = () => {
  // États pour la gestion des rôles et permissions
  const [roles, setRoles] = useState([
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: [
        'dashboard:view',
        'establishments:manage',
        'managers:manage',
        'settings:edit',
        'reports:view',
        'users:manage',
        'roles:manage',
        'analytics:view',
        'billing:manage'
      ]
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Accès à la gestion des établissements et managers',
      permissions: [
        'dashboard:view',
        'establishments:manage',
        'managers:manage',
        'reports:view'
      ]
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Gestion d\'un établissement spécifique',
      permissions: [
        'dashboard:view',
        'orders:manage',
        'menu:manage',
        'reports:view'
      ]
    }
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });
  
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isAddingPermission, setIsAddingPermission] = useState(false);
  const [newPermission, setNewPermission] = useState({ name: '', id: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPermissions, setExpandedPermissions] = useState([]);
  
  // Toutes les permissions disponibles
  const [allPermissions, setAllPermissions] = useState([
    { id: 'dashboard:view', name: 'Voir le tableau de bord' },
    { id: 'establishments:manage', name: 'Gérer les établissements' },
    { id: 'managers:manage', name: 'Gérer les managers' },
    { id: 'orders:manage', name: 'Gérer les commandes' },
    { id: 'menu:manage', name: 'Gérer le menu' },
    { id: 'settings:edit', name: 'Modifier les paramètres' },
    { id: 'reports:view', name: 'Voir les rapports' },
    { id: 'users:manage', name: 'Gérer les utilisateurs' },
    { id: 'roles:manage', name: 'Gérer les rôles' },
    { id: 'analytics:view', name: 'Voir les analyses' },
    { id: 'billing:manage', name: 'Gérer la facturation' },
    { id: 'inventory:manage', name: 'Gérer l\'inventaire' },
    { id: 'reservations:manage', name: 'Gérer les réservations' },
    { id: 'promotions:manage', name: 'Gérer les promotions' }
  ]);

  // Filtrer les permissions en fonction de la recherche
  const filteredPermissions = allPermissions.filter(permission => 
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    permission.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gestion des permissions
  const togglePermission = (roleId, permissionId) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        if (role.permissions.includes(permissionId)) {
          return {
            ...role,
            permissions: role.permissions.filter(p => p !== permissionId)
          };
        } else {
          return {
            ...role,
            permissions: [...role.permissions, permissionId]
          };
        }
      }
      return role;
    }));
  };

  // Gestion de l'ajout de rôle
  const handleAddRole = () => {
    if (!newRole.name.trim()) return;
    
    const role = {
      id: newRole.name.toLowerCase().replace(/\s+/g, '-'),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions
    };
    
    setRoles([...roles, role]);
    setIsAddingRole(false);
    setNewRole({ name: '', description: '', permissions: [] });
  };

  // Gestion de la suppression de rôle
  const handleDeleteRole = (roleId) => {
    if (roleId === 'super-admin') return; // Ne pas supprimer le super admin
    setRoles(roles.filter(role => role.id !== roleId));
  };

  // Gestion de l'édition de rôle
  const handleEditRole = (roleId) => {
    if (editingRoleId === roleId) {
      setEditingRoleId(null);
    } else {
      setEditingRoleId(roleId);
    }
  };

  // Basculer une permission dans le nouveau rôle
  const toggleNewRolePermission = (permissionId) => {
    if (newRole.permissions.includes(permissionId)) {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(p => p !== permissionId)
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    }
  };

  // Ajouter une nouvelle permission
  const handleAddPermission = () => {
    if (!newPermission.name.trim() || !newPermission.id.trim()) return;
    
    // Vérifier si la permission existe déjà
    if (allPermissions.some(p => p.id === newPermission.id)) {
      alert('Une permission avec cet ID existe déjà !');
      return;
    }
    
    setAllPermissions([...allPermissions, {
      id: newPermission.id,
      name: newPermission.name
    }]);
    
    setNewPermission({ name: '', id: '' });
    setIsAddingPermission(false);
  };

  // Supprimer une permission
  const handleDeletePermission = (permissionId) => {
    // Vérifier si la permission est utilisée dans un rôle
    const isUsed = roles.some(role => role.permissions.includes(permissionId));
    
    if (isUsed) {
      alert('Cette permission est utilisée dans un ou plusieurs rôles et ne peut pas être supprimée.');
      return;
    }
    
    setAllPermissions(allPermissions.filter(p => p.id !== permissionId));
    setExpandedPermissions(expandedPermissions.filter(id => id !== permissionId));
  };

  // Toggle l'expansion d'une permission
  const togglePermissionExpansion = (permissionId) => {
    if (expandedPermissions.includes(permissionId)) {
      setExpandedPermissions(expandedPermissions.filter(id => id !== permissionId));
    } else {
      setExpandedPermissions([...expandedPermissions, permissionId]);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div 
        className="mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Paramètres Administrateur</h1>
        <p className="text-gray-600">
          Configurez les droits d'accès et les permissions pour chaque rôle dans votre application
        </p>
      </motion.div>

      {/* Section de gestion des rôles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des rôles existants */}
        <motion.div 
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          initial={{ x: -30 }}
          animate={{ x: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiLock className="mr-2 text-orange-500" />
              Rôles et Permissions
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingRole(!isAddingRole)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-md font-medium"
            >
              <FiPlus className="mr-2" />
              Ajouter un rôle
            </motion.button>
          </div>

          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {roles.map((role) => (
              <motion.div
                key={role.id}
                variants={itemVariants}
                className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 flex items-center">
                      {role.name}
                      {role.id === 'super-admin' && (
                        <span className="ml-2 px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full">
                          Super Admin
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{role.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    {role.id !== 'super-admin' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        aria-label={`Supprimer le rôle ${role.name}`}
                      >
                        <FiTrash />
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEditRole(role.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                      aria-label={`Éditer le rôle ${role.name}`}
                    >
                      {editingRoleId === role.id ? <FiCheck /> : <FiEdit />}
                    </motion.button>
                  </div>
                </div>

                {editingRoleId === role.id ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4"
                  >
                    <h4 className="font-medium text-gray-700 mb-3">Permissions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {allPermissions.map(permission => (
                        <motion.label
                          key={permission.id}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                            role.permissions.includes(permission.id)
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                              : 'bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={role.permissions.includes(permission.id)}
                            onChange={() => togglePermission(role.id, permission.id)}
                            className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                            disabled={role.id === 'super-admin'}
                            aria-label={`${permission.name} - ${role.permissions.includes(permission.id) ? 'Activé' : 'Désactivé'}`}
                          />
                          <span className="ml-3 text-sm text-gray-700">{permission.name}</span>
                        </motion.label>
                      ))}
                    </div>
                    <div className="flex justify-end mt-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setEditingRoleId(null)}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium flex items-center"
                      >
                        <FiSave className="mr-2" />
                        Enregistrer
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Permissions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map(permissionId => {
                        const permission = allPermissions.find(p => p.id === permissionId);
                        return permission ? (
                          <motion.span
                            key={permissionId}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 text-xs rounded-full shadow-sm"
                          >
                            {permission.name}
                          </motion.span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Ajout d'un nouveau rôle et gestion des permissions */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          initial={{ x: 30 }}
          animate={{ x: 0 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              {isAddingRole ? (
                <>
                  <FiPlus className="mr-2 text-green-500" />
                  Nouveau Rôle
                </>
              ) : (
                <>
                  <FiUnlock className="mr-2 text-blue-500" />
                  Permissions Disponibles
                </>
              )}
            </h2>
            {!isAddingRole && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddingPermission(!isAddingPermission)}
                className="flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm"
                aria-label={isAddingPermission ? "Annuler l'ajout de permission" : "Ajouter une permission"}
              >
                <FiPlus className="mr-1" />
                {isAddingPermission ? "Annuler" : "Ajouter"}
              </motion.button>
            )}
          </div>

          {isAddingRole ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du rôle</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ex: Support Client"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Description du rôle..."
                  rows="3"
                />
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Sélectionnez les permissions:</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {allPermissions.map(permission => (
                    <motion.label
                      key={permission.id}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                        newRole.permissions.includes(permission.id)
                          ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={() => toggleNewRolePermission(permission.id)}
                        className="h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                        aria-label={`Sélectionner ${permission.name}`}
                      />
                      <span className="ml-3 text-sm text-gray-700">{permission.name}</span>
                    </motion.label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsAddingRole(false)}
                  className="flex-1 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg font-medium"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddRole}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <FiSave className="mr-2" />
                  Créer le rôle
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {isAddingPermission ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 rounded-lg p-4 border border-purple-200"
                >
                  <h3 className="font-medium text-purple-800 mb-3">Ajouter une nouvelle permission</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID de la permission</label>
                    <input
                      type="text"
                      value={newPermission.id}
                      onChange={(e) => setNewPermission({...newPermission, id: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: inventory:manage"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format recommandé: domaine:action</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la permission</label>
                    <input
                      type="text"
                      value={newPermission.name}
                      onChange={(e) => setNewPermission({...newPermission, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: Gérer l'inventaire"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsAddingPermission(false)}
                      className="flex-1 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-md font-medium text-sm"
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddPermission}
                      className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md font-medium text-sm flex items-center justify-center"
                    >
                      <FiPlus className="mr-1" />
                      Ajouter
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher une permission..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Rechercher une permission"
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    Toutes les permissions disponibles dans le système. Sélectionnez celles que vous souhaitez attribuer à un nouveau rôle.
                  </p>
                  
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredPermissions.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        Aucune permission trouvée
                      </div>
                    ) : (
                      filteredPermissions.map(permission => (
                        <motion.div
                          key={permission.id}
                          whileHover={{ scale: 1.01 }}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 overflow-hidden"
                        >
                          <div 
                            className="flex items-center justify-between p-3 cursor-pointer"
                            onClick={() => togglePermissionExpansion(permission.id)}
                          >
                            <div>
                              <h3 className="font-medium text-gray-800">{permission.name}</h3>
                              <p className="text-xs text-gray-500 mt-1">ID: {permission.id}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-500 hover:text-gray-700"
                              aria-label={`${expandedPermissions.includes(permission.id) ? 'Réduire' : 'Développer'} ${permission.name}`}
                            >
                              {expandedPermissions.includes(permission.id) ? <FiChevronUp /> : <FiChevronDown />}
                            </motion.button>
                          </div>
                          
                          <AnimatePresence>
                            {expandedPermissions.includes(permission.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-3 pb-3"
                              >
                                <div className="pt-2 border-t border-gray-200">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                      Utilisé dans {roles.filter(r => r.permissions.includes(permission.id)).length} rôle(s)
                                    </span>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePermission(permission.id);
                                      }}
                                      className="text-red-500 hover:text-red-700 p-1"
                                      aria-label={`Supprimer ${permission.name}`}
                                    >
                                      <FiTrash />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Section d'audit */}
      <motion.div 
        className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Journal d'Activité Administrateur
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Aujourd'hui, 14:32</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Super Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Modification des permissions</td>
                <td className="px-6 py-4 text-sm text-gray-500">Ajout de "Gérer la facturation" au rôle Admin</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hier, 09:15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Création d'un nouveau rôle</td>
                <td className="px-6 py-4 text-sm text-gray-500">Rôle "Support Technique" créé avec 4 permissions</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 Juil. 2023, 16:45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Super Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Modification des paramètres système</td>
                <td className="px-6 py-4 text-sm text-gray-500">Configuration des limites d'accès pour les managers</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 Juil. 2023, 11:20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Suppression d'un rôle</td>
                <td className="px-6 py-4 text-sm text-gray-500">Rôle "Contrôle Qualité" supprimé du système</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminSettings;