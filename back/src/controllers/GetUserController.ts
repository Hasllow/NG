import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const { userId = "" }: any = req.query;

    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (res.locals.userLoggedId != user?.id) {
      return res.status(500).send({ error: "Você não tem autorização para ver este extrato" });
    }

    const result = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        account: {
          select: {
            balance: true,
          },
        },
      },
    });
    return res.status(200).send(result);
  }
}
