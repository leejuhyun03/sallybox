import React, { createContext, useState } from 'react';

export const BookingContext = createContext()

export const BookingProvider = ({children}) => {

    const [bookingData, setBookingData] = useState({
        movie: null,
        schedule: null,
        seat:null
      })

    return (
        <BookingContext.Provider value={{bookingData,setBookingData}}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContext;