import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const [_, tokenString] = req.headers.authorization?.split(" ") ?? [];

  console.log("oi");
  jwt.verify(tokenString, "SECRET", (err: any, decoded: any) => {
    if (err) return res.status(401).send({ message: "Token invalido" });

    res.locals.userLoggedId = decoded.id;
    next();
  });
};
