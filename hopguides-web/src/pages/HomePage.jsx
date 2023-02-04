
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import HomePageData from "../components/HomePageData";
import PreviousReportTourModal from "../components/PreviousReportTourModal";
import AddNewTourForm from "../components/AddNewTourForm";
import UpdateMenuModal from "../components/UpdateMenuModal";
const HomePage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<HomePageData />
				<PreviousReportTourModal/>
				<AddNewTourForm/>
				<UpdateMenuModal/>
			</HomeDataContextProvider>
		</div>
	);
};

export default HomePage;

