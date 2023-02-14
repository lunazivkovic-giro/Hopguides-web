import "./App.css";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ReportPage from "./pages/ReportPage.jsx";
import PreviousReportPage from "./pages/PreviousReportPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { ProtectedRoute } from "./router/ProtectedRouter.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import SetPasswordPage from "./pages/SetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/register" component={RegisterPage} />
				<Route path="/setPassword/:email" component={SetPasswordPage} />
				<Route path="/report/:id" component={ReportPage} />
				<Route path="/previousReports/:id" component={PreviousReportPage} />
				<Route path="/forgotPassword" component={ForgotPasswordPage} />
				<Route path="/404" component={PageNotFound} />
				<Route path="/login" component={LoginPage} />
				<Route path="/" component={HomePage} />
				<Route path="/unauthorized" component={UnauthorizedPage} />
				<Redirect to="/404" />
			</Switch>
		</Router>
	);
}

export default App;
