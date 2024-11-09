import React from 'react';
// import './AtYourService.css'; // Custom CSS (optional)

const servicesImages = {
  shipping : require('./../assets/at-service-logo/delivery-truck.png'),
  diamond : require('./../assets/at-service-logo/value.png'),
  deliveryInHand : require('./../assets/at-service-logo/delivery-in-hand.png'),
  resize: require('./../assets/at-service-logo/resize.png'),
  giftBox: require('./../assets/at-service-logo/gift-box.png'),
  giftCard: require('./../assets/at-service-logo/gift-card.png')
}

const services = [
  {
    id: 1,
    icon: <img src={servicesImages.shipping} alt="Free Shipping" className="w-24" />,
    title: 'Free Shipping',
  },
  {
    id: 2,
    icon: <img src={servicesImages.diamond} alt="100% Certified Diamonds" className="w-24" />,
    title: '100% Certified Diamonds',
  },
  {
    id: 3,
    icon: <img src={servicesImages.deliveryInHand} alt="Order Online, Grab In Store" className="w-24" />,
    title: 'Order Online, Grab In Store',
  },
  {
    id: 4,
    icon: <img src={servicesImages.resize} alt="Free Resizing" className="w-24" />,
    title: 'Free Resizing',
  },
  {
    id: 5,
    icon: <img src={servicesImages.giftBox} alt="Complimentary Gift Box" className="w-24" />,
    title: 'Complimentary Gift Box',
  },
  {
    id: 6,
    icon: <img src={servicesImages.giftCard} alt="Gift Cards for Any Occasion" className="w-24" />,
    title: 'Gift Cards for Any Occasion',
  },
];

const AtService = () => {
  return (
    <section className="at-your-service text-center py-5">
      <div className="container">
      <h2 className="fw-bold">At Your Service</h2>
      <div className="w-12 h-1 mb-4 mx-auto" style={{ backgroundColor: '#B37E56' }}></div>
        <div className="row">
          {services.map((service) => (
            <div key={service.id} className="col-6 col-md-4 col-lg-2 mb-4">
            <div className="d-flex flex-column align-items-center">
              <div className="service-icon mb-3">{service.icon}</div>
              <p className="service-title">{service.title}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtService;
