/* make sure to document the response shapes using JSDocs */
function sendSuccess(res, data = null, message ='OK', status= 200) {
  res.status(status).json({
    success: true,
    data,
    error: null,
    message
  })
}

function sendCreated(res, data = null, message = 'Created', status= 201){
  res.status(status).json({
    success: true,
    data,
    error: null,
    message
  })
}

function sendAccepted(res, data= null, message= 'Accpeted', status= 202) {
  res.status(status).json({
    success: true,
    data,
    error: null,
    message
  })
}

function sendNotFound (res, error='error', message='Not Found ', status=404) {
  res.status(status).json({
    success: false,
    data: null,
    error,
    message
  })
}

function sendError(res, error= 'error', message ='Something went wrong', status = 400) {
res.status(status).json({
  success: false,
  data: null,
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
  sendNotFound
}