import React, {useEffect} from 'react';
import './../assets/ASD-logo.png'
const TestimonialsBanner = () => {
    const testimonials = [
        {
            name: "Michael C.",
            image: 'https://s3-alpha-sig.figma.com/img/b212/1383/48287dc79e913a19965ce7140c70b751?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PmJnntUukMokgfEinL7TxsFH-3FJrw9cayYKYLZ8Bx4wK2OUNxIUv9u0A4QjEIPX1VIoqeWwhGAHBe0e-BDxdh08qtTA85HQg1phJ5-SAmjDSjSijtDIOh-oE56A0impWtlXPSsymn2dV2MWX-aopt-3K0ueOJAhqmIAKo510DOF5CXv02KH3RsMWhhbxd9uZXeyjb7sjddga1VzpleScqVP2OZ6GP2Sd-UqFR7tuHz9Fvt6vJqlGI1iyLktMOIaKwjv-PXERBulB4u7Fvbkocun9SIMlJ8przEHsQU6qV7Ai9teyAvtuZHWkujk7NwcSKylbIdSJxkgwxNqodXVOA__',
            rating: 5,
            text: "Helpful, informative, and affordable, Clean Origin is the place to go for my Cuban chain.",
        },
        {
            name: "Champo M.",
            image: 'https://s3-alpha-sig.figma.com/img/6653/37e6/ba5617927127d7e495f01205275419d5?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LktvAhmaWWK9VqINsXe387366M~mYHq209iJPolQBm-TsSR6Hh9Y~UZMYyofcuT5LrXSgyuX3TUhHCHNDwlhjHqJUHQgU9KBo30WidPwVV3GWjaiFeyQywMzHPg51gTpe36CTcM1FHK3eInCNfDFyRGDA8e6NvN9ZL-zmmi-by5-P3795H0SzVhPcVwqvjSmFSXBPVokvFYfqnZFMwQTS6awktujKeSBGR8dlH2ZTB3ydb8MqMR2yBtdx~hD0VJgnR8zYQP~Zv27W2Uw0Wx2m47bQLEeEbqxFVNmTeNqZossxtLltK27wTSMdZIMBAOszs7BRJBsP7QMt6GGyYgiVQ__',
            rating: 3,
            text: "The tennis necklace is AMAZING. It's an eye catcher for everyone. Extremely well made and I very love it.",
        },
        {
            name: "Alex O.",
            image: 'https://s3-alpha-sig.figma.com/img/6653/37e6/ba5617927127d7e495f01205275419d5?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LktvAhmaWWK9VqINsXe387366M~mYHq209iJPolQBm-TsSR6Hh9Y~UZMYyofcuT5LrXSgyuX3TUhHCHNDwlhjHqJUHQgU9KBo30WidPwVV3GWjaiFeyQywMzHPg51gTpe36CTcM1FHK3eInCNfDFyRGDA8e6NvN9ZL-zmmi-by5-P3795H0SzVhPcVwqvjSmFSXBPVokvFYfqnZFMwQTS6awktujKeSBGR8dlH2ZTB3ydb8MqMR2yBtdx~hD0VJgnR8zYQP~Zv27W2Uw0Wx2m47bQLEeEbqxFVNmTeNqZossxtLltK27wTSMdZIMBAOszs7BRJBsP7QMt6GGyYgiVQ__', // Replace with the correct image path
            rating: 5,
            text: "Thank you for giving us everything we were looking for to make the absolute perfect chain!",
        },
        {
            name: "Jane D.",
            image: 'https://s3-alpha-sig.figma.com/img/6653/37e6/ba5617927127d7e495f01205275419d5?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LktvAhmaWWK9VqINsXe387366M~mYHq209iJPolQBm-TsSR6Hh9Y~UZMYyofcuT5LrXSgyuX3TUhHCHNDwlhjHqJUHQgU9KBo30WidPwVV3GWjaiFeyQywMzHPg51gTpe36CTcM1FHK3eInCNfDFyRGDA8e6NvN9ZL-zmmi-by5-P3795H0SzVhPcVwqvjSmFSXBPVokvFYfqnZFMwQTS6awktujKeSBGR8dlH2ZTB3ydb8MqMR2yBtdx~hD0VJgnR8zYQP~Zv27W2Uw0Wx2m47bQLEeEbqxFVNmTeNqZossxtLltK27wTSMdZIMBAOszs7BRJBsP7QMt6GGyYgiVQ__',
            rating: 5,
            text: "Absolutely stunning quality and timely service.",
        },
        {
            name: "John S.",
            image: 'https://s3-alpha-sig.figma.com/img/6653/37e6/ba5617927127d7e495f01205275419d5?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LktvAhmaWWK9VqINsXe387366M~mYHq209iJPolQBm-TsSR6Hh9Y~UZMYyofcuT5LrXSgyuX3TUhHCHNDwlhjHqJUHQgU9KBo30WidPwVV3GWjaiFeyQywMzHPg51gTpe36CTcM1FHK3eInCNfDFyRGDA8e6NvN9ZL-zmmi-by5-P3795H0SzVhPcVwqvjSmFSXBPVokvFYfqnZFMwQTS6awktujKeSBGR8dlH2ZTB3ydb8MqMR2yBtdx~hD0VJgnR8zYQP~Zv27W2Uw0Wx2m47bQLEeEbqxFVNmTeNqZossxtLltK27wTSMdZIMBAOszs7BRJBsP7QMt6GGyYgiVQ__',
            rating: 4,
            text: "Exceptional craftsmanship and affordable prices.",
        },
        {
            name: "Emma P.",
            image: 'https://s3-alpha-sig.figma.com/img/a19f/8c66/d4916ea64483e0b6f8afc8c0447d379d?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y~ogtly34OspHWxB3N7CnSkGFrHrtpKLNx2takQqe4brc6IwRovlaj7YC4sgTzbQERF9r5ltpb8L6Eo9X78IZiwlLTaJQdFHbguQ8BhVsPPb9ZwkJVmEDIp4wZ6SMIVwFlKw-NODY2pJf7Yeg5svZtyAS-dC2tkII802N2qGH23cuKFO4RR-770MmSf3TGMCADlwGuDZwyf-8sGETIx4rDntVnsfoSb01ivMYzeRJ6UjZtdfMsFcyKQBRAKw5d06ppkiHz37GHC~v7VqpMqWMshf6OWtn79LL0iQD2HgUT-Znr-ShcwRhy~SYKs5XwC1ddoMdky0IBmaExYl-NSWVg__', // Replace with the correct image path
            rating: 5,
            text: "A beautiful collection that exceeded my expectations.",
        },        {
            name: "Michael C.",
            image: 'https://s3-alpha-sig.figma.com/img/6653/37e6/ba5617927127d7e495f01205275419d5?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LktvAhmaWWK9VqINsXe387366M~mYHq209iJPolQBm-TsSR6Hh9Y~UZMYyofcuT5LrXSgyuX3TUhHCHNDwlhjHqJUHQgU9KBo30WidPwVV3GWjaiFeyQywMzHPg51gTpe36CTcM1FHK3eInCNfDFyRGDA8e6NvN9ZL-zmmi-by5-P3795H0SzVhPcVwqvjSmFSXBPVokvFYfqnZFMwQTS6awktujKeSBGR8dlH2ZTB3ydb8MqMR2yBtdx~hD0VJgnR8zYQP~Zv27W2Uw0Wx2m47bQLEeEbqxFVNmTeNqZossxtLltK27wTSMdZIMBAOszs7BRJBsP7QMt6GGyYgiVQ__',
            rating: 4.5,
            text: "Helpful, informative, and affordable, Clean Origin is the place to go for my Cuban chain.",
        },
        {
            name: "Champo M.",
            image: 'https://s3-alpha-sig.figma.com/img/6653/37e6/ba5617927127d7e495f01205275419d5?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LktvAhmaWWK9VqINsXe387366M~mYHq209iJPolQBm-TsSR6Hh9Y~UZMYyofcuT5LrXSgyuX3TUhHCHNDwlhjHqJUHQgU9KBo30WidPwVV3GWjaiFeyQywMzHPg51gTpe36CTcM1FHK3eInCNfDFyRGDA8e6NvN9ZL-zmmi-by5-P3795H0SzVhPcVwqvjSmFSXBPVokvFYfqnZFMwQTS6awktujKeSBGR8dlH2ZTB3ydb8MqMR2yBtdx~hD0VJgnR8zYQP~Zv27W2Uw0Wx2m47bQLEeEbqxFVNmTeNqZossxtLltK27wTSMdZIMBAOszs7BRJBsP7QMt6GGyYgiVQ__',
            rating: 5,
            text: "The tennis necklace is AMAZING. It's an eye catcher for everyone. Extremely well made and I very love it.",
        },
        {
            name: "Alex O.",
            image: 'https://s3-alpha-sig.figma.com/img/a19f/8c66/d4916ea64483e0b6f8afc8c0447d379d?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y~ogtly34OspHWxB3N7CnSkGFrHrtpKLNx2takQqe4brc6IwRovlaj7YC4sgTzbQERF9r5ltpb8L6Eo9X78IZiwlLTaJQdFHbguQ8BhVsPPb9ZwkJVmEDIp4wZ6SMIVwFlKw-NODY2pJf7Yeg5svZtyAS-dC2tkII802N2qGH23cuKFO4RR-770MmSf3TGMCADlwGuDZwyf-8sGETIx4rDntVnsfoSb01ivMYzeRJ6UjZtdfMsFcyKQBRAKw5d06ppkiHz37GHC~v7VqpMqWMshf6OWtn79LL0iQD2HgUT-Znr-ShcwRhy~SYKs5XwC1ddoMdky0IBmaExYl-NSWVg__', // Replace with the correct image path
            rating: 4,
            text: "Thank you for giving us everything we were looking for to make the absolute perfect chain!",
        },
    ];

    useEffect(() => {
        // Select the carousel element using its ID
        const carouselElement = document.querySelector('#testimonialCarousel');
    
        // Check if the carousel element is found
        if (carouselElement) {
          // Initialize the Bootstrap carousel
        //   const bootstrapCarousel = new window.bootstrap.Carousel(carouselElement, {
        //     interval: 3000, // Set auto-slide interval in milliseconds (3 seconds)
        //     ride: 'carousel', // Auto-start the carousel
        //     wrap: true, // Continuously loop through the slides
        //   });
        }
      }, []);

    return (
        <div className="my-5 position-relative">
            <h2 className="text-center">TESTIMONIALS</h2>
            <div className="w-12 h-1 mb-4 mx-auto" style={{ backgroundColor: '#B37E56' }}></div>
            <div
                id="testimonialCarousel"
                className="carousel slide position-relative"
                data-bs-ride="carousel"
                data-bs-interval="5000"   // Auto-slide every 3 seconds
            >
                <div className="carousel-inner" style={{ height: '300px' }}>
                    {/* First Slide */}
                    <div className="carousel-item active">
                        <div className="row">
                            {testimonials.slice(0, 3).map((testimonial, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card rounded-0 text-center p-3">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="rounded-circle mx-auto mb-3"
                                            style={{ width: "80px", height: "80px" }}
                                        />
                                        <h5>{testimonial.name}</h5>
                                        <div className="text-warning">
                                            {"⭐".repeat(testimonial.rating)}
                                        </div>
                                        <p className="mt-3">{testimonial.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Slide */}
                    <div className="carousel-item">
                        <div className="row">
                            {testimonials.slice(3, 6).map((testimonial, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card rounded-0 text-center p-3">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="rounded-circle mx-auto mb-3"
                                            style={{ width: "80px", height: "80px" }}
                                        />
                                        <h5>{testimonial.name}</h5>
                                        <div className="text-warning">
                                            {"⭐".repeat(testimonial.rating)}
                                        </div>
                                        <p className="mt-3">{testimonial.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Third Slide */}
                    <div className="carousel-item">
                        <div className="row">
                            {testimonials.slice(6, 9).map((testimonial, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card rounded-0 text-center p-3">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="rounded-circle mx-auto mb-3"
                                            style={{ width: "80px", height: "80px" }}
                                        />
                                        <h5>{testimonial.name}</h5>
                                        <div className="text-warning">
                                            {"⭐".repeat(testimonial.rating)}
                                        </div>
                                        <p className="mt-3">{testimonial.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Carousel Controls Positioned Outside and Centered */}
                <button
                    className="carousel-control-prev d-flex justify-content-center align-items-center position-absolute"
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide="prev"
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        top: "40%",
                        transform: "translateY(-50%)",
                        left: "-100px", // Adjust to place outside the carousel
                    }}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next d-flex justify-content-center align-items-center position-absolute"
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide="next"
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        top: "40%",
                        transform: "translateY(-50%)",
                        right: "-100px", // Adjust to place outside the carousel
                    }}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

                {/* Carousel Indicators */}
                <ol className="carousel-indicators" style={{top: '95%'}}>
                    <li
                        data-bs-target="#testimonialCarousel"
                        data-bs-slide-to="0"
                        className="active"
                        style={{ backgroundColor: "black" }}
                    ></li>
                    <li data-bs-target="#testimonialCarousel" data-bs-slide-to="1" style={{ backgroundColor: "black" }}></li>
                    <li data-bs-target="#testimonialCarousel" data-bs-slide-to="2" style={{ backgroundColor: "black" }}></li>
                </ol>
            </div>
        </div>
    );
};


export default TestimonialsBanner;