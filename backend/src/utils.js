import bcrypt from "bcrypt";

export const verifyRequiredBody = (requiredFields) => {
  return (req, res, next) => {
    const body = { ...req.body };

    // Verifico campos faltantes
    const missingFields = requiredFields.filter(
      (field) => !body.hasOwnProperty(field) || body[field] === "" || body[field] === null || body[field] === undefined
    );

    if (missingFields.length > 0) {
      return res.status(400).send({
        error: `Faltan las siguientes propiedades: ${missingFields.join(", ")}`,
      });
    }

    next();
  };
};

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (inputPassword, storedPasswordHash) => {
  return bcrypt.compare(inputPassword, storedPasswordHash);
};
