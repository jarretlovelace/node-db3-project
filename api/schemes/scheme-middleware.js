const Schemes = require('./scheme-model')
    
async function checkSchemeId(req, res, next) {
    try {
      const scheme = await Schemes.findById(req.params.scheme_id);
      if (scheme) {
        req.scheme = scheme;
        next();
      } else {
        res.status(404).json({ message: `scheme with scheme_id ${req.params.scheme_id} not found` });
      }
    } catch (err) {
      next(err);
    }
  }


  function validateScheme(req, res, next) {
    const { scheme_name } = req.body;
  
    if (!scheme_name || typeof scheme_name !== 'string' || !scheme_name.trim()) {
    
      return res.status(400).json({ message: 'invalid scheme_name' });
    }
  
    next();
  }


function validateStep(req, res, next) {
  const { step_number, instructions } = req.body;
  if (
    typeof step_number !== 'number' ||
    step_number <= 0 ||
    !instructions ||
    typeof instructions !== 'string' ||
    !instructions.trim()
  ) {
    res.status(400).json({ message: 'invalid step' }); 
  } else {
    next();
  }
}
module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
