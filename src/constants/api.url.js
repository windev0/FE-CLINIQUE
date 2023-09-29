export class APIUrl {
  static base = 'http://127.0.0.1:3001';

  static patients = `${this.base}/patient`;

  static auth = `${this.base}/auth`;

  static admins = `${this.base}/user`;

  static consultations = `${this.base}/consultation`;

  static prescriptions = `${this.base}/prescription`;
}
