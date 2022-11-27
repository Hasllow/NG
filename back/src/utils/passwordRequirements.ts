type testPasswordType = {
  status: boolean;
  title: string;
  detail: string;
};

const passwordRequirements = function (password: string): testPasswordType {
  if (password.length < 8) {
    return {
      status: false,
      title: "Senha muito curta.",
      detail: "Senha muito curta, deve conter mais de 8 caracteres",
    };
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    return {
      status: false,
      title: "Senha inválida.",
      detail: "A senha deve conter pelo menos 8 caracteres, um número e uma letra maiúscula",
    };
  }

  return { status: true, title: "Senha Válida.", detail: "Senha Válida." };
};

export { passwordRequirements, testPasswordType };
