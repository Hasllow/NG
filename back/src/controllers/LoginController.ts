import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../database/prismaClient";

type User = {
  id: string;
  username: string;
  password: string;
  accountId: string;
};

export class LoginController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const usernameLowerCase: string = username.toLowerCase();

    const user: User | null = await prismaClient.user.findUnique({
      where: { username: usernameLowerCase },
    });

    if (!user) {
      return res.status(401).send({
        type: "/errors/incorrect-user-pass",
        title: "Usuário ou senha inválidos.",
        status: 401,
        detail: "Autenticação falhou devido a username ou senha inválidos.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const token = jwt.sign({ id: user.id }, "SECRET", { expiresIn: "1d" });
      return res.status(200).send({
        title: "Login realizado com sucesso.",
        status: 200,
        data: {
          idLoggedUser: user.id,
          token,
        },
      });
    } else {
      return res.status(401).send({
        type: "/errors/incorrect-user-pass",
        title: "Usuário ou senha inválidos.",
        status: 401,
        detail: "Autenticação falhou devido a username ou senha inválidos.",
      });
    }
  }
}
