export const utils = {
  saveToken: (token: string) => localStorage.setItem('token', token),
  loadToken: () => localStorage.getItem('token'),
  deleteToken: () => localStorage.removeItem('token'),
}