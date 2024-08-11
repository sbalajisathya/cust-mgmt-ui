import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { isEmptyValue } from "../helper";
import WebServices from "../services/webServices";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import AlertDialog from "../components/alertComponent";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addCustomerPageWrapper: {
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

const AddCustomer = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [apiAlertRespMsg, setApiAlertRespMsg] = useState("");

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
    apiAlertRespMsg: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setShowAlertDialog(false);
    }, 20000);
  }, [showAlertDialog]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addCustomerAction = async () => {
    if (validateFormInput()) {
      alert(JSON.stringify(formData));
      const serviceInstance = new WebServices();
      try {
        const result = await serviceInstance.addCustomer(formData);

        if (result.responseCode === "CUST-API-1002") {
          clearFormInput();
          setShowAlertDialog(true);
          setApiAlertRespMsg(result.responseMessage);
        } else if (result.responseCode === "CUST-API-1001") {
          setShowAlertDialog(true);
          setApiAlertRespMsg(
            `Customer (${formData.firstName || ""} ${
              formData.lastName || ""
            }) already exists!!`
          );
        } else if (result.responseCode === "CUST-API-ERR-001") {
          setShowAlertDialog(true);
          setApiAlertRespMsg(result.responseMessage.errorDetails.dateOfBirth);
        } else if (result.responseCode === "CUST-API-ERR-002") {
          setShowAlertDialog(true);
          setApiAlertRespMsg(result.responseMessage);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearFormInput = () => {
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

  const validateFormInput = () => {
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

    if (isEmptyValue(formData.dateOfBirth)) {
      isValid = false;
      setFormData({
        ...formData,
        dateOfBirth_error_text: "DateOfBirth is mandatory",
        dateOfBirth_error_highlight: true,
      });
    }
    if (isEmptyValue(formData.lastName)) {
      isValid = false;
      setFormData({
        ...formData,
        lastName_error_text: "LastName is mandatory",
        lastName_error_highlight: true,
      });
    }
    if (isEmptyValue(formData.firstName)) {
      isValid = false;
      setFormData({
        ...formData,
        firstName_error_text: "FirstName is mandatory",
        firstName_error_highlight: true,
      });
    }

    return isValid;
  };

  const classes = useStyles();

  return (
    <div className={classes.addCustomerPageWrapper}>
      <Grid container columns={12}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justifyContent={"flex-start"}
            alignItems="center"
            gap="16px"
          >
            <Grid item xs={12}>
              <Typography variant="h3">Add Customer </Typography>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <TextField
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date Of Birth"
                type="date"
                variant="outlined"
                className={classes.MuiFormControl}
                value={formData.dateOfBirth}
                helperText={formData.dateOfBirth_error_text}
                error={formData.dateOfBirth_error_highlight}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={12}>
          <div className={classes.btnBackWrapper}>
            <Button
              variant="contained"
              size="medium"
              style={{ marginLeft: "10px" }}
              onClick={() => addCustomerAction()}
              startIcon={<AddIcon />}
            >
              Add Customer
            </Button>

            <Button
              variant="contained"
              size="medium"
              style={{ marginLeft: "10px" }}
              onClick={() => clearFormInput()}
              startIcon={<CancelIcon />}
            >
              Clear
            </Button>
          </div>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <AlertDialog
            openFlag={showAlertDialog}
            description={apiAlertRespMsg}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddCustomer;
