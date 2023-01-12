
import React, { useContext, useEffect, useState ,
    forwardRef,} from "react";
import Paper from "@material-ui/core/Paper";
import { homeDataService } from "../services/HomeDataService";

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
const PreviousReportTourForm = (props) => {

	let data = props.homeDataState.previousReports.reports;
	//const [documentTitle, setDocumentTitle] = useState(transferData.documentTitle);
	//const [documentDescription, setDocumentDescription] = useState(transferData.documentDescription);
	//const [id, setId] = useState(transferData.id);

	useEffect(() => {

	}, [props.dispatch]);
	const handleSubmit = (e) => {
		e.preventDefault();



		/*	var data = {
				id: id,
				documentTitle: documentTitle,
				documentDescription: documentDescription
			}
	
			documentService.editDocument(data, props.dispatch);*/
	};


	return (
		<React.Fragment>

			<div>
				<Paper square>


						<MaterialTable
							stickyHeader

							style={{
								tableLayout: "fixed",
								marginLeft: 38,
								marginRight: 38,
							}}
							icons={tableIcons}
							columns={[
								{ title: "Month", field: "month" },
								{
								  title: "Year",
								  field: "year",
								},
								{ title: "Number of tours booked", field: "count" },

							]}
							actions={[
								

							]}
							
							
							data={props.homeDataState.previousReports.reports}
							title=""
						/>




				</Paper>
			</div>
		</React.Fragment>
	);
};

export default PreviousReportTourForm;
