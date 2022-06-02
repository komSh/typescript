const router = require('express').Router();

const user_controller  = require('../controller/user.controller');

const authorization = require('../middleware/authorization');

const invoice_controller  = require('../controller/invoice_controller');

const menu_controller  = require('../controller/menu.controller');

// REGISTER ROUTE
router.post('/register', user_controller.user_register);

router.post('/post-test', (request, res) => {
    console.log('Got body:', request.body);
    res.sendStatus(200);
});


router.post('/login', user_controller.user_login);


router.get('/verify-token', authorization, user_controller.user_token_verify);

router.post('/invoices/create', authorization, invoice_controller.upload_invoice);


router.post('/invoices/status', authorization, invoice_controller.change_invoice_status);

router.get('/invoices', authorization, invoice_controller.get_all_invoices);


router.get('/user/invoices', authorization, invoice_controller.get_user_invoices);


router.post('/menu/create', authorization, menu_controller.create_menu);


router.get('/menu', authorization, menu_controller.get_menu);

router.get('/menu/cancel', authorization, menu_controller.cancel_menu);


module.exports = router;
