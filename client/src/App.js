import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateListing from './pages/CreateListing';
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-listing" element={<CreateListing />} />  
        <Route path="/properties/:listingId" element={<ListingDetails />} />  
        <Route path="/:userId/trips" element={<TripList />} />  
        <Route path="/:userId/wishList" element={<WishList />} />  
        <Route path="/:userId/propertyList" element={<PropertyList />} />  
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
