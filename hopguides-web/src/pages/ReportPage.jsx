
import { React, useEffect } from "react";

import Report from "../components/Report";
import ReportContextProvider from "../contexts/ReportContext";



const ReportPage = () => {

	return (
		<div>
			<ReportContextProvider>
				<Report />
			</ReportContextProvider>
		</div>
	);
};

export default ReportPage;

