import { reportConstants } from "../constants/ReportConstants";


var prodCpy = {};
export const reportReducer = (state, action) => {

	switch (action.type) {

		case reportConstants.SET_TASK_REQUEST:
			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: ""
				},
			};

		case reportConstants.REPORT_GET_SUCCESS:

			return {
				...state,
				report: {
					pointId: action.data.pointId,
					monthlyUsedCoupons: action.data.monthlyUsedCoupons
				},


			};


		case reportConstants.REPORT_GET_FAILURE:
			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: ""
				},
			};

		case reportConstants.SHOW_ADD_MENU_MODAL:

			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: "",
					showModal: true
				},
			};

		case reportConstants.SHOW_ADD_MENU_MODAL:

			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: "",
					showModal: false
				},
			};

			case reportConstants.GET_MENU_SUCCESS:

			return {
				...state,
				report: {
					image: action.data,

				},
			};

			case reportConstants.GET_MENU_FAILURE:

			return {
				...state,
				report: {
					pointId: "",
					monthlyUsedCoupons: "",
					image: null,
					showModal: false
				},
			};

			case reportConstants.PREVIOUS_REPORT_GET_SUCCESS:

			return {
				...state,
				previousReports: {
					reports : action.data
				},
			};

			case reportConstants.PREVIOUS_REPORT_GET_FAILURE:

			return {
				...state,
				previousReports: {
					reports: []
				},
			};
		default:
			return state;
	}
};
