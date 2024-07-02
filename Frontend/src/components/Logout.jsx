// Function to handle user logout
export const logout = (navigate) => {
  // Remove the token from local storage
  localStorage.removeItem("token");
  // Remove the user ID from local storage
  localStorage.removeItem("userId");
  // Navigate to the home page
  navigate("/");
};
