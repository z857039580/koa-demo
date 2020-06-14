const userController = require('../controller/user')

module.exports = router => {
    const apiPrefix = '/api/v1/user';

    router.post(apiPrefix + '/login', userController.login);
    router.post(apiPrefix + '/register', userController.register);
};
