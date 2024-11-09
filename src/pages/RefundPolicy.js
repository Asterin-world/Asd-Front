import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const RefundPolicy = () => {

    return (
        <div className="refund-policy-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="Shipping Policy" subcategory={''} />
            <div className="container py-10 justify-content">
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Exchange Policy</h3>
                <p>If you’d like to exchange an item you purchased, the process is simple and hassle-free! Just follow these steps:</p>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Return Window:</b> You have 14 business days from the date of your order to initiate an exchange. This gives you ample time to decide if the item meets your expectations.</p></li>
                <li><p><b>Condition of the Item:</b> To qualify for an exchange, the item must be unused and undamaged. This means it should not show any signs of wear or be altered in any way.</p></li>
                <li><p><b>Original Packaging:</b> Please ensure that all original labels, tags, and packaging are included with your return. This is important as it helps us process your exchange quickly and ensures that the item is in the same condition as when it was received.</p></li>
                <li><p><b>How to Proceed:</b> To initiate the exchange, simply package the item securely and send it back to us. You can contact our customer service for the return address and any additional instructions.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Important Note on Returns</h3>
                <p>We want to clarify our refund policy: we do not offer refunds for any items purchased. Instead, we only facilitate exchanges. This means that if you decide the item isn't suitable for you, you can exchange it for another item of equal value or for a different style, as long as it adheres to the conditions outlined above.</p>
                <p>By having this exchange-only policy, we aim to maintain high-quality standards for all our products while ensuring customer satisfaction. If you have further questions about the exchange process or need assistance, please don’t hesitate to reach out to our customer service team. We’re here to help!</p>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;