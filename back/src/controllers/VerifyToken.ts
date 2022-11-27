import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response) => {
  const { tokenString } = req.body ?? [];

  jwt.verify(tokenString, "SECRET", (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        type: "/errors/incorrect-user-pass",
        title: "Token inválido.",
        status: 401,
        detail: "Autenticação falhou devido a token inválidos.",
      });
    }

    return res.status(200).send({
      title: "Login realizado com sucesso.",
      status: 200,
      data: { userId: decoded.id },
    });
  });
};
