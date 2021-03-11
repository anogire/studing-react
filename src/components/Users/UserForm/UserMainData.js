import { Grid, TextField } from '@material-ui/core';
import { TextValidator } from 'react-material-ui-form-validator';

import './style.scss';

export function UserMainData({ mainData = {}, updateMainData }) {

  return (
    <>
      <Grid item xs={12}>
        <TextValidator
          type="text"
          label="Full Name"
          name="name"
          autoComplete="name"
          value={mainData.name}
          onChange={e => updateMainData(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth required autoFocus
          validators={['required', 'minStringLength:3', 'maxStringLength:50']}
          errorMessages={['this field is required', 'min length 3', 'max length 50']}
        />
      </Grid>

      <Grid item xs={12}>
        <TextValidator
          type="phone"
          label="Phone"
          name="phone"
          autoComplete="phone"
          value={mainData.phone}
          onChange={e => updateMainData(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth required
          validators={['required', 'matchRegexp:^\\d{3} \\d{3}-\\d{2}-\\d{2}$|^\\+380 \\(\\d{2}\\) \\d{3}-\\d{2}-\\d{2}$']}
          errorMessages={['this field is required', '+380 (xx) xxx-xx-xx or xxx xxx-xx-xx']}
        />
      </Grid>

      <Grid item xs={12}>
        <TextValidator
          type="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={mainData.email}
          onChange={e => updateMainData(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth required
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          label="Username"
          name="username"
          value={mainData.username}
          onChange={e => updateMainData(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          type="url"
          label="Website"
          name="website"
          value={mainData.website}
          onChange={e => updateMainData(e.target.name, e.target.value)}
          variant="outlined"
          fullWidth
        />
      </Grid>
    </>
  );
}