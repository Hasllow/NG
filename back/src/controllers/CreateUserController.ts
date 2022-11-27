import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { passwordRequirements, testPasswordType } from "../utils/passwordRequirements";
import { testedUsernameType, usernameRequirements } from "../utils/usernameRequirements";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const usernameLowerCase: string = username.toLowerCase();

    const passedUsernameRequirement: testedUsernameType = await usernameRequirements(usernameLowerCase);
    if (!passedUsernameRequirement.status) {
      return res.status(401).send({
        type: "/errors/incorrect-user-pass",
        title: passedUsernameRequirement.title,
        status: 401,
        detail: passedUsernameRequirement.detail,
      });
    }

    const passedPasswordRequirements: testPasswordType = passwordRequirements(password);
    if (!passedPasswordRequirements.status) {
      return res.status(401).send({
        type: "/errors/incorrect-user-pass",
        title: passedPasswordRequirements.title,
        status: 401,
        detail: passedPasswordRequirements.detail,
      });
    }

    try {
      const salt = await bcryptjs.genSalt(10);
      const passwordHashed = await bcryptjs.hash(password, salt);

      const newAccount = await prismaClient.account.create({
        data: { balance: 100 },
      });
      const newUser = await prismaClient.user.create({
        data: {
          username: usernameLowerCase,
          password: passwordHashed,
          accountId: newAccount.id,
        },
      });

      return res.status(200).send({
        title: "Cadastro Realizado com Sucesso",
        status: 200,
        detail: "Cadastro Realizado com Sucesso",
      });
    } catch (error) {
      return res.status(401).send({
        title: "Generic Error",
        status: 401,
        detail: error,
      });
    }
  }
}
