import MyPage from './mypage/MyPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/sallybox/mypage/:userId" element={<MyPage/>}/>
        </Routes>
      </Router>
   
  );
}

export default App;
