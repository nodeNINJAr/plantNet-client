import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import "./checkoutForm.css";
import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

//
const CheckoutForm = ({ refetch, closeModal, purchased , totalQuantity}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  //
  const [clientSecret, setClientSecret] = useState('');
  //
  useEffect(() => {
    getPaymentIntent();
  }, [purchased]);

  // handle payment Intent
  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        productId: purchased?.productId,
        quantity: purchased?.quantity,
      });
      setClientSecret(data?.client_secret);
    } catch (err) {
      console.log(err);
    } 
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card,
    // });

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    // }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // payment confirm
   const {paymentIntent} = await  stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name:purchased?.customer?.name,
          email:purchased?.customer?.email,
        },
      },
    });
    console.log(paymentIntent);
   if(paymentIntent?.status === "succeeded"){
         try {
             await axiosSecure.post('/order', {...purchased, transactionId:paymentIntent?.id});
             // update quantity to plant collection
             await axiosSecure.patch(`/plants/quantity/${purchased?.productId}`, {quantityToUpdate:totalQuantity, status : 'decrease'} )
             toast.success("Plant Purchased");
             refetch();
             navigate('/dashboard/my-orders')
           } catch (err) {
             console.log(err);
           } finally {
             closeModal();
           } 
   }



  };

  //
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-between gap-2">
        <Button
          type="submit"
          disabled={!stripe}
          label={`Pay ${purchased?.price} $`}
        ></Button>
        <Button outline={true} onClick={closeModal} label={"Cancle"}></Button>
      </div>
    </form>
  );
};
CheckoutForm.propTypes = {
  refetch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  purchased: PropTypes.shape({
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CheckoutForm;
