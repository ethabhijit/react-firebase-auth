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

const Signup = () => {
	const classes = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handelSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Password do not match!");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch {
			setError("Failed to create an account!");
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
					Sign Up
				</Typography>
				<form className={classes.form} onSubmit={handelSubmit}>
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
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="confirmPassword"
						inputRef={passwordConfirmRef}
						label="Confirm Password"
						name="confirmPassword"
						autoComplete="confirm-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container>
						<Grid item>
							<Link to="/signin" className={classes.link}>
								{"Already have an account? Sign In"}
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

export default Signup;
