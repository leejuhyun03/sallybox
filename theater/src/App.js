import Theater from "./components/Theater";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/sallybox/cinema/:cinema_id" element={<Theater />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
