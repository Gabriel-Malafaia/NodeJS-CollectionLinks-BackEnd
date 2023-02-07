import { IUserDb } from "../../interfaces/users.interfaces";
import { showUserSchema } from "../../schemas/users.schemas";

const getUserService = async (payload: IUserDb) => {
  const response = await showUserSchema.validate(payload, {
    stripUnknown: true,
  });

  return response;
};

export default getUserService;
