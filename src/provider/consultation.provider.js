import axios from 'axios';
import { CommonData } from '../utils/common';
import { APIUrl } from '../constants/api.url';
import { verifResp } from './auth.provider';

export class ConsultationService {
  static instance = axios.create();

  static async getConsultations() {
    return this.instance
      .get(APIUrl.consultations, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return [];
      })
      .catch((error) => {
        console.log('ERROR::ConsultationService.getConsultations ===== ', error);
        return [];
      });
  }

  static async getConsultation(id) {
    return this.instance
      .get(`${APIUrl.consultations}/${id}`, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return [];
      })
      .catch((error) => {
        console.log('ERROR::ConsultationService.getConsultation ===== ', error);
        return [];
      });
  }

  static async createConsultation(data) {
    return this.instance
      .post(APIUrl.consultations, data, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log('ERROR::ConsultationService.createConsultation ===== ', error);
        return false;
      });
  }

  static async setConsultation(data) {
    return this.instance
      .patch(APIUrl.consultations, data, CommonData.getHeaders())
      .then((res) => {
        if (verifResp(res)) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log('ERROR::ConsultationService.setConsultation ===== ', error);
        return false;
      });
  }
}
