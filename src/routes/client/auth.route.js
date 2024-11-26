import authMiddleware from '../../middlewares/auth.middleware.js';
import passport from 'passport';
import express from 'express';
import authController from '../../controllers/auth.controller.js';

const router = express.Router();

router.get("/index", authController.index);

router.get("/google",
    passport.authenticate('google', {
        failureFlash: true,
        failureRedirect: "/auth/login"
    })
);

// Callback route for Google authentication
router.get("/google/callback",
    passport.authenticate('google', {
        failureRedirect: "/auth/login",
        failureFlash: true
    }),
    (req, res) => {
        console.log('Authenticated User:', req.user); // Log the authenticated user
        res.redirect('/admin/dashboard'); // Redirect to the desired page
    }
);

router.get("/login", authMiddleware.isLogin, authController.login);
router.get("/register", authController.register);
router.post("/register", authController.registerPost);
router.post("/logout", authController.logout);

router.post("/login",
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })
);

export default router;
