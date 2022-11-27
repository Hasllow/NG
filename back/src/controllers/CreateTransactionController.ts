import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateTransactionController {
  async handle(req: Request, res: Response) {
    const { username: creditedUsername, amount } = req.body;
    const usernameLowerCase: string = creditedUsername.toLowerCase();
    const amountNumber: number = Number(amount);

    const debitedUser = await prismaClient.user.findUnique({ where: { id: res.locals.userLoggedId } });
    const creditedUser = await prismaClient.user.findUnique({ where: { username: usernameLowerCase } });

    if (!creditedUser)
      return res.status(404).send({
        title: "Usuário não encontrado.",
        status: 404,
        detail: "Usuário destinatário da transferência não encontrado. Verifique novamente.",
      });

    if (debitedUser && debitedUser.username === usernameLowerCase)
      return res.status(401).send({
        title: "Transferência Invalida.",
        status: 401,
        detail: "Você não pode realizar uma transferência para si mesmo.",
      });

    const debitedAccount = await prismaClient.account.findUnique({ where: { id: debitedUser?.accountId } });
    const creditedAccount = await prismaClient.account.findUnique({ where: { id: creditedUser?.accountId } });

    const idDebitedAccount = String(debitedAccount?.id);
    const idCreditedAccount = String(creditedAccount?.id);
    const balanceDebitedAccountNumber = Number(debitedAccount?.balance);
    const balanceCreditedAccountNumber = Number(creditedAccount?.balance);

    if (balanceDebitedAccountNumber < amountNumber)
      return res.status(400).send({
        title: "Transferência Invalida.",
        status: 401,
        detail: "Você não possui saldo o suficiente para realizar a transferência.",
      });

    try {
      const [balanceDebit, balanceCredit, transactionLog] = await prismaClient.$transaction([
        prismaClient.account.update({
          where: { id: debitedAccount?.id },
          data: {
            balance: balanceDebitedAccountNumber - amountNumber,
          },
        }),
        prismaClient.account.update({
          where: { id: creditedAccount?.id },
          data: {
            balance: balanceCreditedAccountNumber + amountNumber,
          },
        }),
        prismaClient.transaction.create({
          data: {
            debitedAccountId: idDebitedAccount,
            creditedAccountId: idCreditedAccount,
            value: amountNumber,
          },
        }),
      ]);
      return res.status(200).send({
        title: "Transferência concluída com sucesso.",
        status: 200,
        balanceDebit,
        balanceCredit,
        transactionLog,
      });
    } catch (error) {
      return res.status(400).send({ message: "Ocorreu algum erro, tente novamente mais tarde!", error });
    }
  }
}
