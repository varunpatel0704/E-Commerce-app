import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PdcP4IcLvFu1NOHmCweO6tyMUGWpqMmrdO2ALgFLPqQUCFhU7aUOZPUEEtDJrUyiXIXSfTGfSSUvsrbosnh5Q0l00YBbrUeNM"
);

function PaymentForm({orderDetails}) {
  const navigate = useNavigate();
  
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    
    setIsProcessing(true);
    const {paymentIntent, error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url:window.location.origin,
      },
      redirect: 'if_required'
    });

    if(error) return toast.error(error.message || 'Payment failed, try again later');
    
    if(paymentIntent.status === 'succeeded'){
      // console.log('placing order...', orderDetails);
      console.log('payment intent ', paymentIntent);
      // paymentIntent.id => payment id, payment_method_types: ['card']
      // TODO: implement new order controller, and create correspoding endpoint.
      navigate('/orders');
    }
    setIsProcessing(false);
  }

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <form className="w-[35%] flex flex-col gap-8">
        <PaymentElement />
        <button className="public-site-btn w-full py-3 rounded-md text-lg" disabled={isProcessing} onClick={handleSubmit} >{isProcessing?'Processing':'Pay'}</button>
      </form>
    </div>
  );
}

function Payment() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {clientSecret, orderDetails} = state

  if(!clientSecret) navigate('/checkout');

  const options = { clientSecret };
  
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm orderDetails={orderDetails} />
    </Elements>
  );
}

export default Payment;
