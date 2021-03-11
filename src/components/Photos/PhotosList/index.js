import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableFooter, TableCell, TableHead, TableRow, TablePagination, Button } from '@material-ui/core';

import { PHOTOS } from '../../../store/api-connect/api_consts';

import './style.scss';


export function PhotosList(props) {

  const { photos, albums, deletePhoto } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    if (newPage === -1) {
      if ((photos.length - 1) % rowsPerPage === 0) {
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
    <section className="w-100 PhotosList-section">
      <h2 className="main-heading">
        {(photos.length === 0) ? 'List is empty' : 'List of photos'}
      </h2>
      <Button
        component={Link}
        to={PHOTOS + '/new'}
        disabled={Object.keys(albums).length === 0}
        variant="contained" color="primary"
        aria-label="add data"
      >
        Add
      </Button>
      {(photos.length !== 0) ?
        <div className="mt-3 table-responsive">
          <Table className="table table-striped" size="small" aria-label="photos list">
            <TableHead>
              <TableRow className="thead-dark">
                <TableCell>Id</TableCell>
                <TableCell>Album Id</TableCell>
                <TableCell>Album Title</TableCell>
                <TableCell>Title</TableCell>
                <TableCell colSpan="2"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                photos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((photo, index) => (
                    <GetRecord key={index}
                      photo={photo}
                      albums={albums}
                      deletePhoto={deletePhoto}
                      handleChangePage={handleChangePage} />))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="6">
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={photos.length}
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
  const { deletePhoto, photo, albums, handleChangePage } = props;

  return (
    <TableRow>
      <TableCell component="th" scope="row">{photo.id}</TableCell>
      <TableCell align="center">{photo.albumId}</TableCell>
      <TableCell>{(albums[photo.albumId]) ? albums[photo.albumId].title : "none"}</TableCell>
      <TableCell>{photo.title || "none"}</TableCell>

      <TableCell>
        <Button
          component={Link}
          to={PHOTOS + `/edit/${photo.id}`}
          variant="contained" color="primary"
          aria-label="edit data"
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={(event) => {
            deletePhoto(photo.id);
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