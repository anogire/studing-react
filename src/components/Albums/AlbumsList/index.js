import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableFooter, TableCell, TableHead, TableRow, TablePagination, Button, Typography, IconButton, Card, CardContent } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { ALBUMS } from '../../../store/api-connect/api_consts';

import './style.scss';


export function AlbumsList(props) {
  const { photos, albums, users, deleteAlbum } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    if (newPage === -1) {
      if ((albums.length - 1) % rowsPerPage === 0) {
        (page > 0) ? setPage(page - 1) : setPage(0);
      }
    } else {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <section className="w-100 AlbumsList-section">
      <h2 className="main-heading">
        {(albums.length === 0) ? 'List is empty' : 'List of albums'}
      </h2>
      <Button
        component={Link}
        to={ALBUMS + '/new'}
        disabled={Object.keys(users).length === 0}
        variant="contained" color="primary"
        aria-label="add data"
      >
        Add
      </Button>
      {(albums.length !== 0) ?
        <div className="mt-3 table-responsive">
          <Table className="table table-striped" size="small" aria-label="albums list">
            <TableHead>
              <TableRow className="thead-dark">
                <TableCell>Id</TableCell>
                <TableCell>UserId</TableCell>
                <TableCell>User Data</TableCell>
                <TableCell>Photos</TableCell>
                <TableCell>Title</TableCell>
                <TableCell colSpan="2"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                albums
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((album, index) => (
                    <GetRecord key={index}
                      album={album}
                      photos={photos}
                      users={users}
                      deleteAlbum={deleteAlbum}
                      handleChangePage={handleChangePage} />))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="7">
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={albums.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        : null
      }
    </section>
  )
}

function GetRecord(props) {
  const { deleteAlbum, album, users, photos, handleChangePage } = props;
  const [openUserData, setOpenUserData] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);

  return (
    <TableRow>
      <TableCell component="th" scope="row">{album.id}</TableCell>
      <TableCell align="center">{album.userId}</TableCell>

      <TableCell>
        <IconButton
          onClick={() => setOpenUserData(!openUserData)}
          aria-label="show user data" size="small"
          disabled={!users[album.userId]}
        >
          {openUserData ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openUserData ? getUserData(users[album.userId] || "none") : null}
      </TableCell>

      <TableCell>
        <IconButton
          onClick={() => setOpenPhotos(!openPhotos)}
          disabled={!photos[album.id]}
          aria-label="show photos" size="small"
        >
          {openPhotos ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openPhotos ? (photos[album.id]) ? getPhotosByAlbumId(photos[album.id]) : null : null}
      </TableCell>

      <TableCell>{album.title || "none"}</TableCell>

      <TableCell>
        <Button
          component={Link}
          to={ALBUMS + `/edit/${album.id}`}
          variant="contained" color="primary"
          aria-label="edit data"
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={(event) => {
            deleteAlbum(album.id);
            handleChangePage(event, -1)
          }}
          variant="contained" color="secondary"
          aria-label="delete data"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

function getUserData(user) {
  return (
    <Card className="AlbumsList-card" variant="outlined">
      <CardContent>
        <Typography className="AlbumsList-card-title" color="textSecondary">
          Name:
        </Typography>
        <Typography variant="body2" component="p">
          {user.name || "none"}
        </Typography>
        <Typography className="AlbumsList-card-title" color="textSecondary">
          Phone:
        </Typography>
        <Typography variant="body2" component="p">
          {user.phone || "none"}
        </Typography>
        <Typography className="AlbumsList-card-title" color="textSecondary">
          Email:
        </Typography>
        <Typography variant="body2" component="p">
          {user.email || "none"}
        </Typography>
      </CardContent>
    </Card>
  )
}

function getPhotosByAlbumId(photos) {
  return (
    <Card className="AlbumsList-card" variant="outlined">
      <CardContent>
        {
          photos.map((photo, index) =>
            <Typography variant="body2" component="ul" key={index}>
              <li>{photo.id}. {photo.title || "none"}</li>
            </Typography>
          )}
      </CardContent>
    </Card>
  )
}