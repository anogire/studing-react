import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './style.scss';


export function UsersList(props) {
  const { users } = props;
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
        {(users.length === 0) ? 'List is empty' : 'List of users'}
      </h2>

      <Link
        to={'/users/new'}
        className="btn btn-primary mb-3"
        aria-label="добавить пользователя">
        Add
        </Link>
      {(users.length !== 0) ?
        <div className="table-responsive">
          <Table className="table table-striped" size="small" aria-label="users list">
            <TableHead className="w-100">
              <TableRow className="thead-dark">
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
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
                  .map((user, index) => (<GetRecord key={index} user={user} deleteUser={props.deleteUser} handleChangePage={handleChangePage} />))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="10">
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
      }
    </section>
  )
}

function GetRecord(props) {
  const { deleteUser, user, handleChangePage } = props;
  const [openCompany, setOpenCompany] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  return (
    <TableRow>
      <TableCell component="th" scope="row">{user.id}</TableCell>
      <TableCell align="center">{user.name || "none"}</TableCell>
      <TableCell>{user.username || "none"}</TableCell>
      <TableCell>{user.email || "none"}</TableCell>
      <TableCell>
        <IconButton aria-label="show details about address" size="small" onClick={() => setOpenAddress(!openAddress)}>
          {openAddress ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openAddress ? getAddress(user.address || "none") : null}
      </TableCell>
      <TableCell>{user.phone || "none"}</TableCell>
      <TableCell>{user.website || "none"}</TableCell>
      <TableCell>
        <IconButton aria-label="show details about company" size="small" onClick={() => setOpenCompany(!openCompany)}>
          {openCompany ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openCompany ? getCompany(user.company || "none") : null}
      </TableCell>
      <TableCell>
        <Link
          to={`/users/edit/${user.id}`}
          className="btn btn-primary" aria-label="редактировать данные">
          Edit
        </Link>
      </TableCell>
      <TableCell>
        <button
          type="button"
          onClick={(event) => { deleteUser(user.id); handleChangePage(event, -1) }}
          //onClick={(event) => deleteUser(user.id)}
          className="btn btn-danger" aria-label="удалить данные">
          Delete
        </button>
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