export const authHeaderAdd = (init: RequestInit) => {
  const headers = init.headers ? new Headers(init.headers) : new Headers();
  headers.set("Authorization", `${localStorage.getItem("token")}`);
  return {...init, headers};
}