import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500],
		},
		secondary: {
			main: pink[400],
		},
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute path="/" exact component={Dashboard} />
						<PrivateRoute path="/update-profile" component={UpdateProfile} />
						<Route path="/signin" component={Signin} />
						<Route path="/signup" component={Signup} />
						<Route path="/forgot-password" component={ForgotPassword} />
					</Switch>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
};

export default App;
