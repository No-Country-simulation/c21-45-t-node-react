import { createHash } from "../utils.js";

export const usuarioDTO = (data) => {
  const { email, password, ...rest } = data;

  // Convertir email a minúsculas
  const formattedEmail = email.toLowerCase();

  // Encriptar la contraseña
  const hashedPassword = createHash(password);

  return {
    email: formattedEmail,
    password: hashedPassword,
    ...rest,
  };
};
