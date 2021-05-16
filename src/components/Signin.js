import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Typography,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Box,
	Container,
	makeStyles,
	Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Copyright from "./Copyright";
import { errorMessage, loadingMessage } from "./Notifications";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: "none",
	},
}));

const Signin = () => {
	const classes = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const { signin } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handelSubmit = async (e) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signin(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to signin!");
		}
		setLoading(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				{loading && loadingMessage("Loading...")}
				{error && errorMessage(error)}
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handelSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						inputRef={emailRef}
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="password"
						inputRef={passwordRef}
						label="password"
						name="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="/forgot-password" className={classes.link}>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to="/signup" className={classes.link}>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Signin;
