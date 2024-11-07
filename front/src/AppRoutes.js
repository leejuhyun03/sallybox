import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { useUser } from './context/UserContext';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import Reservation from "./components/seats/Reservation";
import Theater from "./components/theater/Theater";
import Ticketing from "./components/ticketing/Ticketing";
import MainHeader from './components/header/MainHeader';
import MainSallybox from './components/main/MainSallybox';
import SignIn from './components/SignIn/index';
import FindPassword from './components/findpassword/index';
import ResetPassword from './components/findpassword/RestPassword';
import Footer from './components/footer/Footer';
import Payment from "./components/payment/Payment";
import Movied from "./components/movied/Movied";
import ClassicMoviesPage from './components/movied/ClassicMoviesPage';
import Movies from "./components/movie/Movies";

function AppRoutes() {
  const location = useLocation();
  const { setUserId, setUserName, setUserNickName, setIsAuthenticated } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
        setUserName(decodedToken.user_name);
        setUserNickName(decodedToken.user_nickname);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return (
    <div>
      {/* 헤더 */}
      {location.pathname !== '/' 
        && location.pathname !== '/sallybox/sign-in' 
        && location.pathname !== '/sallybox/sign-up' 
        && location.pathname !== '/sallybox/verification'
        && location.pathname !== '/sallybox/resetPassword'
        && <MainHeader/>}


    <Routes>
        <Route path="/" element={<MainSallybox />} />
        <Route path='/sallybox'>
           <Route path="cinema/:cinema_id" element={<Theater />} />
           <Route path="reserv/ticketing" element={<Ticketing />} />
           <Route path="reserv/seats" element={<Reservation />} />
            <Route path="payment" element={<Payment/>}/>
           <Route path='sign-in' element={<SignIn />} />
           <Route path="verification" element={<FindPassword />} />
           <Route path="resetPassword" element={<ResetPassword />} />
           <Route path="movied/:on" element={<Movied />} />
           <Route path="classic" element={<ClassicMoviesPage />} />
           <Route path="movies/:movie_id" element={<Movies />} />
           <Route path="reserv/ticketing" element={<Ticketing />} />
        </Route>
     </Routes>

      {/* 푸터 */}
      {location.pathname !== '/sallybox/sign-in' 
        && location.pathname !== '/sallybox/sign-up' 
        && location.pathname !== '/sallybox/verification'
        && location.pathname !== '/sallybox/resetPassword'
        && <Footer />}
    </div>
  );
}

export default AppRoutes;