import { homeDataConstants } from "../constants/HomeDataConstants";


var prodCpy = {};
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
					var month = report.from.charAt(0)
					var year = report.from.substring(1, 5)
					var count = report.count
					var obj = { count, month, year }
					arrReports.push(obj)
				} else {
					var month = report.from.substring(0, 1)
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
