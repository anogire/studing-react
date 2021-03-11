import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CssBaseline, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { ALBUMS } from '../../../store/api-connect/api_consts';

import './style.scss';

export function ShowFormAlbum({ album, users = [], addValue, updateValue }) {
  const classes = useStyles();
  const history = useHistory();

  const [albumModel, setAlbumModel] = useState(
    {
      id: album ? album.id : null,
      userId: album ? album.userId : "",
      title: album ? album.title : ""
    });

  const handleChange = (name, value) => {

    setAlbumModel(prevValue => ({
      ...prevValue,
      [name]: value
    }));
  };

  const sendData = (e) => {
    if (albumModel.userId === "") {
      albumModel.userId = users ? users[0].id : 0
    }
    e.preventDefault();
    history.push(ALBUMS);
    if (album) {
      updateValue(albumModel)
    }
    else {
      addValue(albumModel);
    }
  };

  return (
    <Container component="section" maxWidth="sm" className="ShowFormAlbum-section">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {album ? "Edit album data" : "Add album data"}
        </Typography>

        <ValidatorForm className={classes.form} onSubmit={sendData}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                type="text"
                label="Title"
                name="title"
                value={albumModel.title}
                onChange={e => handleChange(e.target.name, e.target.value)}
                variant="outlined"
                fullWidth required autoFocus
                validators={['required', 'minStringLength:3', 'maxStringLength:50']}
                errorMessages={['this field is required', 'min length 3', 'max length 50']}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" gutterBottom>User Id</Typography>
              <select
                name="userId" className="formSelect"
                value={albumModel.userId}
                onChange={e => handleChange(e.target.name, e.target.value)}>
                {
                  users.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.id}
                    </option>))
                }
              </select>
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
                to={ALBUMS}
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