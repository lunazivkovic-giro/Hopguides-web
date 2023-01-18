import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { HomeDataContext } from "../contexts/HomeDataContext";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { homeDataService } from "../services/HomeDataService";
import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useParams } from 'react-router-dom';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { reportConstants } from "../constants/ReportConstants";
import EditIcon from '@mui/icons-material/Edit';

import Axios from "axios";
import { authHeader } from "../helpers/auth-header";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const HomeData = forwardRef((props, ref) => {

  const { homeDataState, dispatch } = useContext(HomeDataContext);
  const [users, setUsers] = useState([]);

  const [role, setRole] = useState(false);
  const [admin, setAdmin] = useState(false);
  const someFetchActionCreator = () => {
    const getDocumentsInfoHandler = async () => {
      await homeDataService.getData(dispatch);
      await homeDataService.getToursAndPointsData(dispatch);


    };


    getDocumentsInfoHandler();
  };


  useEffect(() => {
    var token = authHeader()
    if (token == "null") {
      window.location = "#/unauthorized";
    } else {

      Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
      )
        .then((res) => {
          if (res.status === 200) {
            if ("USER" == res.data) {

              setRole(true)
            }

            if ("ADMIN" == res.data) {

              setRole(true)
              setAdmin(true)
            }
          }
        })
        .catch((err) => {

        })
    }



    var contactUser = {
      name: "Danijel Omrzel",
      email: "danijel.omrzel@visitlljubljana.si",
      number: "0038641386295"
    }
    var arr = []
    arr.push(contactUser)
    setUsers(arr)
    someFetchActionCreator();
  }, [dispatch]);

  const getHistory = (e, data) => {
    const getDocumentsInfoHandlerr = async () => {
      await homeDataService.getPreviousMonthsData(dispatch, data);
    };

    getDocumentsInfoHandlerr();
    //dispatch({ type: homeDataConstants.SHOW_MODAL, data });
  };



  const getQrCode = (e, data) => {
    homeDataService.getQrCode(dispatch, data);
  };


  const updateMenu = (e, data) => {

    dispatch({ type: homeDataConstants.SHOW_ADD_MENU_MODAL, data });
  };

  const addNew = (e) => {

    dispatch({ type: homeDataConstants.SHOW_ADD_MODAL });
  };


  const onUpdate = (oldData, newData) => {

    const getUpdateHandlerr = async () => {
      return await homeDataService.updateTour(dispatch, oldData);
    };

    return getUpdateHandlerr();

  };



  const onUpdatePoint = (oldData, newData) => {

    const getUpdateHandlerr = async () => {
      return await homeDataService.updatePoint(dispatch, oldData);
    };

    return getUpdateHandlerr();

  };


  const handleLogin = () => {
    window.location.href = "#/login"
  };
  return (


    <div class="login-page" >
      {!role && <div class=" button-login">
        <button
          type="button"

          onClick={handleLogin}
          class="btn btn-primary btn-lg"
        >
          Log in
        </button>
      </div>}
      <h1 class="paragraph-box">Tourism Ljubljana</h1>
      <div class="contact-box">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.name}

                >
                  <TableCell component="th" scope="row">
                    Responsible person
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.number}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <h4 class="paragraph-box">Tours</h4>
      <MaterialTable
        stickyHeader
        components={{
          Toolbar: (props) => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Button
                style={{ height: "fit-content" }}
                color="primary"
                variant="contained"
                onClick={(e) => addNew(e)}
              >
                Add tour
              </Button>
              <div style={{ width: "13rem" }}>
                <MTableToolbar {...props} />
              </div>
            </div>
          ),
          Container: (props) => <Paper {...props} elevation={8} />
        }}
        style={{
          tableLayout: "fixed",
          marginLeft: 38,
          marginRight: 38,
        }}
        icons={tableIcons}
        columns={[

          {
            title: "Name", field: "tourName",
            editable: "never"
          },
          {
            title: "Price",
            field: "tourPrice",
          },
          {
            title: "Number of executed tours for current month", field: "noOfRidesAMonth",
            editable: "never"
          },

        ]}
        actions={[
          {
            icon: () => <GetAppIcon />,
            title: "",
            onClick: (event, rowData) =>
              getHistory(event, rowData.tourId),
          },


        ]}
        onRowClick={(event, rowData) => {
          // Get your id from rowData and use with link.
          window.location.href = `#${rowData.tourId}`;
          event.stopPropagation();
        }}

        options={{
          showTitle: false,
          toolbar: true,
          filtering: false,
          paging: false,
          actionsColumnIndex: -1,
          headerStyle: { top: 0, bottom: 0, backgroundColor: "#DCE4FF", fontSize: "1em" },
          maxBodyHeight: "70vh",
          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.tableData.id % 2 === 1 ? "#ebebeb" : "#ffffff"
          })
        }}
        localization={{
          header: {
            actions: "Get monthly report/update"
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                onUpdate(newData, oldData)
                window.location.reload()
                resolve();
              }, 1);

            }),

        }}
        data={homeDataState.tours.tours}
        title=""
      />




      {homeDataState.toursWithPoints.toursWithPoints.map((tour, i) =>

        <div style={{ marginTop: "100px" }} id={tour.tourId}>

          <MaterialTable
            stickyHeader

            style={{
              tableLayout: "fixed",
              marginLeft: 38,
              marginRight: 38,

            }}
            icons={tableIcons}
            columns={[
           
              { title: "Partners", field: "point.title.en", editable: "never" },
              { title: "Partner responsible person", field: "point.contact.email" },
              { title: "Price", field: "point.price", },
              { title: "Offer name", field: "", },
              {
                title: "Update menu photo",
                render: (rowData) => {
                  const button = (
                    <Button
                      color="inherit"
                      onClick={(event) => {
                        console.log(rowData)
                        updateMenu(event, rowData.point.id)
                      }}
                    >
                
                <EditIcon/>
                    </Button>
                  );
                  return button;
                }
              },
              { title: "Coupons realized by partner in current month", field: "monthlyUsed", editable: "never" },
              {
                title: "Generate QR code",
                render: (rowData) => {
                  const button = (
                    <Button
                      color="inherit"
                      onClick={(event) => {
                        console.log(rowData)
                        getQrCode(event, rowData.point.id)
                      }}
                    >
                      Get QR code
                    </Button>
                  );
                  return button;
                }
              },
            ]}
            actions={[
             
       

            ]}
            options={{
              showTitle: true,
              toolbar: true,
              filtering: false,
              paging: false,
              actionsColumnIndex: -1,
              headerStyle: { top: 0, bottom: 0, fontSize: "1em" },
              maxBodyHeight: "70vh",

            }}
            localization={{
              header: {
                actions: "Update"
              },
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    onUpdatePoint(newData, oldData)
                    window.location.reload()
                    resolve();
                  }, 1);

                }),

            }}
            data={tour.points}
            title={tour.tourName}
          />

        </div>
      )}

<div style={{ marginTop: "100px" }} ><p> <br/><br/>     </p></div>
    </div>

  );
});

export default HomeData
