import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CssBaseline, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { UserMainData } from './UserMainData';
import { UserCompany } from './UserCompany';
import { UserAddress } from './UserAddress';
import { USERS } from '../../../store/api-connect/api_consts';

import './style.scss';

export function ShowFormUser({ user, addValue, updateValue }) {

  const classes = useStyles();
  const history = useHistory();

  const [userModel, setUserModel] = useState(
    {
      id: user ? user.id : null,
      name: user ? user.name : "",
      username: user ? user.username : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      website: user ? user.website : "",
      company: user ? user.company : {
        name: "", catchPhrase: "", bs: ""
      },
      address: user ? user.address : {
        street: "", suite: "", city: "", zipcode: "",
        geo: user ? user.address.geo : {
          lat: "", lng: ""
        }
      }
    });

  const handleChange = (name, value) => {
    setUserModel(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };

  const sendData = (e) => {
    e.preventDefault();
    history.push(USERS);
    if (user) {
      updateValue(userModel)
    }
    else {
      addValue(userModel);
    }
  };

  return (
    <Container component="section" maxWidth="sm" className="ShowForm-section">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {user ? "Edit user data" : "Add user data"}
        </Typography>

        <ValidatorForm className={classes.form} onSubmit={sendData}>
          <Grid container spacing={2}>

            <UserMainData mainData={userModel || {}} updateMainData={handleChange} />

            <UserAddress address={userModel.address || {}} updateAddress={handleChange} />

            <UserCompany company={userModel.company || {}} updateCompany={handleChange} />

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
                to={USERS}
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
        </ValidatorForm>
      </div>
    </Container>
  );
}

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