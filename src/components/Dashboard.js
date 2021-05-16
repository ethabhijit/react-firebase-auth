import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Container,
	CssBaseline,
	makeStyles,
	Typography,
	Button,
} from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "./Notifications";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
	},
	border: {
		border: "",
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	const [error, setError] = useState("");
	const { currentUser, signout } = useAuth();
	const history = useHistory();

	const handelLogout = async () => {
		setError("");

		try {
			await signout();
			history.push("/signin");
		} catch {
			setError("Failed to signout!");
		}
	};

	return (
		<>
			<Container className={classes.border} component="main" maxWidth="md">
				<CssBaseline />
				{error && errorMessage(error)}
				<div className={classes.paper}>
					<Typography variant="h6" gutterBottom>
						<strong>Email: </strong> {currentUser.email}
					</Typography>

					<Link
						to="/update-profile"
						style={{ marginTop: "1rem" }}
						className={classes.link}
					>
						Update Profile
					</Link>
					<Button
						variant="contained"
						style={{ marginTop: "1rem" }}
						color="secondary"
						onClick={handelLogout}
					>
						Signout
					</Button>
				</div>
			</Container>
		</>
	);
};

export default Dashboard;
