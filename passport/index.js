const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("passport aa");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("passport bb");
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};

passport._debug = true;
