import connect from 'syncano-server'

process.env.SYNCANO_HOST = META.request.HTTP_HOST
const server = connect({
  token: META.token,
  instanceName: META.instance
})

export default server
