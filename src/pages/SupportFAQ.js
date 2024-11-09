import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const ASDSupport = () => {

    return (
        <div className="about-support-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="Support" subcategory={''} />
            <div className="container py-10 justify-content">
                <p>Welcome to AprilShine Support!</p>
            </div>
        </div>
    );
};

export default ASDSupport;
