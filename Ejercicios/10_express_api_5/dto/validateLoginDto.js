// importamos Type de la libreria @sinclair/typebox
const { Type } = require("@sinclair/typebox");

// Importamos libreria ajv
const Ajv = require("ajv");

// Instanciamos la clase
const ajv = new Ajv();

// Componemos el esquema usando la libreria con la propiedad type
const loginDTOSchema = Type.Object(
	{
		email: Type.String(),
		password: Type.String(),
	},
	{
		additionalProperties: false,
	}
);

// Metemos el esquema en el ajv para generar una funcion de validacion
const validate = ajv.compile(loginDTOSchema);

const validateLoginDto = (req, res, next) => {
	// Le pasamos la funcion y validacion
	const isDTOValid = validate(req.body);

	// Si no ha pasado la validacion enviamos un 400 (bad request)
	if (!isDTOValid) return res.status(400).send("El body no es valido");

	next();
};

module.exports = validateLoginDto;
