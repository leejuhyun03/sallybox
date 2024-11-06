import './App.css'
import { BookingProvider } from "./components/BookingContext";
import Reservation from "./components/seats/Reservation";
import Theater from "./components/theater/Theater";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Ticketing from "./components/ticketing/Ticketing";

import MainHeader from './components/header/MainHeader';
import MainSallybox from './components/main/MainSallybox';
import SignIn from './components/SignIn/index';
import FindPassword from './components/findpassword/index';
import ResetPassword from './components/findpassword/RestPassword';
import Footer from './components/footer/Footer';
import Payment from "./components/payment/Payment";
import Movied from "./components/movied/Movied";
import { useState } from 'react';
import ClassicMoviesPage from './components/movied/ClassicMoviesPage';
import Movies from "./components/movie/Movies";

function App() {
  return (
    <BookingProvider>
      <Router>
        <AppRoutes />
      </Router>
    </BookingProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const [userId,setUserId] = useState('');

  return (
    <div>
      {location.pathname !== '/' 
        && location.pathname !== '/sallybox/sign-in' 
        && location.pathname !== '/sallybox/sign-up' 
        && location.pathname !== '/sallybox/verification'
        && location.pathname !== '/sallybox/resetPassword'
        && <MainHeader setUserId={setUserId}/>}

      <Routes>
        <Route path="/" element={<MainSallybox />} />
        <Route path='/sallybox'>
          <Route path="cinema/:cinema_id" element={<Theater />} />
          <Route path="reserv/ticketing" element={<Ticketing />} />
          <Route path="reserv/seats" element={<Reservation />} />
          <Route path="payment" element={<Payment userId={userId}/>}/>
          <Route path='sign-in' element={<SignIn />} />
          <Route path="verification" element={<FindPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="movied/:on" element={<Movied />} />
          <Route path="classic" element={<ClassicMoviesPage />} />
          <Route path="movies/:movie_id" element={<Movies />} />
          <Route path="reserv/ticketing" element={<Ticketing />} />
        </Route>
      </Routes>

      {location.pathname !== '/sallybox/sign-in' 
        && location.pathname !== '/sallybox/sign-up' 
        && location.pathname !== '/sallybox/verification'
        && location.pathname !== '/sallybox/resetPassword'
        && <Footer />}
    </div>
  );
}

export default App;
