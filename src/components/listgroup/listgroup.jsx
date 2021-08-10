import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TableSortLabel,Typography,Toolbar,Paper,Checkbox,IconButton,Tooltip,FormControlLabel,Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AddBoxIcon from '@material-ui/icons/AddBox';
import displayConstant from '../../pages/mainpage/displayConstant.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

// MARK: - Descending Order
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { classes, order, orderBy,onRequestSort,summaryForm,formnav} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={true}
            // {numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            // inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>

        {displayConstant[formnav].map((headCell) => (
          <TableCell
            key={headCell}
            padding={'default'}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : 'asc'}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const SummaryList = {
    customer:"Customer",
    supplyer:"Supplyer",
    goods:"Goods",
    inventory:"Inventory",
    imports:"Imports",
    importsreturn:"Imports Return",
    sales:"Sales",
    salesreturn:"Sales Return"
}

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected,formnav,deleteSubmit,setOpenForm,openForm } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {SummaryList[formnav]}
        </Typography>
      )}

      {numSelected === 1 ? (
        <Tooltip title="modify">
          <IconButton aria-label="modify" onClick={(event) => {openForm===''?setOpenForm('modify'):setOpenForm('')}}>
            <BorderColorIcon />
          </IconButton>
        </Tooltip>
      ) : (null)}  

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={(event) => deleteSubmit()} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
      <Tooltip title="add">
        <IconButton aria-label="add" onClick={(event) => {openForm===''?setOpenForm('add'):setOpenForm('')}}>
          <AddBoxIcon/>
        </IconButton>
      </Tooltip>
      )
    }

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({summaryForm,formnav,loading,data,handlePost,modifyHooker,setOpenForm,openForm}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const deleteSubmit = () => {
    handlePost(selected,'/deletelist');
    setSelected([]);
  } 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);

    if(selected.length === 0){
      setOpenForm('');
      modifyHooker(data.filter(obj => obj.id === id)) 
    } else {
      modifyHooker({});
      setOpenForm('');
    }

    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected)
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (

    <div>

    {!loading && (
        <div>
            <h1>Result Not Fetched</h1>
        </div>
    )}

    {loading && (   
            <div className={classes.root}>
                
            <Paper className={classes.paper}>
                <EnhancedTableToolbar 
                numSelected={selected.length} 
                formnav={formnav} 
                deleteSubmit={deleteSubmit} 
                setOpenForm={setOpenForm} 
                openForm={openForm}
                />


                <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >

                    <EnhancedTableHead
                      classes={classes}
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={data.length}
                      summaryForm={summaryForm}
                      formnav={formnav}
                    />

                    <TableBody>
                    {stableSort(data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (

                            <TableRow
                            hover
                            aria-checked={isItemSelected}
                            selected={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            >

                                <TableCell padding="checkbox">
                                    <Checkbox
                                    role="checkbox"
                                    checked={isItemSelected}
                                    selected={isItemSelected}
                                    onClick={(event) => handleClick(event,row.id)}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </TableCell>

                              {/* row */}

                                {Object.keys(row).map((item,i) => { 
                                    if(item==='id'){
                                        return(<TableCell component="th" key={row.id + item} id={labelId} scope="row">{row.id}</TableCell>)
                                    } else {
                                        return(<TableCell key={row.id + item} align="left">{row[item]}</TableCell>)
                                    }
                                })}
                            </TableRow>
                        );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
            </div>
    )}
    
    </div>
    )}