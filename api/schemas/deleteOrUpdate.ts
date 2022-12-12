import { Schema } from "express-validator";
import checkUserExist from "../helpers/checkUserExist.js";

const deleteOrUpdate: Schema = {
  id: {
    custom: { options: checkUserExist },
  }
};

export default deleteOrUpdate;
