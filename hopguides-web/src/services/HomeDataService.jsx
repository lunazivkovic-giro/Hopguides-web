import Axios from "axios";
import { homeDataConstants } from "../constants/HomeDataConstants";

import { authHeader } from "../helpers/auth-header";
var url = process.env.REACT_APP_URL || "http://localhost:3000/";

export const homeDataService = {
	getData,
	getToursAndPointsData,
	getPreviousMonthsData,
	addTour,
	updateTour,
	getQrCode,
	updatePoint

};


function addTour(tour, dispatch) {

	console.log( tour)
	dispatch(request());
	var token = authHeader()
	Axios.post(`${url}api/pnl/tour/add`, tour, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
				window.location.refresh()
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.TOUR_SUBMIT_REQUEST };
	}
	function success() {
		return { type: homeDataConstants.TOUR_SUBMIT_SUCCESS };
	}
	function failure(error) {
		
		return { type: homeDataConstants.TOUR_SUBMIT_FAILURE, error };
	}
}


function updatePoint( dispatch, point) {

	dispatch(request());
	var token = authHeader()
	Axios.post(`${url}api/poi/update/`+point.point.id, point, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.POI_UPDATE_REQUEST };
	}
	function success() {
		return { type: homeDataConstants.POI_UPDATE_SUCCESS };
	
	}
	function failure(error) {
		
		return { type: homeDataConstants.POI_UPDATE_FAILURE, error };
	}
}


function updateTour( dispatch, tour) {

	dispatch(request());
	var token = authHeader()
	Axios.post(`${url}api/pnl/tour/update/`+tour.id, tour, {
		headers: {
		  Authorization: token 
		}},{ validateStatus: () => true })
		.then((res) => {
			if (res.status === 200) {
				dispatch(success());
			} else if (res.status === 215) {
				dispatch(failure(res.data.response));
			}else{
				
				dispatch(failure(res.data.error));
			}
		})
		.catch((err) =>{		
				dispatch(failure(err));
			})

	function request() {
		
		return { type: homeDataConstants.TOUR_UPDATE_REQUEST };
	}
	function success() {
		return { type: homeDataConstants.TOUR_UPDATE_SUCCESS };
	
	}
	function failure(error) {
		
		return { type: homeDataConstants.TOUR_UPDATE_FAILURE, error };
	}
}


async function getPreviousMonthsData(dispatch ,id) {
	dispatch(request());
	
	if(id==""){
		console.log("allalalal")
		id = "x"
	}
	console.log(id)
	await Axios.get(`${url}api/pnl/tour/previousReport/` + id, { validateStatus: () => true })
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
		return { type: homeDataConstants.PREVIOUS_DATA_GET_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.PREVIOUS_DATA_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.PREVIOUS_DATA_GET_FAILURE, errorMessage: message };
	}
}

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


async function getToursAndPointsData(dispatch) {
	dispatch(request());
	
	
	await Axios.get(`${url}api/pnl/tour/allToursWithPoints`, { validateStatus: () => true })
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
		return { type: homeDataConstants.DATA_TOUR_POINTS_GET_REQUEST };
	}
	function success(data) {
		return { type: homeDataConstants.DATA_TOUR_POINTS_GET_SUCCESS, data: data };
	}
	function failure(message) {

		return { type: homeDataConstants.DATA_TOUR_POINTS_GET_FAILURE, errorMessage: message };
	}
}



async function getQrCode(dispatch,id) {
	
	var token = authHeader()

	const FileDownload = require("js-file-download");

	await Axios.get(`${url}api/reports/qr/ `+id, { headers: { Authorization: token} , validateStatus: () => true,  responseType: 'blob'})
		.then((res) => {
			if (res.status === 200) {
				FileDownload(res.data, id.trim() + ".png");
				//window.location.reload(true);
			}
		})
		.catch((err) => {

		});

}