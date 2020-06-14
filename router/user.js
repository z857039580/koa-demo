const userController = require('../controller/user');

const apiPrefix = '/api/v1/user';

module.exports = router => {
    router.post(apiPrefix + '/login', userController.login);
    router.post(apiPrefix + '/register', userController.register);
};
