import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import Gogaksenter from './components/주용/Gogaksenter';
import Gogakregistration from './components/주용/Gogakregistration';
import { PaymentProvider } from './components/PaymentContext';
import PaymentSuccess from './components/payment/PaymentSuccess';
import MyPage from './components/선호/MyPage';
import SignUp from './views/Authentication/SignUp';
import OAuth from './views/Authentication/OAuth';
import NavbarTest3 from './components/main/header/Navbar/NavbarTest3';

function AppRoutes() {
  const location = useLocation();
  const { setUserId, setUserEmail, setUserName, setUserNickName, setIsAuthenticated, setUserPoint, setUserStatus } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?")
    localStorage.removeItem('token'); // 토큰 제거
    setIsAuthenticated(false); // 인증 상태 업데이트
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
        setUserEmail(decodedToken.user_email);
        setUserName(decodedToken.user_name);
        setUserNickName(decodedToken.user_nickname);
        setUserPoint(decodedToken.user_point);
        setUserStatus(decodedToken.user_status);
        if(decodedToken.user_status === 'N') {
          alert("탈퇴한 회원입니다.");
          localStorage.removeItem('token'); // 토큰 제거
          setIsAuthenticated(false)
        }
      console.log("로그인 userStatus: ", decodedToken.user_status)
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


<NavbarTest3 handleLogout={handleLogout}/>
    <Routes>
        <Route path="/" element={<MainSallybox />} />
        <Route path='/sallybox'>
          <Route path="cinema/:cinema_id" element={<Theater />} />
          <Route path="reserv/ticketing" element={<Ticketing />} />
          <Route path="reserv/seats" element={<Reservation />} />
          <Route path="payment" element={<PaymentProvider> <Payment/> </PaymentProvider>}/>
          <Route path="reserv/complete" element={<PaymentProvider> <PaymentSuccess/> </PaymentProvider>}/>
          <Route path='sign-in' element={<SignIn />} />
          <Route path="verification" element={<FindPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="movied/:on" element={<Movied />} />
          <Route path="classic" element={<ClassicMoviesPage />} />
          <Route path="movies/:movie_id" element={<Movies />} />
          <Route path="gogaksenter" element={<Gogaksenter />} />
          <Route path="registration" element={<Gogakregistration />} />
          <Route path="mypage/:userId" element={<MyPage/>}/>
          <Route path='sign-up' element={<SignUp />} />
          <Route path='oauth-response/:token' element={<OAuth />} />
        </Route>
     </Routes>

      {/* 푸터 */}
      {location.pathname !== '/sallybox/sign-in' 
        && location.pathname !== '/sallybox/sign-up' 
        && location.pathname !== '/sallybox/sign-up' 
        && location.pathname !== '/sallybox/verification'
        && location.pathname !== '/sallybox/resetPassword'
        && <Footer />}
    </div>
  );
}

export default AppRoutes;