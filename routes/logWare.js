const logWare = async (request, response, next) => {
    let start = Date.now()
    await next()
    console.log(request.method, request.url, response.statusCode, String(Date.now() - start) + 'ms')
}

module.exports = logWare