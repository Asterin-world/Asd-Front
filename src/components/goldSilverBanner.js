import React from 'react';
import GoldImage from './../assets/gold-banner.png';
import SilverImage from './../assets/silver-banner.png';

const GoldSilverBanner = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 container p-0 mx-auto">
            <div className="relative">
                <img src={GoldImage} alt="Diamond Embedded Gold" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">Diamond Embedded Gold</h2>
                    <button className="py-2 mt-2 text-white">Shop Now</button>
                </div>
            </div>
            <div className="relative">
                <img src={SilverImage} alt="Diamond Embedded Silver" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">Diamond Embedded Silver</h2>
                    <button className=" py-2 mt-2 text-white">Shop Now</button>
                </div>
            </div>
        </div>
    );
};

export default GoldSilverBanner;