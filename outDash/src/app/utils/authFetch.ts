export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado. Usuário não autenticado.");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `${token}`);

  return fetch(url, {
    ...options,
    headers,
    credentials: "include", 
  });
};
