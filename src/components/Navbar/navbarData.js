import React from "react";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

const NavbarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Add Customer",
    path: "/addCustomer",
    icon: <AddIcon />,
  },
  {
    title: "Search Customer",
    path: "/searchCustomer",
    icon: <SearchIcon />,
  },
];

export default NavbarData;
