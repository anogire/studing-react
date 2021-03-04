import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { UserMainData } from './UserMainData';
import { UserCompany } from './UserCompany';
import { UserAddress } from './UserAddress';
import { USERS } from '../../../actions/api_consts';

import './style.scss';

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

// {/* <Grid item xs={12}>
//               <TextValidator
//                 type="text"
//                 label="Full Name"
//                 name="name"
//                 autoComplete="name"
//                 value={userModel.name}
//                 onChange={e => handleChange(e.target.name, e.target.value)}
//                 variant="outlined"
//                 fullWidth required autoFocus
//                 validators={['required', 'minStringLength:3', 'maxStringLength:50']}
//                 errorMessages={['this field is required', 'min length 3', 'max length 50']}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextValidator
//                 type="phone"
//                 label="Phone"
//                 name="phone"
//                 autoComplete="phone"
//                 value={userModel.phone}
//                 onChange={e => handleChange(e.target.name, e.target.value)}
//                 variant="outlined"
//                 fullWidth required
//                 validators={['required', 'matchRegexp:^\\d{3} \\d{3}-\\d{2}-\\d{2}$|^\\+380 \\(\\d{2}\\) \\d{3}-\\d{2}-\\d{2}$']}
//                 errorMessages={['this field is required', '+380 (xx) xxx-xx-xx or xxx xxx-xx-xx']}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextValidator
//                 type="email"
//                 label="Email"
//                 name="email"
//                 autoComplete="email"
//                 value={userModel.email}
//                 onChange={e => handleChange(e.target.name, e.target.value)}
//                 variant="outlined"
//                 fullWidth required
//                 validators={['required', 'isEmail']}
//                 errorMessages={['this field is required', 'email is not valid']}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 type="text"
//                 label="Username"
//                 name="username"
//                 value={userModel.username}
//                 onChange={e => handleChange(e.target.name, e.target.value)}
//                 variant="outlined"
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 type="url"
//                 label="Website"
//                 name="website"
//                 value={userModel.website}
//                 onChange={e => handleChange(e.target.name, e.target.value)}
//                 variant="outlined"
//                 fullWidth
//               />
//             </Grid>

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setUserModel(prevValue => ({
//     ...prevValue,
//     [name]: value
//   }));
// };
// const updateGeoAddress = (name, value) => {
//   setUserModel(prevValue => ({
//     ...prevValue,
//     address: {
//       ...userModel.address,
//       geo: {
//         ...userModel.address.geo,
//         [name]: value
//       }
//     }
//   }))
// }

// const updateAddress = (name, value) => {
//   setUserModel(prevValue => ({
//     ...prevValue,
//     address: {
//       ...userModel.address,
//       [name]: value
//     }
//   }))
// }

// const updateCompany = (name, value) => {
//   setUserModel(prevValue => ({
//     ...prevValue,
//     company: {
//       ...userModel.company,
//       [name]: value
//     }
//   }))
// } */}