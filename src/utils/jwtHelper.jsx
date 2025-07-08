export const getRoleFromToken = (token) => {
  try {
    let jwtData = token.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData?.role || "";
  } catch (error) {
    console.error("Invalid token:", error);
    return "";
  }
};
