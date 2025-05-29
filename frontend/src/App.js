import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Register from "./login/Register"
import Login from './login/Login'; 
import ForgotPassword from './login/ForgotPassword'
import ResetPassword from './login/ResetPassword'
import CartDetails from './pages/CartDetails';
import Details from './pages/Details';
import ProductSection from './components/ProductSection';
import CardCarousel from './components/CardCarousel';
import CardCarousel1 from './components/CardCarousel1'
import CardCarousel2 from './components/CardCarousel2'
import CardCarousel3 from './components/CardCarousel3'
import CardCarousel4 from './components/CardCarousel4'
import CardCarousel5 from './components/CardCarousel5'
import CardCarousel6 from './components/CardCarousel6'
import ClickCash from './pages/ClickCash'
import GiftCard from './pages/GiftCard'
import GiftCardReplica from './pages/GiftCardReplica'
import ClicKCare from './pages/ClicKCare'
import WishList from './pages/Wishlist';
import Admin from './pages/Admin';
import AdminMainPage from './Admin/AdminMainBanner';
import TrackOrder from './pages/TrackOrder'
import Viewtrack from './pages/Viewtrack'
import Payment from './pages/PaymentPage';
import AdminOrders from './pages/AdminOrders';
import OrderSuccess from './components/OrderSuccess'
import OrderList from './pages/OrderList'
import Footer1 from './pages/Footer1'
import Footer2 from './pages/Footer2'
import Footercash from './pages/Footercash'

// Load Stripe with your publishable key
const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Wrap only the routes that need Stripe with Elements provider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/cart" element={<CartDetails/>} />
          <Route path="/ProductSection" element={<ProductSection/>} />
          <Route path="/Details" element={<Details/>} />
          <Route path="/CardCarousel" element={<CardCarousel/>} />
          <Route path="/CardCarousel1" element={<CardCarousel1/>} />
          <Route path="/CardCarousel2" element={<CardCarousel2/>} />
          <Route path="/CardCarousel3" element={<CardCarousel3/>} />
          <Route path="/CardCarousel4" element={<CardCarousel4/>} />
          <Route path="/CardCarousel5" element={<CardCarousel5/>} />
          <Route path="/CardCarousel6" element={<CardCarousel6/>} />
          <Route path="/ClickCash" element={<ClickCash/>} />
          <Route path="/GiftCard" element={<GiftCard/>} />
          <Route path="/GiftCardReplica" element={<GiftCardReplica/>} />
          <Route path="/ClicKCare" element={<ClicKCare/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/WishList" element={<WishList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/AdminMainPage" element={<AdminMainPage />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />
          <Route path="/Viewtrack/:id" element={<Viewtrack />} />
          <Route path="/AdminOrders" element={<AdminOrders />} />
         <Route path="/OrderList" element={<OrderList />} />
          <Route path="/Payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
         <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/Footer1" element={<Footer1 />} />
          <Route path="/Footer2" element={<Footer2 />} />
          <Route path="/Footercash" element={<Footercash />} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;