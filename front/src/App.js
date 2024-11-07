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