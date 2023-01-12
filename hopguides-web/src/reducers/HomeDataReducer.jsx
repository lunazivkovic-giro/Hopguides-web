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
		default:
			return state;
	}
};
