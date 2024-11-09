import React from 'react';
import { Link } from 'react-router-dom';
import CardComponent from './CardComponent';
import { useCollection } from './../hooks/CollectionContext';

const CollectionComponent = ({ collectionTitle, collectionType, collectionCategory }) => {
  const collections = useCollection();  // Access collections from context
  const collectionItems = collections[collectionType];  // Get the correct collection based on type
  const collectionSubTitle = collectionCategory === "mens" ? "Unleash Your Style with Diamonds for Men." : "Dazzle Every Day with Women's Diamond Pieces.";
  return (
    <section className="mt-5 text-center px-4">
      <h2 className="text-3xl font-semibold text-gray-900">{collectionTitle}</h2>
      <p className='text-xl fs-6' style={{ color: '#444444'}}>{collectionSubTitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 justify-items-center">
        {collectionItems.map((item, index) => (
          <Link key={index} className="dropdown-item" to={`/products/${collectionCategory}/${(item.subCategoryType).toLowerCase()}`}>
            <CardComponent image={item.image} title={item.title} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionComponent;
