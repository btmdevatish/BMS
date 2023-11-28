const mongoose = require("mongoose");
const sharp = require("sharp");

const Media = require("../models/mediaModels");



// all media
exports.allMedias = async (req, res, next) => {
    try {
      const media = await Media.find();
      const userData = {
        _id: req.session.user_id,
        email: req.session.email,
        first_name: req.session.first_name,
        role: req.session.role,
        is_active: req.session.is_active,
      };
  
      res.render("media/all-media", {
        data: media,
        userData,
        currentRoute: req.path,
      });
    } catch (error) {
      res.status(500).json({
        code: 0,
        message: "Something went wrong in author",
        error: error,
      });
    }
  };



  
  exports.addMedias = async (req, res, next) => {
    try {
      const userData = {
        _id: req.session.user_id,
        email: req.session.email,
        first_name: req.session.first_name,
        role: req.session.role,
        is_active: req.session.is_active,
      };
  
      res.render("media/add-media", {
        userData,
        code: undefined,
        message:"",
        currentRoute: req.path,
      });
    } catch (error) {
        res.render("media/add-media", {
            userData,
            code: undefined,
            message:"Something went wrong",
            currentRoute: req.path,
          });
    }
  };
  




  
  exports.addSingleMedia = async (req, res, next) => {
    const smallPath = "uploads/small";
    const mediumPath = "uploads/medium";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    try {
      const sharpSmallImg = await sharp(req.file.path)
        .resize({
          width: 150,
          height: 97,
        })
        .toFile(`${smallPath}/${uniqueSuffix}_${req.file.originalname}`);
  
      //   medium
      const sharpMediumImg = await sharp(req.file.path)
        .resize({
          width: 768,
          height: 515,
        })
        .toFile(`${mediumPath}/${uniqueSuffix}_${req.file.originalname}`);
      // console.log(sharpSmallImg)
      const mediaData = new Media({
        _id: new mongoose.Types.ObjectId(),
        name: req.file.originalname,
        small_media: `${smallPath}/${uniqueSuffix}_${req.file.originalname}`,
        media_media: `${mediumPath}/${uniqueSuffix}_${req.file.originalname}`,
        large_media: req.file.path,
        author_id: req.body.author_id,
        post_id: req.body.post_id,
        is_deleted: req.body.is_deleted,
      });
      const userData = {
        _id: req.session.user_id,
        email: req.session.email,
        first_name: req.session.first_name,
        role: req.session.role,
        is_active: req.session.is_active,
      };


      const media = await mediaData.save();
      res.render("media/add-media", {
        data: media,
        userData,
        code:1,
        message: "Media uploaded successfuly",
        currentRoute: req.path,
      });
    
    } catch (error) {
        res.render("media/add-media", {
            code:0,
            message: "Media uploaded Falied",
            currentRoute: req.path,
          });
    }
  };