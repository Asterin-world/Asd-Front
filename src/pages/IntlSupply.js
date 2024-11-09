import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const IntlSupply = () => {

    return (
        <div className="international-supply-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="International Supply" subcategory={''} />
            <div className="container py-10 justify-content">
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>What are the shipping charges on International orders?</h3>
                <p>table</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Understanding International Duties and Taxes</h3>
                <p>Shipping costs include all applicable duties and taxes. If you’re asked to pay extra charges upon delivery, please reach out to us at <b>aprilshined@gmail.com</b></p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Payment Options at ASD</h3>
                <p>We accept various payment methods, including credit cards, debit cards, UPI, and PayPal.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Can I Cancel My International Order?</h3>
                <p>Unfortunately, international orders cannot be canceled once placed. However, we may consider cancellation requests at our discretion.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Return Policy</h3>
                <p>You can return your jewelry within 30 days of delivery. To be eligible for a return, the item must be unused and returned with the original invoice and packaging. Please send the product, packaging, and invoice to:</p>
                <p>1902-F, Granteck Center, No.8 On Ping Street, Shatin, N.T., Hong Kong.</p>
                </div>
                <div className='py-2'>
                <p>After our quality check, refunds will be processed within 15 days, minus any applicable fees and duties.</p>
                </div>
            </div>
        </div>
    );
};

export default IntlSupply;
