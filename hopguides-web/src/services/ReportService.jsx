import Axios from "axios";
import { reportConstants } from "../constants/ReportConstants";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const reportService = {
	getReport,
	addMenu,
	getMenu

};


async function getReport(dispatch ,id) {
	dispatch(request());
	
	console.log( id)
	await Axios.get(`${url}api/reports/` + id, { validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success(res.data));
			} else {
				
				var error = "Error while fetching data"
				dispatch(failure(error));
			}
		})
		.catch((err) => {
		
			var error = "Unknown error, please try again later."
				dispatch(failure(error));
		});

	function request() {
		return { type: reportConstants.REPORT_GET_REQUEST };
	}
	function success(data) {
		return { type: reportConstants.REPORT_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: reportConstants.REPORT_GET_FAILURE, errorMessage: message };
	}
}




function addMenu( tf, dispatch) {
	
	if(tf){


		dispatch(success());
	}else{
		dispatch(failure("Error while uploading new menu"));
	}

	function success() {
		return { type: reportConstants.MENU_SUBMIT_SUCCESS };
	}
	function failure(error) {
		return { type: reportConstants.MENU_SUBMIT_FAILURE, error };
	}
}





async function getMenu( dispatch,id) {
	
	console.log(id)
	await Axios.get(`${url}api/poi/getFile/ `+id,{ validateStatus: () => true,  responseType: 'blob'})
		.then((res) => {
			if (res.status === 200) {
				console.log(res.data)
				//FileDownload(res.data, fileName);
				//window.location.reload(true);
				var objectURL = URL.createObjectURL(res.data);
				console.log(objectURL)
				dispatch(success(objectURL));
			}
		})
		.catch((err) => {
			dispatch(failure("Error while getting menu"));
		});
		function success(data) {
			
			return { type: reportConstants.GET_MENU_SUCCESS, data:data };
		}
		function failure(error) {
			return { type: reportConstants.GET_MENU_FAILURE, error };
		}
}
