import axios from 'axios';
import { CommonData } from '../utils/common';
import { APIUrl } from '../constants/api.url';
import { verifResp } from './auth.provider';

export class PrescriptionService {
  static instance = axios.create();

  static async getPrescriptions() {
    return this.instance
      .get(APIUrl.prescriptions, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return [];
      })
      .catch((error) => {
        console.log('ERROR::PrescriptionService.getPrescriptions ===== ', error);
        return [];
      });
  }

  static async getPrescription(id) {
    return this.instance
      .get(`${APIUrl.prescriptions}/${id}`, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return [];
      })
      .catch((error) => {
        console.log('ERROR::PrescriptionService.getPrescription ===== ', error);
        return [];
      });
  }

  static async createPrescription(data) {
    return this.instance
      .post(APIUrl.prescriptions, data, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log('ERROR::PrescriptionService.createPrescription ===== ', error);
        return false;
      });
  }

  static async setPrescription(data) {
    return this.instance
      .patch(APIUrl.prescriptions, data, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log('ERROR::PrescriptionService.setPrescription ===== ', error);
        return false;
      });
  }
}
