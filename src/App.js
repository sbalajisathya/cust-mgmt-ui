import "./App.css";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Grid item xs={12} className="contentsBar">
        <Outlet />
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
