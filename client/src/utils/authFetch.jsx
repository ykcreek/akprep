import { logout } from "../context/AuthContext"; 

export async function authFetch(url, options = {}, onUnauthorized) {
  const response = await fetch(url, options);

  if (response.status === 401) {
    if (typeof onUnauthorized === "function") {
      onUnauthorized();
    }
    return { unauthorized: true };
  }

  return response;
}
