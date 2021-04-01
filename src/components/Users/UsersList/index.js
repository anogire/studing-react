import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableFooter, TableCell, TableHead, TableRow, TablePagination, IconButton, Card, CardContent, Typography, Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { USERS } from '../../../store/api-connect/api_consts';

import './style.scss';


export function UsersList({ users, deleteUser, albums }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    if (newPage === -1) {
      if ((users.length - 1) % rowsPerPage === 0) {
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
    <section className="w-100 UsersList-section">
      <h2 className="main-heading">
        {users.length ? 'List of users' : 'List is empty'}
      </h2>
      <AddUserButton />
      <UsersTable
        users={users}
        albums={albums}
        deleteUser={deleteUser}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* {(users.length !== 0) ?
        <div className="table-responsive mt-3">
          <Table className="table table-striped" size="small" aria-label="users list">
            <TableHead>
              <TableRow className="thead-dark">
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Albums</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Company</TableCell>
                <TableCell colSpan="2"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => (
                    <GetRecord key={index}
                      user={user}
                      albums={albums}
                      deleteUser={deleteUser}
                      handleChangePage={handleChangePage} />))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="11">
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
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
      } */}
    </section>
  )
}

function UsersTable({ users, albums, deleteUser, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  if (!users.length) {
    return null;
  }

  const usersCount = users.length;
  const offset = page * rowsPerPage;
  users = users.slice(offset, offset + rowsPerPage);

  return (
    <div className="table-responsive mt-3">
      <Table className="table table-striped" size="small" aria-label="users list">
        <UsersTableHead />
        <TableBody>
          {users.map((user, index) => (
            <GetRecord
              key={index}
              user={user}
              albums={albums}
              deleteUser={deleteUser}
              handleChangePage={handleChangePage}
            />
          ))}
        </TableBody>
        <UsersTableFooter
          count={usersCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </div>
  )
}

function UsersTableHead() {
  return (
    <TableHead>
      <TableRow className="thead-dark">
        <TableCell>Id</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Albums</TableCell>
        <TableCell>UserName</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Website</TableCell>
        <TableCell>Company</TableCell>
        <TableCell colSpan="2"></TableCell>
      </TableRow>
    </TableHead>
  )
}

function UsersTableFooter({ count, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan="11">
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

function GetRecord({ deleteUser, user, handleChangePage, albums }) {
  const [openCompany, setOpenCompany] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAlbums, setOpenAlbums] = useState(false);

  return (
    <TableRow>
      <TableCell component="th" scope="row">{user.id}</TableCell>
      <TableCell align="center">{user.name || "none"}</TableCell>

      <TableCell>
        <IconButton
          onClick={() => setOpenAlbums(!openAlbums)}
          disabled={!albums[user.id]}
          aria-label="show albums" size="small"
        >
          {openAlbums ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openAlbums ? (albums[user.id]) ? getAlbumsByUserId(albums[user.id]) : null : null}
      </TableCell>

      <TableCell>{user.username || "none"}</TableCell>
      <TableCell>{user.email || "none"}</TableCell>

      <TableCell>
        <IconButton
          onClick={() => setOpenAddress(!openAddress)}
          aria-label="show details about address" size="small"
        >
          {openAddress ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openAddress ? getAddress(user.address || "none") : null}
      </TableCell>

      <TableCell>{user.phone || "none"}</TableCell>
      <TableCell>{user.website || "none"}</TableCell>

      <TableCell>
        <IconButton
          onClick={() => setOpenCompany(!openCompany)}
          aria-label="show details about company" size="small"
        >
          {openCompany ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openCompany ? getCompany(user.company || "none") : null}
      </TableCell>

      <TableCell>
        <EditUserButton id={user.id} />
      </TableCell>

      <TableCell>
        <DeleteUserButton
          id={user.id}
          deleteUser={deleteUser}
          handleChangePage={handleChangePage}
        />
      </TableCell>
    </TableRow>
  )
}

function getAddress(address) {
  return (
    <Card className="UsersList-card" variant="outlined">
      <CardContent>
        <Typography className="UsersList-card-title" color="textSecondary">
          Street:
        </Typography>
        <Typography variant="body2" component="p">
          {address.street || "none"}
        </Typography>
        <Typography className="UsersList-card-title" color="textSecondary">
          Suite:
        </Typography>
        <Typography variant="body2" component="p">
          {address.suite || "none"}
        </Typography>
        <Typography className="UsersList-card-title" color="textSecondary">
          City:
        </Typography>
        <Typography variant="body2" component="p">
          {address.city || "none"}
        </Typography>
        <Typography className="UsersList-card-title" color="textSecondary">
          ZipCode:
        </Typography>
        <Typography variant="body2" component="p">
          {address.zipcode || "none"}
        </Typography>
        <Typography className="UsersList-card-title" color="textSecondary">
          Geo:
        </Typography>
        <Typography variant="body2" component="ul">
          <li>lat: {address.geo.lat || "none"}</li>
          <li>lng: {address.geo.lng || "none"}</li>
        </Typography>
      </CardContent>
    </Card>
  )
}

function getCompany(company) {
  return (
    <Card className="UsersList-card" variant="outlined">
      <CardContent>
        <Typography className="UsersList-card-title" color="textSecondary">
          Name:
        </Typography>
        <Typography variant="body2" component="p">
          {company.name || "none"}
        </Typography>
        <Typography className="UsersList-card-title" color="textSecondary">
          CatchPhrase:
        </Typography>
        <Typography variant="body2" component="p">
          {company.catchPhrase || "none"}
        </Typography>
        <Typography className="UsersList-card-title" color="textSecondary">
          BS:
        </Typography>
        <Typography variant="body2" component="p">
          {company.bs || "none"}
        </Typography>
      </CardContent>
    </Card>
  )
}

function getAlbumsByUserId(albums) {
  return (
    <Card className="UsersList-card" variant="outlined">
      <CardContent>
        {
          albums.map((album, index) =>
            <Typography variant="body2" component="ul" key={index}>
              <li>{album.id}. {album.title || "none"}</li>
            </Typography>
          )}
      </CardContent>
    </Card>
  )
}

function AddUserButton() {
  return (
    <Button
      component={Link}
      to={USERS + '/new'}
      variant="contained" color="primary"
      aria-label="add data"
    >
      Add
    </Button>
  )
}

function EditUserButton({ id }) {
  return (
    <Button
      component={Link}
      to={USERS + `/edit/${id}`}
      variant="contained" color="primary"
      aria-label="edit data"
    >
      Edit
    </Button>
  )
}

function DeleteUserButton({ id, deleteUser, handleChangePage }) {
  return (
    <Button
      onClick={(event) => {
        deleteUser(id);
        handleChangePage(event, -1)
      }}
      variant="contained" color="secondary"
      aria-label="delete data"
    >
      Delete
    </Button>
  )
}