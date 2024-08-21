const Schemes = require('./scheme-model')
    
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId(req, res, next) {
  try {
    const scheme = await Schemes.findById(req.params.scheme_id);
    if (scheme) {
      req.scheme = scheme;
      next();
    } else {
      res.status(404).json({ message: 'Scheme not found' });
    }
  } catch (err) {
    next(err);
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
function validateScheme(req, res, next) {
  const { scheme_name } = req.body;
  if (!scheme_name || typeof scheme_name !== 'string' || !scheme_name.trim()) {
    res.status(400).json({ message: 'Invalid scheme_name' });
  } else {
    next();
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
function validateStep(req, res, next) {
  const { step_number, instructions } = req.body;
  if (
    typeof step_number !== 'number' ||
    step_number <= 0 ||
    !instructions ||
    typeof instructions !== 'string' ||
    !instructions.trim()
  ) {
    res.status(400).json({ message: 'Invalid step data' });
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
