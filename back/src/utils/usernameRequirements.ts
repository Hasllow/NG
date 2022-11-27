import { prismaClient } from "../database/prismaClient";

type testUsernameType = (username: string) => Promise<{
  status: boolean;
  title: string;
  detail: string;
}>;
type testedUsernameType = { status: boolean; title: string; detail: string };

const usernameRequirements: testUsernameType = async (username: string) => {
  const getExistentUser: object | null = await prismaClient.user.findUnique({
    where: { username },
  });

  if (getExistentUser) {
    return { status: false, title: "Username existente.", detail: "O username escolhido já está em uso." };
  }

  if (username.length < 3) {
    return {
      status: false,
      title: "Username inválido.",
      detail: "Cadastro falhou devido a username inválido. O username deve ser composto de 3 ou mais caracteres.",
    };
  }

  return { status: true, title: "Username válido.", detail: "Username válido." };
};

export { usernameRequirements, testedUsernameType };
