import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Typography, Box } from "@material-ui/core";
import CustomTable from "../components/customTable";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import WebServices from "../services/webServices";
import AlertDialog from "../components/alertComponent";

const useStyles = makeStyles((theme) => ({
  searchPageWrapper: {
    border: "1px solid #1976d2",
    padding: "20px",
    margin: "1.5em",
  },
  btnBackWrapper: {
    padding: "40px 20px",
  },
  MuiFormControl: {
    width: "100%",
  },
}));

export const SearchCustomer = () => {
  const classes = useStyles();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [apiAlertRespMsg, setApiAlertRespMsg] = useState("");
  const [searchGridRowData, setSearchGridRowData] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    firstName_error_text: "",
    firstName_error_highlight: false,
    lastName_error_text: "",
    lastName_error_highlight: false,
    dateOfBirth_error_text: "",
    dateOfBirth_error_highlight: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowAlertDialog(false);
      setApiAlertRespMsg("");
    }, 10000);
  }, [showAlertDialog]);

  const handleInputChange = async (e) => {
    validateFormInput();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const searchCustomerAction = async () => {
    if (validateFormInput()) {
      const serviceInstance = new WebServices();
      try {
        const params = new URLSearchParams({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
        });
        const result = await serviceInstance.searchCustomer(params.toString());

        if (result.responseCode === "CUST-API-1003") {
          setSearchGridRowData(result.responseMessage);
        } else if (result.responseCode === "CUST-API-1004") {
          setShowAlertDialog(true);
          setApiAlertRespMsg("No Record Found!!");
          setSearchGridRowData([]);
        } else if (result.responseCode === "CUST-API-ERR-002") {
          setShowAlertDialog(true);
          setApiAlertRespMsg(result.responseMessage);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearFormInput = async () => {
    setShowAlertDialog(false);
    setFormData({
      ...formData,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      firstName_error_text: "",
      firstName_error_highlight: false,
      lastName_error_text: "",
      lastName_error_highlight: false,
      dateOfBirth_error_text: "",
      dateOfBirth_error_highlight: false,
    });
  };

  const validateFormInput = async () => {
    let isValid = true;
    setFormData({
      ...formData,
      firstName_error_text: "",
      firstName_error_highlight: false,
      lastName_error_text: "",
      lastName_error_highlight: false,
      dateOfBirth_error_text: "",
      dateOfBirth_error_highlight: false,
    });
    return isValid;
  };

  return (
    <>
      <div className={classes.searchPageWrapper}>
        <Grid container direction={"row"} spacing={5}>
          <Grid item xs={12} sx={4}>
            <Typography variant="h3">Search Customer </Typography>
          </Grid>

          <Grid item xs={4} sx={4}>
            <TextField
              className={classes.MuiFormControl}
              id="firstName"
              name="firstName"
              label="First Name"
              size="small"
              variant="outlined"
              error={formData.firstName_error_highlight}
              helperText={formData.firstName_error_text}
              onChange={handleInputChange}
              value={formData.firstName}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4} sx={4}>
            <TextField
              className={classes.MuiFormControl}
              id="lastName"
              name="lastName"
              label="Last Name"
              size="small"
              variant="outlined"
              value={formData.lastName}
              error={formData.lastName_error_highlight}
              helperText={formData.lastName_error_text}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4} sx={4}>
            <TextField
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date Of Birth"
              type="date"
              variant="outlined"
              className={classes.MuiFormControl}
              value={formData.dateOfBirth}
              error={formData.dateOfBirth_error_highlight}
              helperText={formData.dateOfBirth_error_text}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sx={4}>
            <Button
              variant="contained"
              size="medium"
              style={{ marginLeft: "10px" }}
              onClick={searchCustomerAction}
              startIcon={<SearchIcon />}
            >
              Search Customer
            </Button>

            <Button
              variant="contained"
              size="medium"
              style={{ marginLeft: "10px" }}
              onClick={clearFormInput}
              startIcon={<CancelIcon />}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
      <Grid item xs={12}>
        <Box
          sx={{
            border: "1px solid #1976d2",
            margin: "1.5em",
            mt: "30px",
            mb: "40px",
          }}
        >
          <CustomTable rowData={searchGridRowData} />
        </Box>
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={6}>
        <AlertDialog openFlag={showAlertDialog} description={apiAlertRespMsg} />
      </Grid>
    </>
  );
};

export default SearchCustomer;
