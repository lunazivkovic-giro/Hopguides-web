import Axios from "axios";
import { reportConstants } from "../constants/ReportConstants";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const reportService = {
	getReport,

};


async function getReport(dispatch) {
	dispatch(request());
	
	await Axios.get(`${url}api/reports/12345`, { validateStatus: () => true })
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



