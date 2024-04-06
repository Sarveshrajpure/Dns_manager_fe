import cookie from "react-cookies";

export const getTokenCookie = () => localStorage.getItem("x-access-token");
export const removeTokenCookie = async () => {
  let response = await cookie.remove("x-access-token", { path: "/" });
  return response;
};
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};
