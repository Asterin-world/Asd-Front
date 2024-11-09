import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const ASDCare = () => {

    return (
        <div className="about-asd-care-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="ASD Care" subcategory={''} />
            <div className="container py-10 justify-content">
                <p>Caring for your diamond jewelry is essential to maintain its brilliance and beauty. Here are some simple tips to ensure your precious pieces stay in top condition:</p>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px"}}>REGULAR CLEANING</h3>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Gentle Cleaning Solution:</b> Use a mild soap mixed with warm water. Avoid harsh chemicals.</p></li>
                <li><p><b>Soft Brush:</b> Clean with a soft toothbrush or a microfiber cloth to remove dirt and oils.</p></li>
                <li><p><b>Rinse and Dry:</b> Rinse thoroughly with clean water and dry with a soft cloth.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px"}}>SAFE STORAGE</h3>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Separate Compartments:</b> Store each piece in its own compartment to prevent scratches.</p></li>
                <li><p><b>Jewelry Box:</b> Use a padded jewelry box or soft pouches to protect your diamonds when not worn.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px"}}>AVOID EXPOSURE</h3>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Chemicals:</b> Keep your jewelry away from household cleaners, perfumes, and lotions, as these can damage the metal and dull the diamonds.</p></li>
                <li><p><b>Activities:</b> Remove jewelry before engaging in sports, swimming, or any strenuous activities to avoid damage.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px"}}>PERIODIC INSPECTIONS</h3>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Check Settings:</b> Regularly inspect your jewelry for loose stones or damage. If you notice anything amiss, take it to a professional jeweler for repair.</p></li>
                <li><p><b>Professional Cleaning:</b> Consider having your jewelry professionally cleaned and inspected at least once a year.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px"}}>WEAR WITH CARE</h3>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Put On Last:</b> Put on your jewelry after applying makeup, hair products, and perfume to minimize exposure to chemicals.</p></li>
                <li><p><b>Avoid Heavy Wear:</b> Limit wearing your diamond jewelry during physical activities or when handling rough materials.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px"}}>INSURANCE</h3>
                <ul style={{listStyleType: "disc"}}>
                <li><p><b>Get Insured:</b> Consider insuring your diamond jewelry for added peace of mind. Keep receipts and certificates in a safe place.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                <p>By following these care tips, you can ensure that your diamond jewelry remains as stunning as the day you bought it, allowing you to enjoy its beauty for years to come.</p>
                </div>
            </div>
        </div>
    );
};

export default ASDCare;