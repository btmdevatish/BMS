const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require('moment');
const Admin = require("../models/adminModel");
const Teams = require("../models/teamsModel");
const Media = require("../models/mediaModels");
const Package = require("../models/packageModel");
const Fantacy = require("../models/fantasyModel");
const Blog = require("../models/blogsModel");
const Category = require("../models/categoryModel");
const Tag = require("../models/tagModels");
const Author = require("../models/authorModel");
const util = require("util");

const hashAsync = util.promisify(bcrypt.hash);

exports.admnLogin = async (req, res, next) => {
  try {
    res.render("login", { message: "" });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in author",
      error: error,
    });
  }
};

exports.checkAdmnLogin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      res.render("login", { message: "Email not Found" });
    }
    if (!admin.is_active) {
      res.render("login", { message: "Email not active" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (passwordMatch) {
      req.session.user_id = admin._id;
      req.session.is_active = admin.is_active;
      req.session.email = admin.email;
      req.session.first_name = admin.first_name;
      req.session.role = admin.role;

      const userData = {
        _id: req.session.user_id,
        email: req.session.email,
        first_name: req.session.first_name,
        role: req.session.role,
        is_active: req.session.is_active,
      };

      res.render("dashboard", { userData, currentRoute: req.path });
    } else {
      res.render("login", { message: "Password wrong" });
    }
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in author",
      error: error,
    });
  }
};

// dashboard

exports.showDashboard = async (req, res, next) => {
  try {
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("dashboard", { userData, currentRoute: req.path });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in author",
      error: error,
    });
  }
};

