const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'signup': {
     return [ 
        body('name', 'Name doesnt exists').not().isEmpty().exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password','Password must contain at least 6 caracters ').exists().isLength({ min: 6 }),
        body('password','Password must contain a number').matches(/\d/),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]   
    }
  }
}