import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { errorMessage, loadingMessage, successMessage } from "./Notifications";
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

const ForgotPassword = () => {
	const classes = useStyles();
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handelSubmit = async (e) => {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for furtur instructions");
		} catch {
			setError("Failed to reset password!");
		}
		setLoading(false);
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					{loading && loadingMessage("Loading...")}
					{message && successMessage(message)}
					{error && errorMessage(error)}
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Password Reset
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
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Reset Password
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="/signin" className={classes.link}>
									Need to signin! Click here
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</>
	);
};

export default ForgotPassword;
