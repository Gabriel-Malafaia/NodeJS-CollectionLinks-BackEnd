import { IUserLogin } from "../../interfaces/sessions.interface";
import { IUserDb } from "../../interfaces/users.interfaces";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../errors";
import { showUserSchema } from "../../schemas/users.schemas";

const loginUserService = async (payload: IUserLogin, payloadDB: IUserDb) => {
  const { password, email } = payload;
  const { password: passwordDB, id } = payloadDB;
  const isEqualPassword = compareSync(password, passwordDB);

  if (!isEqualPassword) {
    throw new AppError("Email or password is invalid.", 401);
  }

  const secretKey =
    process.env.SECRET_KEY || "583564fd-ca2f-4a4c-a0e6-1dfeb428ba8f";

  const token = sign({ id }, secretKey, {
    expiresIn: "24h",
    subject: email,
  });

  const response = await showUserSchema.validate(payloadDB, {
    stripUnknown: true,
  });
  
  return { user: response, token };
};

export default loginUserService;
