// importamos Type de la libreria @sinclair/typebox
const { Type } = require("@sinclair/typebox");

// Importamos libreria ajv
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addErrors = require("ajv-errors");

// Componemos el esquema usando la libreria con la propiedad type
const loginDTOSchema = Type.Object(
	{
		email: Type.String({
			format: "email",
			errorMessage: {
				type: " El tipo de email debe ser un string",
				format: "El email debe contener un correo electronico valido",
			},
		}),
		password: Type.String({
			errorMessage: {
				type: " El tipo de password debe ser un string",
			},
		}),
	},
	{
		additionalProperties: false,
		errorMessage: {
			type: "Debe ser un objeto",
			additionalProperties: "El formato del bojeto no es valido",
			required: {
				email: "El campo email es requerido",
				password: "El campo password es requerido",
			},
		},
	}
);

// Instanciamos la clase
const ajv = new Ajv({ allErrors: true });

// Funciones para extender la funcionalidad de Ajv
// addFormats añade formato de validación (lo aplicamos al email)
addFormats(ajv, ["email"]);

// addErrors permite personalizar los errores
addErrors(ajv, { keepErrors: false });

// Metemos el esquema en el ajv para generar una funcion de validacion
const validate = ajv.compile(loginDTOSchema);

const validateLoginDto = (req, res, next) => {
	// Le pasamos la funcion y validacion
	const isDTOValid = validate(req.body);

	// Si no ha pasado la validacion enviamos un 400 (bad request)
	if (!isDTOValid)
		return res
			.status(400)
			.send(ajv.errorsText(validate.errors, { separator: "\n" }));

	next();
};

module.exports = validateLoginDto;
