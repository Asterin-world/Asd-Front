import React from 'react';
import Banner from '../components/CategoryBanner/Banner';


const PrivacyPolicy = () => {

    return (
        <div className="privacy-policy-page">
            {/* Dynamic Banner for the Product List Page */}
            <Banner category="Privacy Policy" subcategory={''} />
            <div className="container py-10 justify-content">
                <p>At AprilShine Diamond, we prioritize your trust and are dedicated to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, and safeguard the data you provide when visiting our website.</p>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Changes to the Privacy Policy</h3>
                <p>Please be aware that this Privacy Policy may change without prior notice. We encourage you to review it periodically to stay updated on how we protect your privacy.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Collection of Personal Information</h3>
                <p>When you create an account on aprilshinediamond.com, we collect personal information such as your name, email address, contact number, and other relevant details with your consent. This information is used to set up your account and enable you to place orders. Additionally, we may use your contact details to inform you about exclusive offers based on your previous orders and interests.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Use of Information</h3>
                <p>We utilize the personal information you provide to fulfill your service requests, troubleshoot issues, conduct surveys, and share information about our latest offers. We may also analyze demographic data to better understand user activity on our site and use IP addresses to diagnose any technical problems.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Disclosure of Personal Data</h3>
                    <ul style={{listStyleType: "disc"}}>
                <li><p>To enhance our services, we may collaborate with third-party entities. These parties assist us with tasks like maintenance, analysis, marketing, and development. They are granted limited access to your information solely for these purposes and are required to comply with strict confidentiality standards and data protection regulations.</p></li>
                <li><p>When using our application, you will need to acknowledge and accept both the third-party developer user agreement and AprilShine Diamond's privacy policy.</p></li>
                <li><p> In certain situations, we may need to disclose your information to comply with legal obligations, respond to legal processes, verify compliance with our service policies, or protect the rights, property, or safety of AprilShine Diamond, our affiliates, business partners, or customers. Such disclosures will be made in accordance with applicable laws, with a strong emphasis on protecting your privacy.</p></li>
                </ul>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Security Precautions</h3>
                <p>We have implemented robust security measures to safeguard your information from loss, alteration, and misuse. Our website uses secure servers to protect your personal account details, and we follow strict security protocols to prevent unauthorized access.</p>
                </div>
                <div className='py-2'>
                    <h3 style={{marginBottom: "20px", textTransform: 'uppercase'}}>Choice/Opt-Out</h3>
                <p>After setting up an account, you have the option to opt-out of promotional and marketing communications from us and our partners. You can manage your communication preferences through your account settings.</p>
                </div>
                <div className='py-2'>
                <p>At AprilShine Diamond, we are committed to protecting your privacy. If you have any questions or concerns regarding how we handle your personal data, please reach out to us at <b>aprilshined@gmail.com</b></p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
