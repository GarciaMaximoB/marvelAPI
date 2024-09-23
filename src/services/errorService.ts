const ErrorService = {
  handleError(errorMsg: string) {
    console.log("Error: " + errorMsg);
    alert(errorMsg);
  },
};

export { ErrorService };
