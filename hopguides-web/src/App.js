import "./App.css";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ReportPage from "./pages/ReportPage.jsx";
import PreviousReportPage from "./pages/PreviousReportPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { ProtectedRoute } from "./router/ProtectedRouter.jsx";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/report/:id" component={ReportPage} />
				<Route path="/previousReports/:id" component={PreviousReportPage} />
				<Route path="/404" component={PageNotFound} />
				<Redirect to="/404" />
			</Switch>
		</Router>
	);
}

export default App;
