import axios from 'axios';
import { APIUrl } from "../constants/api.url";
import { CommonData } from '../utils/common';

export const verifResp = (res) => {
    return res && res.data && (res.status === 201 || res.status === 200);
  }

export class AuthService {
  static instance = axios.create();

  static async signin(data) {
    return this.instance
      .post(`${APIUrl.partners}/login`, data)
      .then((res) => {
        if (verifResp(res)) {
          res.data = !data.isPartner
            ? res.data
            : { ...res.data, role: "PARTNER" };
          CommonData.setSession(data.remember, res.data, data.isPartner);
          return true;
        }
        return false;
      })
      .catch((error) => {
        return false;
      });
  }
}
