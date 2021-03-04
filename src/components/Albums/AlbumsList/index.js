import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
// import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ALBUMS } from '../../../actions/api_consts';

import './style.scss';


export function AlbumsList(props) {
  const { albums, users } = props;
  console.log('AlbumsList: albums: ', albums);
  console.log('AlbumsList: users: ', users);

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
        variant="contained" color="primary"
        aria-label="add data"
      >
        Add
      </Button>
      {(albums.length !== 0) ?
        <div className="mt-3 table-responsive">
          <Table className="table table-striped" size="small" aria-label="albums list">
            <TableHead className="w-100">
              <TableRow className="thead-dark">
                <TableCell>Id</TableCell>
                <TableCell>UserId</TableCell>
                <TableCell>Title</TableCell>
                <TableCell colSpan="2"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                albums
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((album, index) => (<GetRecord key={index} album={album} deleteAlbum={props.deleteAlbum} handleChangePage={handleChangePage} />))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="5">
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
  const { deleteAlbum, album, handleChangePage } = props;
  // const [openCompany, setOpenCompany] = useState(false);

  return (
    <TableRow>
      <TableCell component="th" scope="row">{album.id}</TableCell>
      <TableCell align="center">{album.userId}</TableCell>
      <TableCell>{album.title || "none"}</TableCell>

      {/* <TableCell>
        <IconButton aria-label="show details about company" size="small" onClick={() => setOpenCompany(!openCompany)}>
          {openCompany ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {openCompany ? getCompany(album.company || "none") : null}
      </TableCell> */}
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
          onClick={(event) => { deleteAlbum(album.id); handleChangePage(event, -1) }}
          variant="contained" color="secondary"
          aria-label="delete data"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

// function getCompany(company) {
//   return (
//     <Card className="AlbumsList-card" variant="outlined">
//       <CardContent>
//         <Typography className="AlbumsList-card-title" color="textSecondary">
//           Name:
//         </Typography>
//         <Typography variant="body2" component="p">
//           {company.name || "none"}
//         </Typography>
//         <Typography className="AlbumsList-card-title" color="textSecondary">
//           CatchPhrase:
//         </Typography>
//         <Typography variant="body2" component="p">
//           {company.catchPhrase || "none"}
//         </Typography>
//         <Typography className="AlbumsList-card-title" color="textSecondary">
//           BS:
//         </Typography>
//         <Typography variant="body2" component="p">
//           {company.bs || "none"}
//         </Typography>
//       </CardContent>
//     </Card>
//   )
// }