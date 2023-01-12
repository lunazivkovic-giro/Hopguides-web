
import { React, useEffect } from "react";

import Report from "../components/Report";
import HomeDataContextProvider from "../contexts/HomeDataContext";
import HomeData from "../components/HomeData";


const HomePage = () => {

	return (
		<div>
			<HomeDataContextProvider>
				<HomeData />
			</HomeDataContextProvider>
		</div>
	);
};

export default HomePage;

