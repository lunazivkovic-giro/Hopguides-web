import { userConstants } from "../constants/UserConstants";


export const userReducer = (state, action) => {
	
	switch (action.type) {

		case userConstants.LOGIN_FAILURE:
			return {
				loginError: {
					showError: true,
					errorMessage: "Incorrect email or password",
				},
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loginError: {
					showError: false,
					errorMessage: "",
				},
			};

	
		default:
			return state;
	}
};
