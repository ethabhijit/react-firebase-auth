import Alert from "@material-ui/lab/Alert";

export const errorMessage = (message) => {
	return (
    <div style={{ width: "100%"}}>
      <Alert severity="error">{message}</Alert>
    </div>
  );
};

export const successMessage = (message) => {
  return (
    <div style={{ width: "100%"}}>
     <Alert severity="success">{message}</Alert>
    </div>
  );
};

export const loadingMessage = (message) => {
  return (
    <div style={{ width: "100%"}}>
     <Alert severity="info">{message}</Alert>
    </div>
  );
};
