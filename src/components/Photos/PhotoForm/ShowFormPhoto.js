import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CssBaseline, Grid, Typography, Container, makeStyles, TextField } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { PHOTOS } from '../../../store/api-connect/api_consts';

import './style.scss';


export function ShowFormPhoto({ photo, albums = [], addValue, updateValue }) {
  const classes = useStyles();
  const history = useHistory();

  const [photoModel, setPhotoModel] = useState(
    {
      id: photo ? photo.id : null,
      albumId: photo ? photo.albumId : "",
      title: photo ? photo.title : "",
      url: photo ? photo.url : "",
      thumbnailUrl: photo ? photo.thumbnailUrl : ""
    });

  const handleChange = (name, value) => {

    setPhotoModel(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };

  const sendData = (e) => {
    if (photoModel.albumId === "") {
      photoModel.albumId = albums ? albums[0].id : 0
    }
    e.preventDefault();
    history.push(PHOTOS);
    if (photo) {
      updateValue(photoModel)
    }
    else {
      addValue(photoModel);
    }
  };

  return (
    <Container component="section" maxWidth="sm" className="ShowFormPhoto-section">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {photo ? "Edit photo data" : "Add photo data"}
        </Typography>

        <ValidatorForm className={classes.form} onSubmit={sendData}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                type="text"
                label="Title"
                name="title"
                value={photoModel.title}
                onChange={e => handleChange(e.target.name, e.target.value)}
                variant="outlined"
                fullWidth required autoFocus
                validators={['required', 'minStringLength:3', 'maxStringLength:50']}
                errorMessages={['this field is required', 'min length 3', 'max length 50']}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" gutterBottom>Album Id</Typography>
              <select
                name="albumId" className="formSelect"
                value={photoModel.albumId}
                onChange={e => handleChange(e.target.name, e.target.value)}>
                {
                  albums.map((album, index) => (
                    <option key={index} value={album.id}>
                      {album.id}
                    </option>))
                }
              </select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="url"
                label="Url"
                name="url"
                value={photoModel.url}
                onChange={e => handleChange(e.target.name, e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="url"
                label="Thumbnail Url"
                name="thumbnailUrl"
                value={photoModel.thumbnailUrl}
                onChange={e => handleChange(e.target.name, e.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
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
                to={PHOTOS}
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
    </Container >
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