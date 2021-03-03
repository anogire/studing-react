import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import './style.scss';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function GetInput({ type = "text", value, field, label, isRequired = false, focus = false, isSmall = false, model, setValue }) {
  return (
    <Grid item xs={12} sm={isSmall ? 6 : null}>
      <TextField
        type={type}
        label={label}
        name={field}
        autoComplete={field}
        value={value}
        onChange={event => setValue(event, model)}
        variant="outlined"
        fullWidth
        required={isRequired}
        autoFocus={focus}
      />
    </Grid>
  )
}

export function ShowForm({ user, addValue, updateValue }) {
  const classes = useStyles();
  const history = useHistory();

  const [userModel, setUserModel] = useState(
    {
      name: user ? user.name : "",
      username: user ? user.username : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      website: user ? user.website : "",
    });

  const [companyModel, setCompanyModel] = useState(
    {
      name: user ? user.company.name : "",
      catchPhrase: user ? user.company.catchPhrase : "",
      bs: user ? user.company.bs : "",
    });

  const [addressModel, setAddressModel] = useState(
    {
      street: user ? user.address.street : "",
      suite: user ? user.address.suite : "",
      city: user ? user.address.city : "",
      zipcode: user ? user.address.zipcode : "",
    });

  const [geoModel, setGeoModel] = useState(
    {
      lat: user ? user.address.geo.lat : "",
      lng: user ? user.address.geo.lng : "",
    });

  const handleChange = (e, setValue) => {
    const { name, value } = e.target;
    setValue(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };

  const sendData = (e) => {
    const model = {
      ...userModel,
      company: companyModel,
      address: {
        ...addressModel,
        geo: geoModel
      }
    };
    e.preventDefault();
    history.push('/users');
    if (user) {
      updateValue(model)
    }
    else {
      addValue(model);
    }
  };

  return (
    <Container component="section" maxWidth="md" className="ShowForm-section">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {user ? "Edit user data" : "Add user data"}
        </Typography>
        <form className={classes.form} noValidate
          onSubmit={sendData}
        >
          <Grid container spacing={2}>
            <GetInput
              value={userModel.name}
              field="name"
              label="Full Name"
              isRequired={true}
              focus={true}
              model={setUserModel}
              setValue={handleChange}
            />
            <GetInput
              type="phone"
              value={userModel.phone}
              field="phone"
              label="Phone"
              isRequired={true}
              model={setUserModel}
              setValue={handleChange}
            />
            <GetInput
              type="email"
              value={userModel.email}
              field="email"
              label="Email"
              isRequired={true}
              model={setUserModel}
              setValue={handleChange}
            />
            <GetInput
              value={userModel.username}
              field="username"
              label="UserName"
              isSmall={true}
              model={setUserModel}
              setValue={handleChange}
            />
            <GetInput
              type="url"
              value={userModel.website}
              field="website"
              label="Website"
              isSmall={true}
              model={setUserModel}
              setValue={handleChange}
            />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Address</Typography>
            </Grid>
            <GetInput
              value={addressModel.street}
              field="street"
              label="Street"
              isRequired={true}
              isSmall={true}
              model={setAddressModel}
              setValue={handleChange}
            />
            <GetInput
              value={addressModel.suite}
              field="suite"
              label="Suite"
              isRequired={true}
              isSmall={true}
              model={setAddressModel}
              setValue={handleChange}
            />
            <GetInput
              value={addressModel.city}
              field="city"
              label="City"
              isRequired={true}
              isSmall={true}
              model={setAddressModel}
              setValue={handleChange}
            />
            <GetInput
              value={addressModel.zipcode}
              field="zipcode"
              label="Zip Code"
              isSmall={true}
              model={setAddressModel}
              setValue={handleChange}
            />
            <GetInput
              value={geoModel.lat}
              field="lat"
              label="Geo lat"
              isSmall={true}
              model={setGeoModel}
              setValue={handleChange}
            />
            <GetInput
              value={geoModel.lng}
              field="lng"
              label="Geo lng"
              isSmall={true}
              model={setGeoModel}
              setValue={handleChange}
            />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Company</Typography>
            </Grid>
            <GetInput
              value={companyModel.name}
              field="name"
              label="Name"
              isRequired={true}
              model={setCompanyModel}
              setValue={handleChange}
            />
            <GetInput
              value={companyModel.catchPhrase}
              field="catchPhrase"
              label="Catch Phrase"
              model={setCompanyModel}
              setValue={handleChange}
            />
            <GetInput
              value={companyModel.bs}
              field="bs"
              label="BS"
              model={setCompanyModel}
              setValue={handleChange}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                arial-label="send data"
              >
                Send
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                component={Link}
                to={'/users'}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                arial-label="cancel"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}