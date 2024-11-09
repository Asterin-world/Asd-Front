import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const AboutASD = () => {

    return (
        <div className="about-asd-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="ABOUT ASD" subcategory={''} />
            <div className="container py-10 justify-content">
                <p>Welcome to AprilShine Diamond!</p>
                <p>At AprilShine Diamond, we are passionate about creating exquisite diamond jewellery that reflects your unique style and personality. Established in 2015, we began our journey by cutting and polishing natural diamonds, respecting our craftsmanship and expertise in the art of diamond creation.</p>
                <p>In 2018, we expanded our vision to include the manufacturing of stunning diamond jewellery. Our mission is to provide our customers with beautifully crafted pieces that not only enhance their individual style but also create lasting memories. We believe that every piece of jewellery should be as unique as the person wearing it.</p>
                <p>Sourcing our rough diamonds primarily from Australia and Africa, we ensure that each gem is of the highest quality. Our state-of-the-art factory in Surat, Gujarat, India, is where we cut, polish, and bring these diamonds to life, transforming them into timeless treasures.</p>
                <p>At AprilShine Diamond, we prioritize quality and authenticity. For diamonds ranging from 0.8mm to 4.00mm, we provide jewellery certificates, while diamonds over 4.00mm come with GIA certification, giving you peace of mind in your purchase.</p>
                <p>We invite you to explore our collection and discover the perfect piece that resonates with you. Join us on this sparkling journey, where elegance meets individuality, and let AprilShine Diamond help you shine bright.</p>
                <p>Thank you for choosing us to be a part of your story!</p>
            </div>
        </div>
    );
};

export default AboutASD;
