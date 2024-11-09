import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  PayPalScriptProvider,
  PayPalCardFieldsProvider,
  PayPalButtons,
  PayPalCardFieldsForm,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import { useCart } from '../hooks/CartContext';
import { Button, Row, Col } from 'react-bootstrap';
import image1 from '../assets/asd_collections/m_watch.png'; // Placeholder image

const Checkout = () => {
  const { state, dispatch, handleRemoveItem } = useCart();
  const { register, handleSubmit, formState: { errors, isValid }, getValues, watch } = useForm({
    mode: "onChange", // Ensures validation triggers on input changes
  });
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CreditCard'); // Track selected payment method
  const [useShippingAddress, setUseShippingAddress] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  // Watch form inputs to enable/disable buttons dynamically
  const formValues = watch();
  const initialOptions = {
    "client-id":
      "AdLZnXVNA7A5URKfhmc9FdeBv6xd9ksuZDYlKmVdoTJ5EghohU9clAYfG4jpgE-dplf__zqGdtZrAAC9",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons,hosted-fields,card-fields",
    "data-sdk-integration-source": "developer-studio",
  };
  const totalPrice = state.items.reduce((total, item) => total + (item.isOnSale ? item.salePrice : item.price) * item.quantity, 0);
  const totalSavings = state.items.reduce(
    (total, item) => total + (item.isOnSale ? (item.price - item.salePrice) * item.quantity : 0),
    0
  );
  // Create the order for PayPal
  async function createOrder(data, actions) {
    const formData = getValues(); // Get form data
    console.log(formData);
    const cartItems = state.items.map((item) => ({
      name: item.title,
      sku: item.product_id,
      unit_amount: {
        value: item.isOnSale ? item.salePrice.toFixed(2) : item.price.toFixed(2),
        currency_code: "USD",
      },
      quantity: item.quantity,
      description: `Item ID: ${item.product_id} , Description: ${item.description} \n`,
    }));

    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          items: cartItems,
          amount: {
            value: totalPrice.toFixed(2),
            breakdown: {
              item_total: {
                value: totalPrice.toFixed(2),
                currency_code: "USD",
              },
            },
          },
          shipping: {
            name: {
              full_name: `${formData.firstName} ${formData.lastName}`,
            },
            address: {
              address_line_1: formData.address,
              admin_area_2: formData.city,
              admin_area_1: formData.state,
              postal_code: formData.zipCode,
              country_code: formData.country,
            },
          },
        },
      ],
      payer: {
        email_address: formData.email,
        name: {
          given_name: formData.firstName,
          surname: formData.lastName,
        },
        address: {
          address_line_1: formData.billingAddress || formData.address,
          admin_area_2: formData.billingCity || formData.city,
          admin_area_1: formData.billingState || formData.state,
          postal_code: formData.billingPinCode || formData.zipCode,
          country_code: formData.billingCountry || formData.country,
        },
      },
    });
  }

  // PayPal approval logic
  async function onApprove(data, actions) {
    return actions.order.capture().then((details) => {
      setIsPaid(true);
      // alert(`Transaction completed by ${details.payer.name.given_name}`);
    });
  }

  const onSubmit = (data) => {
    if (paymentMethod === 'CreditCard') {
      handleCardPayment();
    }
  };

  // Disable buttons until form is fully valid
  useEffect(() => {
    const checkValidity = () => {
      return isValid;
    };
    return () => {
      checkValidity();
    };
  }, [isValid, formValues]);

  const handleCardPayment = () => {
    // Call PayPal's card processing API here
    // paypalDispatch({
    //   type: "card-fields",
    //   value: {
    //     createOrder: (data, actions) => {
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: totalPrice.toFixed(2),
    //             },
    //           },
    //         ],
    //       });
    //     },
    //     onApprove: (data, actions) => {
    //       return actions.order.capture().then((details) => {
    //         setIsPaid(true);
    //         alert(`Transaction completed by ${details.payer.name.given_name}`);
    //       });
    //     },
    //   },
    // });
  };
  const toggleBillingAddress = () => setUseShippingAddress(!useShippingAddress);
  const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }) => {
    const { cardFieldsForm, fields } = usePayPalCardFields();

    const handleClick = async () => {
      if (!cardFieldsForm) {
        const childErrorMessage =
          "Unable to find any child components in the <PayPalCardFieldsProvider />";

        throw new Error(childErrorMessage);
      }
      const formState = await cardFieldsForm.getState();

      if (!formState.isFormValid) {
        return alert("The payment form is invalid");
      }
      setIsPaying(true);

      cardFieldsForm.submit({ billingAddress }).finally((err) => {
        setIsPaying(false);
      });
    };

    return (
      <button
        className={isPaying ? "btn" : "btn btn-primary"}
        onClick={handleClick}
      >
        {isPaying ? <div className="spinner tiny" /> : "Pay"}
      </button>
    );
  };


  const validateFormBeforePayment = async (actions) => {
    // Trigger form validation
    const isValid = await handleSubmit(onSubmit)();

    if (!isValid) {
      console.log("Form has validation errors");
      return false;
    }

    return true;
  };

  return (

    <PayPalScriptProvider options={initialOptions}>
      <div className="container" style={{ padding: '30px' }}>
        <div className="row">
          {/* Left Side: Checkout Form */}
          <div className="col-lg-7 col-md-12 mb-4">
            <h2 style={{ marginBottom: '30px' }}>Checkout</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Contact Section */}
              <div className="mb-4">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" {...register("subscribe")} />
                  <label className="form-check-label">Email me with news and offers</label>
                </div>
              </div>

              {/* Delivery Section */}
              <h3 style={{ marginBottom: '20px' }}>Delivery</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label>Address</label>
                <input
                  type="text"
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>City</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    {...register("city", { required: "City is required" })}
                  />
                  {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label>State</label>
                  <input
                    type="text"
                    className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                    {...register("state", { required: "State is required" })}
                  />
                  {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Country</label>
                  <input
                    type="text"
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    {...register("country", { required: "Country is required" })}
                  />
                  {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label>ZIP/Postal Code</label>
                  <input
                    type="text"
                    className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                    {...register("zipCode", { required: "ZIP/Postal Code is required" })}
                  />
                  {errors.zipCode && <div className="invalid-feedback">{errors.zipCode.message}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  {...register("phone", { required: "Phone number is required", pattern: /^[0-9]{10}$/ })}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
              </div>
              {/* Checkbox to use Shipping Address as Billing Address */}
              <div className="mb-4">
                <input
                  type="checkbox"
                  {...register("useShippingAddress")}
                  onChange={toggleBillingAddress}
                />
                <label style={{ marginLeft: '8px' }}>Use shipping address as billing address</label>
              </div>

              {!useShippingAddress && (
                <>
                  {/* Billing Address Section */}
                  <h3 style={{ marginBottom: '20px' }}>Billing Address</h3>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingFirstName ? 'is-invalid' : ''}`}
                        {...register("billingFirstName", { required: "First name is required" })}
                      />
                      {errors.billingFirstName && <div className="invalid-feedback">{errors.billingFirstName.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingLastName ? 'is-invalid' : ''}`}
                        {...register("billingLastName", { required: "Last name is required" })}
                      />
                      {errors.billingLastName && <div className="invalid-feedback">{errors.billingLastName.message}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Flat no / Building Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
                      {...register("billingAddress", { required: "Address is required" })}
                    />
                    {errors.billingAddress && <div className="invalid-feedback">{errors.billingAddress.message}</div>}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>City</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingCity ? 'is-invalid' : ''}`}
                        {...register("billingCity", { required: "City is required" })}
                      />
                      {errors.billingCity && <div className="invalid-feedback">{errors.billingCity.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>State</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingState ? 'is-invalid' : ''}`}
                        {...register("billingState", { required: "State is required" })}
                      />
                      {errors.billingState && <div className="invalid-feedback">{errors.billingState.message}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Country</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingCountry ? 'is-invalid' : ''}`}
                        {...register("billingCountry", { required: "Country is required" })}
                      />
                      {errors.billingCountry && <div className="invalid-feedback">{errors.billingCountry.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>PIN Code</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingPinCode ? 'is-invalid' : ''}`}
                        {...register("billingPinCode", { required: "PIN Code is required" })}
                      />
                      {errors.billingPinCode && <div className="invalid-feedback">{errors.billingPinCode.message}</div>}
                    </div>
                  </div>
                </>
              )}
              {/* Shipping Method */}
              <h3>Shipping Method</h3>
              <div className="mb-3">
                <div className="form-check">
                  <input type="radio" className="form-check-input" value="Free" {...register("shippingMethod")} />
                  <label className="form-check-label">Free Shipping (21-28 Days)</label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" value="Standard" {...register("shippingMethod")} />
                  <label className="form-check-label">Standard ($ 2,800)</label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" value="Express" {...register("shippingMethod")} />
                  <label className="form-check-label">Express ($ 5,000)</label>
                </div>
              </div>

              {/* Payment Method */}
              <h3>Payment</h3>
              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="CreditCard"
                    checked={paymentMethod === 'CreditCard'}
                    onChange={() => setPaymentMethod('CreditCard')}
                  />
                  <label className="form-check-label">Credit & Debit Card</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="GooglePay"
                    checked={paymentMethod === 'GooglePay'}
                    onChange={() => setPaymentMethod('GooglePay')}
                  />
                  <label className="form-check-label">Google Pay</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="ApplePay"
                    checked={paymentMethod === 'ApplePay'}
                    onChange={() => setPaymentMethod('ApplePay')}
                  />
                  <label className="form-check-label">Apple Pay</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={() => setPaymentMethod('PayPal')}
                  />
                  <label className="form-check-label">PayPal</label>
                </div>
              </div>
              {/* PayPal or Card Payment */}
              {!isPaid && paymentMethod === 'CreditCard' ? (
                <PayPalCardFieldsProvider
                  createOrder={createOrder}
                  onApprove={async (data) => await onApprove(data)}
                >
                  <PayPalCardFieldsForm />
                  {/* Custom client component to handle card fields submission */}
                  <SubmitPayment
                    isPaying={isPaying}
                    setIsPaying={setIsPaying}
                  // billingAddress={billingAddress}
                  />
                </PayPalCardFieldsProvider>

              ) : paymentMethod === 'PayPal' ? (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={(err) => {
                    console.error("Payment Error: ", err);
                  }}
                  disabled={!isValid} // Disable button until form is valid
                />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Pay Now
                </button>
              )}
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="col-lg-5 col-md-12">
            <div style={{ border: '1px solid #e5e5e5', padding: '20px', backgroundColor: '#f5f5f5', marginBottom: '30px' }}>
              <h4>Order Summary</h4>
              {state.items.map((item, index) => (
                <Row key={index} className="align-items-center mb-3" style={{ paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
                  <Col xs={3}>
                    <img src={image1} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  </Col>
                  <Col xs={6}>
                    <h6>{item.title}</h6>
                    <div>$ {item.isOnSale ? item.salePrice.toFixed(2) : item.price.toFixed(2)}</div>
                    <div style={{ marginTop: '10px' }}>
                      <Button variant="outline-secondary" style={{ borderRadius: '0px' }} onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: { product_id: item.product_id, options: item.options } })}>-</Button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <Button variant="outline-secondary" style={{ borderRadius: '0px' }} onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: { product_id: item.product_id, options: item.options } })}>+</Button>
                      <Button variant="outline-secondary" onClick={() => handleRemoveItem(item.product_id, item.options)} style={{
                        marginLeft: '10px',
                        borderRadius: '0px',
                        color: '#B37E56',
                        borderColor: '#B37E56',
                        padding: '5px 10px'
                      }}>Remove</Button>
                    </div>
                  </Col>
                </Row>
              ))}

              {/* Price Summary */}
              <Row className="mb-2">
                <Col>Subtotal:</Col>
                <Col style={{ textAlign: 'right' }}>$ {totalPrice.toFixed(2)}</Col>
              </Row>
              <Row className="mb-2">
                <Col>You Saved:</Col>
                <Col style={{ textAlign: 'right', color: '#118C4F' }}>- $ {totalSavings.toFixed(2)}</Col>
              </Row>
              <Row className="mb-2">
                <Col>Shipping:</Col>
                <Col style={{ textAlign: 'right', color: '#B37E56' }}>FREE</Col>
              </Row>
              <hr />
              <Row style={{ fontWeight: 'bold', fontSize: '18px' }}>
                <Col>Total:</Col>
                <Col style={{ textAlign: 'right' }}>$ {(totalPrice - totalSavings).toFixed(2)}</Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
