
import { React, useEffect } from "react";

import Report from "../components/Report";
import ReportContextProvider from "../contexts/ReportContext";
import ReportModal from "../components/ReportModal";

import { authHeader } from "../helpers/auth-header";
import Axios from "axios";

var url = process.env.REACT_APP_URL || "http://localhost:3000/";
const ReportPage = () => {


	useEffect(() => {
		var token = authHeader()
		console.log(token)
		if (token == "null") {
			window.location = "#/unauthorized";
		} else {

		

			Axios.get(`${url}api/users/getRole`, { headers: { Authorization: token } }, { validateStatus: () => true },
			)
				.then((res) => {
					if (res.status === 200) {
						if ("ADMIN" == res.data || "USER" == res.data) {
						}
						else {
							window.location = "#/unauthorized";
						}
					} else {
						window.location = "#/unauthorized";
					}
				})
				.catch((err) => {
					window.location = "#/unauthorized";
				})
		}

	});

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

