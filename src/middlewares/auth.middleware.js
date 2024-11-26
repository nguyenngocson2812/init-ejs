const authMiddleware = {
    requireAuth: (req, res, next) => {
        if (!req.user) {
            return res.redirect('/auth/login');
        }
        next();
    },
    isLogin: (req, res, next) => {
        if (req.user) {
            return res.redirect('/admin/dashboard');
        }
        next();
    }
}
export default authMiddleware;