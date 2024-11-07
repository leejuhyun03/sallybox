// import './App.css'
// import { BookingProvider } from "./components/BookingContext";
// import Reservation from "./components/seats/Reservation";
// import Theater from "./components/theater/Theater";
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Ticketing from "./components/ticketing/Ticketing";

// import MainHeader from './components/header/MainHeader';
// import MainSallybox from './components/main/MainSallybox';
// import SignIn from './components/SignIn/index';
// import FindPassword from './components/findpassword/index';
// import ResetPassword from './components/findpassword/RestPassword';
// import Footer from './components/footer/Footer';
// import Payment from "./components/payment/Payment";
// import Movied from "./components/movied/Movied";
// import { useEffect, useState } from 'react';
// import ClassicMoviesPage from './components/movied/ClassicMoviesPage';
// import Movies from "./components/movie/Movies";
// import { jwtDecode } from 'jwt-decode';

// function App() {
//   return (
//     <BookingProvider>
//       <Router>
//         <AppRoutes />
//       </Router>
//     </BookingProvider>
//   );
// }

// function AppRoutes() {
//   const location = useLocation();
//   const [userId,setUserId] = useState('');
//   const [user, setUser] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token'); // localStorage에서 토큰 가져오기
//     console.log('App.js token: ', token)

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token); // JWT 디코딩
//         setUser(decodedToken.user_id); // user_id 상태 업데이트
//       } catch (error) {
//         console.error('Invalid token:', error); // 유효하지 않은 토큰 에러 처리
//       }
//     }
//   }, []); // 컴포넌트가 처음 마운트될 때만 실행

//   console.log('APP.js: ', user)

//   return (
//     <div>
//       {location.pathname !== '/' 
//         && location.pathname !== '/sallybox/sign-in' 
//         && location.pathname !== '/sallybox/sign-up' 
//         && location.pathname !== '/sallybox/verification'
//         && location.pathname !== '/sallybox/resetPassword'
//         && <MainHeader setUserId={setUserId}/>}

//       <Routes>
//         <Route path="/" element={<MainSallybox />} />
//         <Route path='/sallybox'>
//           <Route path="cinema/:cinema_id" element={<Theater />} />
//           <Route path="reserv/ticketing" element={<Ticketing />} />
//           <Route path="reserv/seats" element={<Reservation />} />
//           <Route path="payment" element={<Payment userId={userId}/>}/>
//           <Route path='sign-in' element={<SignIn />} />
//           <Route path="verification" element={<FindPassword />} />
//           <Route path="resetPassword" element={<ResetPassword />} />
//           <Route path="movied/:on" element={<Movied />} />
//           <Route path="classic" element={<ClassicMoviesPage />} />
//           <Route path="movies/:movie_id" element={<Movies />} />
//           <Route path="reserv/ticketing" element={<Ticketing />} />
//         </Route>
//       </Routes>

//       {location.pathname !== '/sallybox/sign-in' 
//         && location.pathname !== '/sallybox/sign-up' 
//         && location.pathname !== '/sallybox/verification'
//         && location.pathname !== '/sallybox/resetPassword'
//         && <Footer />}
//     </div>
//   );
// }


import { BrowserRouter as Router } from "react-router-dom";
import { BookingProvider } from "./components/BookingContext";

import { UserProvider } from './context/UserContext'; // UserProvider 추가
import AppRoutes from './AppRoutes'

function App() {
  return (
    <UserProvider>
      <BookingProvider>
        <Router>
          <AppRoutes />
        </Router>
      </BookingProvider>
    </UserProvider>
  );
}

export default App;