import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import './style.scss';


export function UserGeoAddress({ geo = {}, updateGeoAddress }) {

  const handleChange = (name, value) => {
    const result = {
      ...geo,
      [name]: value
    }
    updateGeoAddress('geo', result);
  };

  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          value={geo.lat}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Geo lat"
          name="lat"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          value={geo.lng}
          onChange={e => handleChange(e.target.name, e.target.value)}
          type="text"
          label="Geo lng"
          name="lng"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </>
  );
}