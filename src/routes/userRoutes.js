import {login, register, loginRequired} from '../controllers/userControllers';


const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            //middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request from: ${req.methods}`);
            next();
        }, loginRequired, getContacts)
        // POST Endpoint
        .post(loginRequired, addNewContact)
    app.route('/contact/:contactId')
        // get specific contact
        .get(loginRequired, getContactWithId)
        // put or patch request
        .put(loginRequired, updateContact)
        // delete request
        .delete(loginRequired, deleteContact)
    // registration route
    app.route('/auth/register')
        .post(register)
    // login route
    app.route('/auth/login')
        .post(login)
}

export default routes
