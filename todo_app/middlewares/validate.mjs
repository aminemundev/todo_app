import { BadRequestError } from "../utils/utils.mjs";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // .replace(/['"]+/g, '') removes all double and single quotes
      const errorMessage = error.details
        .map((detail) => detail.message.replace(/['"]+/g, ""))
        .join(", ");

      return next(new BadRequestError(errorMessage));
    }

    next();
  };
};
