import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useContext,
  } from "react";
  import MaterialTable from "material-table";
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
  
  
import GetAppIcon from '@material-ui/icons/GetApp';
import { useParams } from 'react-router-dom';
import { homeDataConstants } from "../constants/HomeDataConstants";
  
  
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
    
    const {homeDataState, dispatch } = useContext(HomeDataContext);
   
    const someFetchActionCreator = () => {
      const getDocumentsInfoHandler = async () => {
        await homeDataService.getData(dispatch);
        
       
      };

   
      getDocumentsInfoHandler();
    };

    
    useEffect(() => {
  
   
      someFetchActionCreator();
    }, [dispatch]);
  
    const getHistory = (e, data) => {
      const getDocumentsInfoHandlerr = async () => {
        await homeDataService.getPreviousMonthsData(dispatch, data);
      };

   
      getDocumentsInfoHandlerr();
      //dispatch({ type: homeDataConstants.SHOW_MODAL, data });
    };
    return (
      
      <div class="login-page">
        <h1 class="paragraph-box">Tours</h1>
              <MaterialTable
                stickyHeader
                
                style={{
                  tableLayout: "fixed",
                  marginLeft: 38,
                  marginRight: 38,
                }}
                icons={tableIcons}
                columns={[
                  { title: "Name", field: "tourName" },
                  {
                    title: "Price",
                    field: "tourPrice",
                  },
                  { title: "Number of executed tours for current month", field: "noOfRidesAMonth" },
                 
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
                  actionsColumnIndex: -1,
                  headerStyle: {top:0, bottom:0},
                  maxBodyHeight: "70vh",  
                }}
                localization={{
                  header: {
                    actions: "History",
                  },
                }}
                data={homeDataState.tours.tours}
                title=""
              />
              </div>
    );
  });
  
  export default HomeData
  