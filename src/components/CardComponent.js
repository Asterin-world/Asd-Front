import React from 'react';

const CardComponent = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center mx-4 my-6">
      <img src={image} alt={title} className="w-60 h-60 object-contain" style={{backgroundColor:'#F8F8F8'}}/>
      <p className="mt-4 text-lg font-medium text-gray-900">{title}</p>
    </div>
  );
};

export default CardComponent;
