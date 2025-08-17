/**
 * @param {object} res- Express response object
 * @param {object|array} data= null - the payload to send
 * @param {string} [message = 'OK'] - Optional readable message 
 * @param {number} [status= 200] - HTTP status code 
 */

function sendSuccess(res, data = null, message ='OK', status= 200) {
  res.status(status).json({
    success: true,
    data,
    error: null,
    message
  })
}

/**
 * @param {object} res - Express response object
 * @param {object|array} data = null - the payload to send 
 * @param {*} [message = 'Created] - optional readable message 
 * @param {*} [status = 201] - HTTP status code
 */
function sendCreated(res, data = null, message = 'Created', status= 201){
  res.status(status).json({
    success: true,
    data,
    error: null,
    message
  })
}
/**
 * 
 * @param {object} res - Express response object
 * @param {object|array} data= null - the payload to send 
 * @param {string} [message = 'Accepted] - optional readable message  
 * @param {number} [status = 202] - HTTP status code
 */
function sendAccepted(res, data= null, message= 'Accpeted', status= 202) {
  res.status(status).json({
    success: true,
    data,
    error: null,
    message
  })
}
/** 
 * @param {object} res - Express response object
 * @param {string} [error =null] - Error type or code
 * @param {string} [message = 'Not Found'] - optional readable message
 * @param {number} [status = 404] - HTTP status code
 */
function sendNotFound (res, error='error', message='Not Found ', status=404) {
  res.status(status).json({
    success: false,
    data: null,
    error,
    message
  })
}

/** 
 * @param {object} res - Express response object
 * @param {string} [error = 'error'] - error type or code
 * @param {string} [message = 'Something went wrong'] - optional readable message
 * @param {number} [status = 400] - HTTP status code
 */
//the express error middleware can be an alternative way of error handling - using the throw new Error() 
function sendError(res, error= 'error', message ='Something went wrong', status = 400) {
res.status(status).json({
  success: false,
  data: null,
  error,
  message
})
}

function sendBadRequest(res, data, message = 'Bad Request', status= 400) {
  return res.status(status).json({
    success: false,
    data,
    error,
    message
  })
}

module.exports = 
{
  sendSuccess, 
  sendError,
  sendAccepted,
  sendCreated,
  sendNotFound,
  sendBadRequest
}