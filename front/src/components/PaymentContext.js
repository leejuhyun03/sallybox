import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [paymentData, setPaymentData] = useState({
        userId: null,
        userName: null,
        posterPath:null,
        bookingNum:null,
        created:null,
        start_time:null,
        end_time:null,
        cinemaName:null,
        theaterNo:null,
        peopleType:null,
        seats:null,
        totalPrice:0,
        discountAmount:0
    });

    return (
        <PaymentContext.Provider value={{ paymentData, setPaymentData }}>
            {children}
        </PaymentContext.Provider>
    );
};
