export class CommonData {
  static user = {};

  static removeSession = () => localStorage.removeItem('user');

  static getLogin() {
    const user = localStorage.getItem('user');
    if (user) {
      const account = JSON.parse(user);

      this.user = {
        ...account,
        isAdmin: account?.type === 'MEDECIN',
      };
      return this.user;
    }
    return {};
  }

  // set the token and user from the session storage
  static setSession(remember, user) {
    const logDate = new Date().getTime();
    const account = { ...user, remember: remember ?? false, logDate };
    localStorage.setItem('user', JSON.stringify(account));
  }

  static getHeaders(multipart) {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
        Authorization: `Bearer ${this.getLogin()?.accessToken}`,
      },
    };
  }
}
