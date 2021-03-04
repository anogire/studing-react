import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';

import './style.scss';


export function UserCompany({ company = {}, updateCompany }) {

  const handleChange = (name, value) => {
    const result = {
      ...company,
      [name]: value
    }
    updateCompany('company', result);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Company</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          value={company.name}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Name"
          name="name"
          autoComplete="name"
          variant="outlined"
          fullWidth
          required
          validators={['required', 'minStringLength:3', 'maxStringLength:50']}
          errorMessages={['this field is required', 'min length 3', 'max length 50']}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={company.catchPhrase}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Catch Phrase"
          name="catchPhrase"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={company.bs}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="BS"
          name="bs"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </>
  );
}