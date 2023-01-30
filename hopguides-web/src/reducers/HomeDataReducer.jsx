import { InfoSharp } from "@mui/icons-material";
import { homeDataConstants } from "../constants/HomeDataConstants";

function convertMonth(month){
	if(month == 1){

		return "January"

	}else if(month == 2){

		return "February"
	}else if(month == 3){
		
		return "March"
	}else if(month == 4){

		return "April"
		
	}else if(month == 5){
		
		return "May"
	}else if(month == 6){
		
		return "June"
	}else if(month == 7){
		
		return "July"
	}else if(month == 8){
		
		return "August"
	}else if(month == 9){
		
		return "September"
	}else if(month == 10){
		
		return "October"
	}else if(month == 11){
		
		return "November"
	}else if(month == 12){
		
		return "December"
	}

}
export const homeDataReducer = (state, action) => {

	switch (action.type) {

		case homeDataConstants.DATA_GET_SUCCESS:

			return {
				...state,
				tours: {
					tours: action.data
				},
			};

		case homeDataConstants.DATA_GET_SUCCESS:

			return {
				...state,
				tours: {
					tours: []
				},
			};

			case homeDataConstants.DATA_TOUR_POINTS_GET_SUCCESS:

			return {
				...state,
				toursWithPoints: {
					toursWithPoints: action.data
				},
			};

		case homeDataConstants.DATA_TOUR_POINTS_GET_FAILURE:

			return {
				...state,
				toursWithPoints: {
					toursWithPoints: []
				},
			};


		case homeDataConstants.PREVIOUS_DATA_GET_SUCCESS:

			var arrReports = []
			for (var report of action.data) {
				if (report.from.length == 5) {
					var monthNum = report.from.charAt(0)
					monthNum = parseInt(monthNum) + 1
					var month = convertMonth(monthNum)
					var year = report.from.substring(1, 5)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				} else {
					var monthNum = report.from.substring(0, 1) 
					monthNum = parseInt(monthNum) + 1
					var month = convertMonth(monthNum)
					var year = report.from.substring(2, 6)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				}
			}

			return {
				...state,
				previousReports: {
					reports: arrReports,
					showModal: true,
				},
			};

		case homeDataConstants.PREVIOUS_DATA_GET_FAILURE:

			return {
				...state,
				previousReports: {
					reports: []
				},
			};



		case homeDataConstants.SHOW_MODAL:
			return {
				...state,
				previousReports: {
					showModal: true,
					id: action.data
				}

			};


		case homeDataConstants.HIDE_MODAL:
			return {
				...state,
				previousReports: {
					showModal: false
				}



			};


			case homeDataConstants.SHOW_ADD_MENU_MODAL:

			
			return {
				...state,
				id: action.data,
				showEditMenuModal: true

			};


		case homeDataConstants.HIDE_ADD_MENU_MODAL:
			return {
				...state,
				id:"",
				
				showEditMenuModal: false



			};


		case homeDataConstants.SHOW_ADD_MODAL:
			return {
				...state,
				showModal: true

			};


		case homeDataConstants.HIDE_ADD_MODAL:
			return {
				...state,
				showModal: false



			};


		case homeDataConstants.TOUR_SUBMIT_SUCCESS:

			return {
				...state,

			};

		case homeDataConstants.TOUR_UPDATE_SUCCESS:

			return {
				...state,
				tours: {
					tours: action.data
				},
			};

		case homeDataConstants.TOUR_UPDATE_FAILURE:

			return {
				...state,
				tours: {
					tours: []
				},
			};

			case homeDataConstants.POI_UPDATE_SUCCESS:

			return {
				...state,
				tours: {
					tours: action.data
				},
			};

		case homeDataConstants.POI_UPDATE_FAILURE:

			return {
				...state,
				tours: {
					tours: []
				},
			};


		default:
			return state;
	}
};
