import React, { createContext, useState } from 'react';

export const BookingContext = createContext()

export const BookingProvider = ({children}) => {

    const [bookingData, setBookingData] = useState({
        schedule: null,
        selectedSeats:[],
        counts: { adult: 0, teenager: 0, senior: 0, disabled: 0 }, //인원수
        totalPrice:0
    })

      

    return (
        <BookingContext.Provider value={{bookingData,setBookingData}}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;