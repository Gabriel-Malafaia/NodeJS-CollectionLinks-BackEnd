import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users.interfaces";
import { showUserSchema } from "../../schemas/users.schemas";

const createUserService = async (payload: IUserRequest) => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = userRepo.create(payload);
  await userRepo.save(newUser);

  const response = await showUserSchema.validate(newUser, {
    stripUnknown: true,
  });

  return response;
};

export default createUserService;
