import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableFooter, TableCell, TableHead, TableRow, TablePagination, Button } from '@material-ui/core';

import { PHOTOS } from '../../../store/api-connect/api_consts';

import './style.scss';


export function PhotosList({ photos, albums, deletePhoto }) {
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
        {photos.length ? 'List of photos' : 'List is empty'}
      </h2>
      <AddPhotoButton
        disabled={!Object.keys(albums).length}
      />
      <PhotosTable
        photos={photos}
        albums={albums}
        deletePhoto={deletePhoto}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </section>
  )
}

function PhotosTable({ photos, albums, deletePhoto, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  if (!photos.length) {
    return null;
  }

  const photosCount = photos.length;
  const offset = page * rowsPerPage;
  photos = photos.slice(offset, offset + rowsPerPage);

  return (
    <div className="mt-3 table-responsive">
      <Table className="table table-striped" size="small" aria-label="photos list">
        <PhotosTableHead />
        <TableBody>
          {photos.map((photo, index) => (
            <GetRecord
              key={index}
              photo={photo}
              albums={albums}
              deletePhoto={deletePhoto}
              handleChangePage={handleChangePage}
            />
          ))}
        </TableBody>
        <PhotosTableFooter
          count={photosCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </div>
  )
}

function PhotosTableHead() {
  return (
    <TableHead>
      <TableRow className="thead-dark">
        <TableCell>Id</TableCell>
        <TableCell>Album Id</TableCell>
        <TableCell>Album Title</TableCell>
        <TableCell>Title</TableCell>
        <TableCell colSpan="2"></TableCell>
      </TableRow>
    </TableHead>
  )
}

function PhotosTableFooter({ count, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan="6">
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={count}
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
  )
}

function GetRecord({ deletePhoto, photo, albums, handleChangePage }) {

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {photo.id}
      </TableCell>
      <TableCell align="center">
        {photo.albumId}
      </TableCell>
      <TableCell>
        {(albums[photo.albumId]) ? albums[photo.albumId].title : "none"}
      </TableCell>
      <TableCell>
        {photo.title || "none"}
      </TableCell>
      <TableCell>
        <EditPhotoButton id={photo.id} />
      </TableCell>
      <TableCell>
        <DeletePhotoButton
          id={photo.id}
          deletePhoto={deletePhoto}
          handleChangePage={handleChangePage}
        />
      </TableCell>
    </TableRow>
  )
}

function AddPhotoButton({ disabled }) {
  return (
    <Button
      component={Link}
      to={PHOTOS + '/new'}
      disabled={disabled}
      variant="contained" color="primary"
      aria-label="add data"
    >
      Add
    </Button>
  )
}

function EditPhotoButton({ id }) {
  return (
    <Button
      component={Link}
      to={PHOTOS + `/edit/${id}`}
      variant="contained" color="primary"
      aria-label="edit data"
    >
      Edit
    </Button>
  )
}

function DeletePhotoButton({ id, deletePhoto, handleChangePage }) {
  return (
    <Button
      onClick={(event) => {
        deletePhoto(id);
        handleChangePage(event, -1)
      }}
      variant="contained" color="secondary"
      aria-label="delete data"
    >
      Delete
    </Button>
  )
}