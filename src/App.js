import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "./components/Header/Header";
import Textfield from "./components/UI/Textfield";
import SelectComnp from "./components/UI/Select/index";
import countries from "./data/countries.json";
import DateTimePicker from "./components/UI/DateTime/Datetime";
import Checkboxs from "./components/UI/CheckBox/Index";
import Button from "./components/UI/Button/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  arriveallDate: "",
  departureDate: "",
  message: "",
  termsOfService: false,
};
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Require FirstName"),
  lastName: Yup.string().required("Required lastName"),
  email: Yup.string().email("Invalid email").required("Email required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required Number"),
  addressLine1: Yup.string().required("Address-1"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Required city"),
  state: Yup.string().required("Required state"),
  country: Yup.string().required("Required Country"),
  arriveallDate: Yup.date().required("Required arrivealDate"),
  departureDate: Yup.date().required("Required departureDate"),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf([true], "Terms must and condition must be accepted...")
    .required("Terms must and condition must be accepted..."),
});

const App = () => {
  const classes = useStyles();
  const handleSubmit = (fiels) => {
    const result = axios.post(
      "https://611fba57988f860017ac43d0.mockapi.io/App/success/data",
      {
        body: { ...fiels },
      }
    );
    result
      .then((res) => {
        console.log(res.data.body);
        alert("The submit will hit mock api.Result can be viewed on console");
      })
      .catch((err) => console.log("err"));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Your Details</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="firstName" label="FirstName" />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="lastName" label="LastName" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="phone" label="Phone" />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Address</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="addressLine1" label="Address Line 1" />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield name="addressLine2" label="Address Line 2" />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield name="city" label="City" />
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <Textfield name="state" label="State" />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectComnp
                      name="country"
                      label="Country"
                      options={countries}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Booking Information</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      name="arriveallDate"
                      label="ArriveallDate"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      name="departureDate"
                      label="DepartureDate"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Textfield
                      name="message"
                      label="Message"
                      multiline={true}
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkboxs
                      name="termsOfService"
                      legend="Terms Of Service"
                      label="I agree"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button>Submit Form</Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
      <Grid></Grid>
    </Grid>
  );
};

export default App;
