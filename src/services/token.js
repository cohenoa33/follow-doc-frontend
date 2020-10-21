export const checkToken = () => {
  if (!localStorage.token) {
    this.props.history.push("/");
  }
};
