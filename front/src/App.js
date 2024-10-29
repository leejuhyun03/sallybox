import { BookingProvider } from "./components/BookingContext";
import Reservation from "./components/seats/Reservation";
import Theater from "./components/theater/Theater";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ticketing from "./components/ticketing/Ticketing";
import LoginTest from './components/kanghyeon/LoginTest'
import MainHeader from './components/kanghyeon/MainHeader/MainHeader'
import Footer from './components/kanghyeon/footer/Footer'

function App() {
  return (
    <div>
      <MainHeader />
      <BookingProvider>
        <Router>
          <Routes>
            <Route path="/sallybox/cinema/:cinema_id" element={<Theater />} />
            <Route path="/sallybox/reserv/ticketing" element={<Ticketing/>}/>
            <Route path="/sallybox/reserv/seats" element={<Reservation />}/>
            <Route path="/sallybox/login" element={<LoginTest />}/>
          </Routes>
        </Router>
      </BookingProvider>
      <Footer/>
    </div>
  );
}

export default App;
