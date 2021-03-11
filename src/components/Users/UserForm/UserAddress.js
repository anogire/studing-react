import { Grid, Typography, TextField } from '@material-ui/core';
import { TextValidator } from 'react-material-ui-form-validator';

import { UserGeoAddress } from './UserGeoAddress';

import './style.scss';


export function UserAddress({ address = {}, updateAddress }) {

  const handleChange = (name, value) => {
    const result = {
      ...address,
      [name]: value
    }
    updateAddress('address', result);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Address</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextValidator
          value={address.street}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Street"
          name="street"
          autoComplete="street"
          variant="outlined"
          fullWidth
          required
          validators={['required', 'minStringLength:3', 'maxStringLength:50']}
          errorMessages={['this field is required', 'min length 3', 'max length 50']}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextValidator
          value={address.suite}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Suite"
          name="suite"
          autoComplete="suite"
          variant="outlined"
          fullWidth
          required
          validators={['required']}
          errorMessages={['this field is required']}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextValidator
          value={address.city}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="City"
          name="city"
          autoComplete="city"
          variant="outlined"
          fullWidth
          required
          validators={['required']}
          errorMessages={['this field is required']}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={address.zipcode}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Zip Code"
          name="zipcode"
          autoComplete="zipcode"
          variant="outlined"
          fullWidth
        />
      </Grid>

      <UserGeoAddress geo={address.geo} updateGeoAddress={handleChange} />
    </>
  );
}