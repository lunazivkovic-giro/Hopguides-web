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

import GetAppIcon from '@material-ui/icons/GetApp';
import { useParams } from 'react-router-dom';
import { homeDataConstants } from "../constants/HomeDataConstants";
import { reportConstants } from "../constants/ReportConstants";
import EditIcon from '@mui/icons-material/Edit';

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

  const someFetchActionCreator = () => {
    const getDocumentsInfoHandler = async () => {
      await homeDataService.getData(dispatch);
      await homeDataService.getToursAndPointsData(dispatch);


    };


    getDocumentsInfoHandler();
  };


  useEffect(() => {


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
  return (


    <div class="login-page" >

<MaterialTable
        stickyHeader
      
        style={{
          tableLayout: "fixed",
          marginLeft: 38,
          marginRight: 38,
        }}
        icons={tableIcons}
        columns={[
          {
            title: "Name", field: "name",
            editable: "never"
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Number", field: "number",
            editable: "never"
          },

        ]}
        actions={[
      

        ]}

        data={users}
        title=""
      />

      <h1 class="paragraph-box">Tours</h1>
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
            title: "History",
            onClick: (event, rowData) =>
              getHistory(event, rowData.tourId),
          },

        ]}
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
            actions: "History",
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

        <div style={{ marginTop: "100px" }}>

          <MaterialTable
            stickyHeader

            style={{
              tableLayout: "fixed",
              marginLeft: 38,
              marginRight: 38,
            }}
            icons={tableIcons}
            columns={[
              { title: "Partners", field: "point.name", editable: "never" },
              { title: "Partner responsible person", field: "point.contact.email" },
              { title: "Price", field: "point.price", },
              { title: "Offer name", field: "", },
              { title: "Upload offer photo", field: "", },
              { title: "Coupons realized by partner in current month", field: "monthlyUsed", editable: "never" },

            ]}
            actions={[
              {
                icon: () => <GetAppIcon />,
                title: "QR code for partner",
                onClick: (event, rowData) =>
                  getQrCode(event, rowData.point.id),
              },
              {
                icon: () => <EditIcon />,
                title: "Add/Update menu",
                onClick: (event, rowData) =>
                  updateMenu(event, rowData.point.id),
              },

            ]}
            options={{
              showTitle: false,
              toolbar: true,
              filtering: false,
              paging: false,
              actionsColumnIndex: -1,
              headerStyle: { top: 0, bottom: 0, fontSize: "1em" },
              maxBodyHeight: "70vh",

            }}
            localization={{
              header: {
                actions: "QR code for partner",
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
            data={tour.points}
            title=""
          />

        </div>
      )}
    </div>
  );
});

export default HomeData
