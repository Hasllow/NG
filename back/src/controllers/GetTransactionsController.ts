import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class GetTransactionsController {
  async handle(req: Request, res: Response) {
    const { userId = "", order = "desc", typeTransaction = "all" }: any = req.query;

    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (res.locals.userLoggedId != user?.id) {
      return res.status(500).send({ error: "Você não tem autorização para ver este extrato" });
    }

    if (typeTransaction === "credit") {
      const result = await prismaClient.transaction.findMany({
        orderBy: {
          createdAt: order,
        },
        where: {
          creditedAccountId: user?.accountId,
        },
        select: {
          id: true,
          value: true,
          createdAt: true,
          debited: {
            select: {
              User: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).send(result);
    }

    if (typeTransaction === "debit") {
      const result = await prismaClient.transaction.findMany({
        orderBy: {
          createdAt: order,
        },
        where: {
          debitedAccountId: user?.accountId,
        },
        select: {
          id: true,
          value: true,
          createdAt: true,
          credited: {
            select: {
              User: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).send(result);
    }

    const result = await prismaClient.transaction.findMany({
      orderBy: {
        createdAt: order,
      },
      where: {
        OR: [
          {
            debitedAccountId: user?.accountId,
          },
          {
            creditedAccountId: user?.accountId,
          },
        ],
      },
      select: {
        id: true,
        value: true,
        createdAt: true,

        debited: {
          select: {
            User: {
              select: {
                username: true,
              },
            },
          },
        },

        credited: {
          select: {
            User: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).send(result);
  }
}
