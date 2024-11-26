import pkg from 'yup';
import { generateToken } from "../services/AuthenticationService.js";
import passport from 'passport';

const { object, string, number, date, InferType } = pkg;
const userSchema = object({
    email: string().email(),
    password: string().required()
});
const db = {
    users: [
        {
            email: 'sonvipkl04@gmail.com',
            password: 'abcd'
        }
    ]
}
const authController = {
    index: (req, res) => {
        res.render('user controller');
    },
    login: (req, res) => {
        if (req.session.in4user_login) {
            return res.redirect('/admin/dashboard');
        }
        return res.render('client/pages/login.ejs')
    },
    loginPost: async (req, res) => {
        // try {
        //     const body = await userSchema.validate(req.body, {
        //         abortEarly: false
        //     });
        //     console.log('body: ', body);


        //     const user = req.body;
        //     const find = db.users.find(item => (
        //         item.email === user.email && item.password === user.password
        //     ));
        //     console.log(find)
        //     if (!find) {
        //         return res.json({
        //             code: 400,
        //             message: "Invalid email or password"
        //         })
        //     }
        //     const token = generateToken(user);
        //     return res.json({
        //         code: 200,
        //         token,
        //         authenticated: true
        //     })
        // } catch (error) {
        //     const errors = Object.fromEntries(
        //         error.inner.map(item => (
        //             [item.path, item.message]
        //         ))
        //     );
        //     console.log(errors)
        //     res.redirect('/auth/login');
        // }
        // res.redirect('/admin/dashboard');

        // session based
        // // validate
        // const in4User = db.users.find(item =>
        //     item.email === req.body.email && item.password === req.body.password
        // );

        // // return all info user on database

        // // set cookie
        // // res.cookie('in4user_login', JSON.stringify(in4uer), { path: '/', maxAge: 3600, httpOnly: true });
        // req.session.in4user_login = in4User;

        // if (in4User) {
        //     res.redirect('/admin/dashboard')
        // }
        // else {
        //     return res.redirect('/users/login');
        // }
        res.json("")

    },
    logout: (req, res) => {
        // passport req.logout
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            req.flash('success_msg', 'You have successfully logged out.');
            res.redirect('/login'); // Hoặc trang khác bạn muốn redirect đến
        });
    },
    register: (req, res) => {
        return res.render('client/pages/register.ejs')
    },
    registerPost: (req, res) => {
        try {
            const { email, password } = req.body;
            const user = {
                id: "randomIdString",
                email,
                password,
            };
            const token = generateToken(user);

            res.status(200).json({ user: user.id });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Error registering user' });
        }
    }

}
export default authController;