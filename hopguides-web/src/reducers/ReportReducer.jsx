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

			var arrReports = []
			for(var report of action.data){
				if(report.from.length == 5){
					var month = report.from.charAt(0)
					var year = report.from.substring(1,5)
					var count = report.count
					var obj = {count, month, year}
					arrReports.push(obj)
				}else{
					var month = report.from.substring(0,1)
					var year = report.from.substring(2,6)
					var count = report.count
					var obj = {count, month, year}
					arrReports.push(obj)
				}
			}

			console.log(arrReports)
			return {
				...state,
				previousReports: {
					reports : arrReports
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
