import { setPaymentDetails } from "./payment-slice";
import axios  from "axios";
import { CardNumberElement} from "@stripe/react-stripe-js";
import { createBooking } from "../Booking/booking-action";


export const processPayment = ({
    totalAmount,
    stripe,
    elements,
    checkinDate,
    checkoutDate,
    propertyName,
    address,
    maximumGuests,
    propertyId,
    bookingId,
    nights,
    dispatch,
    navigate,
}) => {
    return async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.error("stripe is not initialized");
            return;
        }
        const cardNumberElement = elements.getElement(CardNumberElement);
        try{
            const response = await axios.post(
                "/api/v1/rent/user/checkout-session",
            {
                amount: totalAmount,
                currency: "inr",
                paymentMethodTypes: ["card"],
                checkinDate,
                checkoutDate,
                propertyName,
                address,
                maximumGuests,
                bookingId,
                propertyId,
                nights,
            },
            {
                headers : {
                    "Content-Type" :"application/json" 
                }
            }
            );
            const data = response.data;
            await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                },
            });

            dispatch(
                createBooking({
                    booking: bookingId,
                    property: propertyId,
                    price: totalAmount,
                    guests: maximumGuests,
                    fromDate: checkinDate,
                    toDate: checkoutDate,
                    nights,
                })
            );

            
            dispatch(
                setPaymentDetails({
                    checkinDate,
                    checkoutDate,
                    totalAmount,
                    propertyName,
                    address,
                    maximumGuests,
                    propertyId,
                    bookingId,
                    nights,
                })
            );
            navigate("/user/booking");
        }catch(error) {
            console.error("Error processing payment:", error);
        }
    };
};