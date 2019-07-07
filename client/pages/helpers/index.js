
export default function authHeader() {
  // return authorization header with basic auth credentials
  const token = localStorage.getItem('token');

  if (token) {
    return { authorization: token };
  }
  return {};
}
