import api from "../../lib/api"
import type { Constants } from "./constants";

const constRepository = {
  get: async (): Promise<Constants> => {
    const result = await api.get('/constants');
    const constants = result.data;
    console.log(JSON.stringify(constants, null, 2));
    return constants;
  }
}


export default constRepository;