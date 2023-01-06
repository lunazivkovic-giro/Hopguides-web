
import { React, useEffect } from "react";

import Report from "../components/Report";
import ReportContextProvider from "../contexts/ReportContext";
import ReportModal from "../components/ReportModal";


const ReportPage = () => {

	return (
		<div>
			<ReportContextProvider>
				<Report />
				<ReportModal/>
			</ReportContextProvider>
		</div>
	);
};

export default ReportPage;

