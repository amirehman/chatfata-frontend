const middleware = {}

middleware['isAuth'] = require('../middleware/isAuth.js')
middleware['isAuth'] = middleware['isAuth'].default || middleware['isAuth']

middleware['isNotAuth'] = require('../middleware/isNotAuth.js')
middleware['isNotAuth'] = middleware['isNotAuth'].default || middleware['isNotAuth']

middleware['isPublished'] = require('../middleware/isPublished.js')
middleware['isPublished'] = middleware['isPublished'].default || middleware['isPublished']

middleware['OnRouteChange'] = require('../middleware/OnRouteChange.js')
middleware['OnRouteChange'] = middleware['OnRouteChange'].default || middleware['OnRouteChange']

export default middleware
