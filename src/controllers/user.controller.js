import userModel from "../models/user.model.js";

const userController = {
    index: async (req, res) => {
        try {
            const users = await userModel.getAllUsers();
            return res.render('admin/pages/user.ejs', {
                layout: 'admin/layouts/default.ejs',
                users
            })

        } catch (error) {
            return res.json(error)
        }
    },
    add: async (req, res) => {
        return res.render('admin/pages/addUser.ejs', {
            layout: 'admin/layouts/default.ejs',
        })
    },
    addPost: async (req, res) => {
        const { email } = req.body;
        req.body.name = 'name';
        const checkExitEmail = await userModel.emailExists(email);
        if (checkExitEmail) {
            return res.redirect('/admin/users');
        }
        req.body.status = (req.body.status === '1') ? true : false;
        await userModel.create(req.body);
        res.redirect('/admin/users');
    },
    edit: async (req, res) => {
        const { id } = req.params;
        const user = await userModel.findByPk(id);
        return res.render('admin/pages/edit.ejs', {
            layout: 'admin/layouts/default.ejs',
            user
        })
    },
    editPost: async (req, res) => {
        const { id } = req.params;
        const user = await userModel.update(req.body, id)

        res.json(user);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        await userModel.delete(parseInt(id));
        res.redirect('/admin/users');
    }
}
export default userController;