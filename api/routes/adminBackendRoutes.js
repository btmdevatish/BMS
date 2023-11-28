
const express = require('express')
const session = require('express-session');
const crypto = require('crypto'); // Import the crypto library
const adminBackend_routes = express()
const multer = require("multer");
const fs = require("fs"); // Node.js file system module
const adminControllerBack = require('../controllers/adminBackendController')
const adminMediaController = require('../controllers/adminMediaUpload')
const isAdminAuth = require('../middelware/isAdminMiddelware')
const sessionSecret = crypto.randomBytes(32).toString('hex');

const uploads = multer({
  storage: multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + "-" + file.originalname
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only JPEG or PNG files are allowed."), false); // Reject the file
    }
  },
  limits: { fileSize: 102400 },
}).single("img_upload");



adminBackend_routes.use(session({
    secret: sessionSecret, // Set the session secret
    resave: false,
    saveUninitialized: true,
  }));



adminBackend_routes.get('/', isAdminAuth.isLogout,adminControllerBack.admnLogin)
adminBackend_routes.post('/', adminControllerBack.checkAdmnLogin)


// dashboard
adminBackend_routes.get('/dashboard',isAdminAuth.isLogin ,  adminControllerBack.showDashboard)

// teams
adminBackend_routes.get('/all-teams',isAdminAuth.isLogin ,  adminControllerBack.allTeams)

adminBackend_routes.get('/add-teams',isAdminAuth.isLogin ,  adminControllerBack.addTeams)
adminBackend_routes.post('/add-teams',isAdminAuth.isLogin ,  adminControllerBack.addNewTeams)

//media
adminBackend_routes.get('/all-media',isAdminAuth.isLogin ,  adminMediaController.allMedias)

adminBackend_routes.get('/add-media',isAdminAuth.isLogin ,  adminMediaController.addMedias)
adminBackend_routes.post('/add-media',uploads,isAdminAuth.isLogin ,  adminMediaController.addSingleMedia)


//packages
adminBackend_routes.get('/all-packages',isAdminAuth.isLogin ,  adminControllerBack.allPackages)

adminBackend_routes.get('/add-package',isAdminAuth.isLogin ,  adminControllerBack.addPackage)
adminBackend_routes.post('/add-package',isAdminAuth.isLogin ,  adminControllerBack.addNewPackage)


// fantasy
adminBackend_routes.get('/all-fantacy',isAdminAuth.isLogin ,  adminControllerBack.allFantacy)

adminBackend_routes.get('/add-fantacy',isAdminAuth.isLogin ,  adminControllerBack.addFantacy)
adminBackend_routes.post('/add-fantacy',isAdminAuth.isLogin ,  adminControllerBack.addNewFantacy)


// Blog
adminBackend_routes.get('/all-prediction' ,isAdminAuth.isLogin,  adminControllerBack.allPrediction)

adminBackend_routes.get('/add-prediction',isAdminAuth.isLogin, adminControllerBack.addPrediction)
adminBackend_routes.post('/add-prediction',isAdminAuth.isLogin ,adminControllerBack.addSinglePrediction)

module.exports = adminBackend_routes