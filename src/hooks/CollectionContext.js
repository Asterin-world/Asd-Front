import React, { createContext, useContext } from 'react';

// Create the context
const CollectionContext = createContext();
// In a separate file like imagePaths.js
 const mensImages = {
    watch: require('./../assets/asd_collections/m_watch.png'),
    glasses: require('./../assets/asd_collections/m_glasses.png'),
    bracelet: require('./../assets/asd_collections/m_bracelet.png'),
    pendant: require('./../assets/asd_collections/m_pendant.png'),
    ring: require('./../assets/asd_collections/m_ring.png'),
    earring: require('./../assets/asd_collections/m_earring.png'),
    braces: require('./../assets/asd_collections/m_braces.png')
  };
  
 const womensImages = {
    watch: require('./../assets/asd_collections/w_watch.png'),
    glasses: require('./../assets/asd_collections/w_glasses.png'),
    bracelet: require('./../assets/asd_collections/w_bracelet.png'),
    pendant: require('./../assets/asd_collections/w_pendant.png'),
    necklace: require('./../assets/asd_collections/w_necklace.png'),
    ring: require('./../assets/asd_collections/w_ring.png'),
    earring: require('./../assets/asd_collections/w_earring.png')
  };
  

// Mens and Womens collection data
const mensCollection = [
  { image: mensImages.watch, title: 'Watch', subCategoryType: 'watches' },
  { image: mensImages.glasses, title: 'Glasses', subCategoryType: 'glasses' },
  { image: mensImages.bracelet, title: 'Bracelet', subCategoryType: 'bracelet' },
  { image: mensImages.pendant, title: 'Chain & Pendant', subCategoryType: 'pendant' },
  { image: mensImages.ring, title: 'Ring', subCategoryType: 'ring' },
  { image: mensImages.earring, title: 'Earring', subCategoryType: 'earrings' },
  { image: mensImages.braces, title: 'Braces', subCategoryType: 'braces' }
];

const womensCollection = [
  { image: womensImages.watch, title: 'Watch', subCategoryType: 'watches' },
  { image: womensImages.glasses, title: 'Glasses', subCategoryType: 'glasses' },
  { image: womensImages.bracelet, title: 'Bracelet', subCategoryType: 'bracelet' },
  { image: womensImages.pendant, title: 'Pendant', subCategoryType: 'pendant' },
  { image: womensImages.necklace, title: 'Necklace', subCategoryType: 'necklace' },
  { image: womensImages.ring, title: 'Ring', subCategoryType: 'ring' },
  { image: womensImages.earring, title: 'Earring', subCategoryType: 'earrings' }
];

// Context Provider Component
export const CollectionProvider = ({ children }) => {
  const collections = { mensCollection, womensCollection };
  
  return (
    <CollectionContext.Provider value={collections}>
      {children}
    </CollectionContext.Provider>
  );
};

// Custom hook for using collection context
export const useCollection = () => useContext(CollectionContext);
