import React, { createContext, useReducer } from "react";
import { reportReducer } from "../reducers/ReportReducer";

export const ReportContext = createContext();

const ReportContextProvider = (props) => {

	const [reportState, dispatch] = useReducer(reportReducer, {

	
		report: {
			pointId: "",
			monthlyUsedCoupons: 0,
			image: null,
			showModal: false,
		},
		
		
	});

	return <ReportContext.Provider value={{ reportState, dispatch }}>{props.children}</ReportContext.Provider>;
};

export default ReportContextProvider;
