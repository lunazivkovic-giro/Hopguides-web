
import { React, useEffect } from "react";

import Report from "../components/Report";
import ReportContextProvider from "../contexts/ReportContext";
import ReportModal from "../components/ReportModal";

import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const ReportPage = () => {




	return (
		<div>
			<ReportContextProvider>
				<Report />
				<ReportModal />
			</ReportContextProvider>
		</div>
	);
};

export default ReportPage;