// Teams
exports.allTeams = async (req, res, next) => {
  try {
    const teams = await Teams.find();
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("teams/all-teams", {
      userData:userData,
      data:teams,
      code: undefined,
      message: "",
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

exports.addTeams = async (req, res, next) => {
  try {
    const media = await Media.find();
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("teams/add-teams", {
      data: media,
      userData,
      code: undefined,
      message:"",
      currentRoute: req.path,
    });
  } catch (error) {
    res.render("teams/add-teams", {
      code: 0,
      userData:undefined,
      data:undefined,
      message: "Something went wrong in author",
    });
  }
};

exports.addNewTeams = async (req, res, next) => {
  try {
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };
    const teamData = new Teams({
      _id: new mongoose.Types.ObjectId(),
      team_name: req.body.team_name,
      country_code: req.body.country_code,
      logo: req.body.logo,
      image_id: req.body.image_id,
      details: req.body.details,
    });
    console.log(req.body)

    const data = await teamData.save();
    console.log(data)
    const media = await Media.find();
    res.render("teams/all-teams", {
      userData,
      data:media,
      code: 1,
      message: "Team Added Successfuly",
      currentRoute: req.path,
    });
  } catch (error) {
    
    res.render("teams/add-teams", {
      userData:undefined,
      data:undefined,
      code: 0,
      message: "Duplicate entry or server error",
      currentRoute: req.path,
    });
    res.redirect('teams/all-teams');
  }
};




// all packages
exports.allPackages = async (req, res, next) => {
  try {
    const package = await Package.find();
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("package/all-packages", {
      userData:userData,
      data:package,
      code: undefined,
      message: "",
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

exports.addPackage = async (req, res, next) => {
  try {
    const package = await Package.find();
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };
    res.render("package/add-package", {
      data: package,
      userData,
      code: undefined,
      message:"",
      currentRoute: req.path,
    });
  } catch (error) {
    res.render("package/add-package", {
      code: 0,
      userData:undefined,
      data:undefined,
      message: "Something went wrong in author",
    });
  }
};

exports.addNewPackage = async (req, res, next) => {
  try {
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };
    const packageData = new Package({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      discounted_price: req.body.discounted_price,
      offer: req.body.offer,
      services: req.body.services,
      button_link: req.body.button_link,
      pack_color: req.body.pack_color,
      is_prime: req.body.is_prime,
      button_link: req.body.button_link
    });


    const package = await packageData.save();
    res.render("package/all-packages", {
      userData,
      data:undefined,
      code: 1,
      message: "Package Added Successfuly",
      currentRoute: req.path,
    });
  } catch (error) {
    
    res.render("package/all-packages", {
      userData:undefined,
      data:undefined,
      code: 0,
      message: "Duplicate entry or server error",
      currentRoute: req.path,
    });
  }
};



// all fantacy
exports.allFantacy = async (req, res, next) => {
  try {

    const reveFantacy = await Fantacy.find()
    .populate({
      path: "team_one"
    })
    .populate({
      path: "team_two"
    })
    .populate('attached_package');
    
    console.log(reveFantacy)
    // const fantacy = reveFantacy.reverse()
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("fantacy/all-fantacy", {
      data: reveFantacy,
      userData,
      code:undefined,
      message:"",
      currentRoute: req.path,
    });
  } catch (error) {
    res.render("fantacy/all-fantacy", {
      userData:undefined,
      data: undefined,
        code: undefined,
        message:"Something went wrong",
        currentRoute: req.path,
      });
}
};


exports.addFantacy = async (req, res, next) => {
  try {
    const teams = await Teams.find();
    const mediaReverce = await Media.find()
    const package = await Package.find()
    const media = mediaReverce.reverse();
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("fantacy/add-fantacy", {
      userData,
      data:teams,
      data1:media,
      data2:package,
      code: undefined,
      message:"",
      currentRoute: req.path,
    });
  } catch (error) {
      res.render("fantacy/all-fantacy", {
        userData:undefined,
        data: undefined,
          code: undefined,
          message:"Something went wrong",
          currentRoute: req.path,
        });
  }
};


exports.addNewFantacy = async (req, res, next) => {
  try {
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    const inputDateTime = req.body.date_time;
    const date = new Date(inputDateTime);
    const formattedDateTime = moment(date).format("D MMMM YYYY h:mm A");
    
    const fantacyData = new Fantacy({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      banner_image: req.body.banner_image,
      team_one: req.body.team_one,
      team_two: req.body.team_two,
      date_time: formattedDateTime,
      venues: req.body.venues,
      time_stam: req.body.date_time,
      attached_package: req.body.attached_package,
      rapid_match_id: req.body.rapid_match_id,
      is_active: req.body.is_active
    });
    // console.log(fantacyData)
    const fantacy = await fantacyData.save()
    res.render("fantacy/all-fantacy", {
      data: undefined,
      userData,
      code:1,
      message: "Match added successfuly",
      currentRoute: req.path,
    });
  
  } catch (error) {
      res.render("fantacy/all-fantacy", {
          data: undefined,
          userData:undefined,
          code:0,
          message: "Match added Falied or dublicate entry",
          currentRoute: req.path,
        });
  }
};




// all Prediction
exports.allPrediction = async (req, res, next) => {
  try {
    const revePrediction = await Blog.find()
    .populate({
      path: "featured_id",
      select: "name small_media large_media",
    })
    .populate({
      path: "author_id",
      select: "-password",
    })
    .populate({
      path: "category_id",
      select: "name slug",
    })
    .populate({
      path: "tags",
      select: "name",
    }); 
    
    console.log(revePrediction)
    const blog = revePrediction.reverse()
    // console.log(blog)
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    // res.status(200).json({
    //   data: blog
    // })
    res.render("prediction/all-prediction", {
      data: blog,
      userData,
      code:undefined,
      message:"",
      currentRoute: req.path,
    });
  } catch (error) {
    res.render("prediction/all-prediction", {
      userData:undefined,
      data: undefined,
        code: undefined,
        message:"Something went wrong",
        currentRoute: req.path,
      });
}
};


exports.addPrediction = async (req, res, next) => {
  try {

    const category = await Category.find()
    const tag = await Tag.find()
    const author = await Author.find()
    const revemedia = await Media.find()
    const revefantacy = await Fantacy.find()
    const media = revemedia.reverse()
    const fantacy = revefantacy.reverse()
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    res.render("prediction/add-prediction", {
      userData,
      data:undefined,
      dataCat:category,
      dataTag:tag,
      dataAuth:author,
      dataMedia:media,
      dataFantacy:fantacy,
      code: undefined,
      message:"",
      currentRoute: req.path,
    });
  } catch (error) {
      res.render("prediction/all-prediction", {
        userData:undefined,
        data: undefined,
          code: undefined,
          message:"Something went wrong",
          currentRoute: req.path,
        });
  }
};

exports.addSinglePrediction = async (req,res,next) =>{
  try {
    console.log(req.body)
    const userData = {
      _id: req.session.user_id,
      email: req.session.email,
      first_name: req.session.first_name,
      role: req.session.role,
      is_active: req.session.is_active,
    };

    const date = new Date();
    const formattedDateTime = moment(date).format("D MMMM YYYY h:mm A");
    const trimmedSlug = req.body.title.trim().toLowerCase();
    const slug = trimmedSlug.replace(/\s+/g, "-");
    const comment_id = ['65213465b9d24ff9e340d95d']

    const predictionData = new Blog({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      featured_id: req.body.featured_id,
      slug: slug,
      except: req.body.except,
      description: req.body.description,
      category_id: req.body.category_id,
      tags: req.body.tags,
      status: true,
      author_id: req.body.author_id,
      fantacy_id: req.body.fantacy_id,
      comment_id: comment_id,
      comment_status: false,
      comment_count: '3',
      date: formattedDateTime,
    });
    // console.log(fantacyData)
    const predictions = await predictionData.save()
    res.render("prediction/all-prediction", {
      data: undefined,
      userData,
      code:1,
      message: "Prediction added successfuly",
      currentRoute: req.path,
    });
  
  } catch (error) {
    res.render("prediction/all-prediction", {
      userData:undefined,
      data: undefined,
        code: undefined,
        message:"Something went wrong",
        currentRoute: req.path,
      });
  }
}