import App from "../App";
import Home from "../pages/home";
import AddCustomer from "../pages/addCustomer";
import SearchCustomer from "../pages/searchCustomer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<Home />} />
          <Route index path="home" element={<Home />} />
          <Route path="addCustomer" element={<AddCustomer />} />
          <Route path="searchCustomer" element={<SearchCustomer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
