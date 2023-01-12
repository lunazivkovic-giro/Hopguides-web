import Axios from "axios";
import { homeDataConstants } from "../constants/HomeDataConstants";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const homeDataService = {
	getData,

};



async function getData(dispatch) {
	dispatch(request());
	
	
	await Axios.get(`${url}api/pnl/tour/allReport`, { validateStatus: () => true })
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
		return { type: homeDataConstants.DATA_GET_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.DATA_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.DATA_GET_FAILURE, errorMessage: message };
	}
}

