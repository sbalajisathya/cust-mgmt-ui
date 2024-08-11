import URL_CONSTANTS from "./config";
import customAxios from "./axios";


const headers = {
  "Content-Type": "application/json",
};

class WebServices {
  async addCustomer(data) {
    try {
      const url = `${URL_CONSTANTS.CUSTOMER_API_URL}${URL_CONSTANTS.ADD_CUSTOMER_API_URI}`;
      let addCustomerRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
      };

      const result = await customAxios.post(url, addCustomerRequest, {
        headers,
      });

      return result.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  async searchCustomer(params) {
    try {
      const url = `${URL_CONSTANTS.CUSTOMER_API_URL}${
        URL_CONSTANTS.SEARCH_CUSTOMER_API_URI + "?" + params
      }`;

      const result = await customAxios.get(url, {
        headers,
      });

      return result.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }
}

export default WebServices;
