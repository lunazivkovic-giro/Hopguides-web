import React, { createContext, useReducer } from "react";
import { homeDataReducer } from "../reducers/HomeDataReducer";

export const HomeDataContext = createContext();

const HomeDataContextProvider = (props) => {

	const [homeDataState, dispatch] = useReducer(homeDataReducer, {

	
		report: {
			pointId: "",
			monthlyUsedCoupons: 0,
			name: "",
			bpartnerName : "",
			bpartnerEmail: "",
			bpratnerPhone: "",
			showModal: false,
		},

		
		tours: {
			tours: []
		},

		previousReports: {
			reports: [],
			id: "",
			showModal: false,
		},


	});

	return <HomeDataContext.Provider value={{ homeDataState, dispatch }}>{props.children}</HomeDataContext.Provider>;
};

export default HomeDataContextProvider;
