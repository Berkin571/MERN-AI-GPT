import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Die Email ist ein Pflichtfeld"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Das Passwort sollte mindestens 6 Zeichen lang sein."),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Der Name ist ein Pflichtfeld"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Die Nachricht ist verpflichtend."),
];
//# sourceMappingURL=validators.js.map