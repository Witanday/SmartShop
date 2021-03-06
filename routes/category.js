const express = require("express");
const router = express.Router();
const { create, categoryById, read,list, update, destroy} = require("../controllers/category")
const { requireSignin, isAuth, isAdmin} = require("../controllers/auth")

const {userById} = require("../controllers/user")

router.post(
    '/category/create/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    create
    );

router.put(
        '/category/:categoryId/:userId',
        requireSignin,
        isAuth,
        isAdmin,
        update
        );

router.delete(
            '/category/:categoryId/:userId',
            requireSignin,
            isAuth,
            isAdmin,
            destroy
            );
router.get(
        '/category/:categoryId',
        requireSignin,
        read
        );

router.get(
            '/categories',
            requireSignin,
            list
            );
    



router.param("userId",userById);
router.param("categoryId",categoryById);

module.exports = router;