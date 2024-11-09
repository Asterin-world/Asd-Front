import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const ShippingPolicy = () => {

    return (
        <div className="about-asd-care-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="Shipping Policy" subcategory={''} />
            <div className="container py-10 justify-content">
                <p>Your shipment will be delivered by FedEx within 7 to 10 business days, depending on the postal service times and customs regulations in your country.</p>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Return and Exchange Policy</h3>
                <p><b>Exchanges:</b> To exchange an item, simply return it within 14 business days from the order date. Ensure the item is unused, undamaged, and includes all original tags.</p>
                <p><b>Returns:</b> Please note that we do not offer refunds. Instead, you can exchange your product within 14 business days of purchase. The returned item must be unused and undamaged.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>What to Do if You Receive the Wrong Item</h3>
                <p>Before signing for your package, check that the product is correct. If you receive the wrong item, please refuse the delivery and contact us during business hours. We’ll send you the correct item at no extra cost.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Issues During Transportation</h3>
                <p>If your shipment is affected by uncontrollable circumstances, please reach out during working hours, and we will arrange for a replacement as soon as possible.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Problems After Receipt</h3>
                <p>If you notice any damage upon receiving your package, refuse the delivery and contact us during business hours for assistance.</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;