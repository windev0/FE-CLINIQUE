import axios from 'axios';
import { CommonData } from '../utils/common';
import { APIUrl } from '../constants/api.url';
import { verifResp } from './auth.provider';

export class PatientService {
  static instance = axios.create();

  static async getPatients() {
    return this.instance
      .get(APIUrl.patients, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return [];
      })
      .catch((error) => {
        console.log('ERROR::PatientService.getPatients ===== ', error);
        return [];
      });
  }

  static async getPatient(id) {
    return this.instance
      .get(`${APIUrl.patients}/${id}`, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return [];
      })
      .catch((error) => {
        console.log('ERROR::PatientService.getPatient ===== ', error);
        return [];
      });
  }

  static async createPatient(data) {
    return this.instance
      .post(APIUrl.patients, data, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log('ERROR::PatientService.createPatient ===== ', error);
        return false;
      });
  }

  static async setPatient(data) {
    return this.instance
      .patch(APIUrl.patients, data, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log('ERROR::PatientService.setPatient ===== ', error);
        return false;
      });
  }
}
