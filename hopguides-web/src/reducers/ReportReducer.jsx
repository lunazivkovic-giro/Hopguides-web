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
	

			
		default:
			return state;
	}
};
