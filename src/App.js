import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Page/Home";
import Detailspage from "./Component/Navbar/Detailspage";
import Events from "./Page/Events";
import ScrollTop from "./Component/Navbar/ScrollTop";
import LoginPage from "./Component/Navbar/LoginPage";
import SignUpPage from "./Component/Navbar/SignUpPage";
import Cart from "./Component/Navbar/Cart";
import SearchComponent from "./Component/Navbar/SearchComponent";
// import OrderPage from "./Component/Navbar/OrderPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollTop>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/product/details/:id" element={<Detailspage />} />
            <Route path="/events/:categoryEventID" element={<Events />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart/:id" element={<Cart />} />
            {/* <Route path="/orderpage" element={<OrderPage />} /> */}
            <Route path="/search" element={<SearchComponent />} />
          </Routes>
        </ScrollTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
