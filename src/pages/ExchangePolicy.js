import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const ExchangePolicy = () => {

    return (
        <div className="return-&-exchange-policy-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="Shipping Policy" subcategory={''} />
            <div className="container py-10 justify-content">
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Exchange Policy</h3>
                <p>If you wish to exchange an item you purchased, the process is straightforward! Simply return the item to us within 14 business days from the date of your order. To ensure a smooth exchange, please make sure the item is unused and undamaged. All original labels, packaging, and any accessories that came with the item should also be included. This helps us process your exchange quickly and efficiently.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Returns</h3>
                <p>We want to clarify that we do not offer refunds for any purchases. Instead, you have the option to exchange your product within 14 business days of your purchase. For an exchange to be approved, the item must be in new condition, meaning it has not been worn, used, or damaged in any way. This policy allows us to maintain the quality and integrity of our products while ensuring that our customers receive items that are in perfect condition.</p>
                </div>
                <div className='py-2'>
                <p>If you have any questions about the exchange process or need assistance, feel free to reach out to our customer service team, and we’ll be happy to help!</p>
                </div>
            </div>
        </div>
    );
};

export default ExchangePolicy;