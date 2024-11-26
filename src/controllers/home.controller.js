import userModel from '../models/user.model.js';
const homeController = {
    index: async (req, res, next) => {
        try {
            const users = await userModel.getAllUsers();
            return res.json(users);
        } catch (error) {
            return res.json(error)
        }
        /**
         * 
        try {

            res.render('client/pages/index.ejs', {
                title: 'Admin Dashboard',
                layout: 'client/layouts/default.ejs'
            });
        } catch (error) {
            res.json({
                title: 'title',
                error_at: 'error at homeController',
                message: error
            })
        }
         */


    },
    about: (req, res) => {
        res.render('home', { title: 'Home Page' });
    }
}
export default homeController;