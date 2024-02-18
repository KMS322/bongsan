const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["admin_pw"],
        },
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        user_id: req.body.userID,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디 입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.userPW, 12);

    await User.create({
      user_id: req.body.userID,
      user_pw: hashedPassword,
      user_name: req.body.userName,
      user_email: req.body.userEmail,
      user_tel: req.body.userTel,
      checkList1: req.body.checkList1,
      checkList2: req.body.checkList2,
      checkList3: req.body.checkList3,
      checkList4: req.body.checkList4,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.post("/login", isNotLoggedIn, async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         user_id: req.body.userID,
//       },
//     });
//     if (!user) {
//       res.status(300).send("등록된 아이디가 아닙니다.");
//     }
//     const result = await bcrypt.compare(req.body.userPW, user.user_pw);
//     if (result) {
//       const responseUser = {
//         user_id: user.user_id,
//       };
//       res.status(200).json(responseUser);
//     } else {
//       res.status(401).send("비밀번호가 틀렸습니다.");
//     }
//   } catch (error) {
//     console.error(error);
//     next();
//   }
// });
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("AA");
    if (err) {
      console.log("bb");

      console.error(err);
      return next(err);
    }
    if (info) {
      console.log("info : ", info);
      console.log("cc");

      return res.status(401).send(info.reason);
    }
    console.log("dd");

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ["user_id"],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/checkId", isNotLoggedIn, async (req, res, next) => {
  try {
    if (req.body.userID) {
      const sameIdUser = await User.findOne({
        where: {
          user_id: req.body.userID,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    }

    return res.status(200).send("사용하실 수 있는 아이디 입니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changePassword", isLoggedIn, async (req, res, next) => {
  try {
    const changeUser = await User.findOne({
      where: {
        id: req.body.userID,
      },
    });
    console.log("changeUser : ", changeUser);
    const currentPasswordMatch = await bcrypt.compare(
      req.body.user_currentPW,
      changeUser.user_member_pw
    );

    if (!currentPasswordMatch) {
      return res.status(401).send("현재 비밀번호가 일치하지 않습니다.");
    }
    const hashedNewPassword = await bcrypt.hash(req.body.changePassword, 12);
    changeUser.user_member_pw = hashedNewPassword;
    await changeUser.save();

    res.status(200).send("비밀번호가 성공적으로 변경되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/logout", isLoggedIn, (req, res) => {
  console.log("AA");
  req.logout(() => {
    // res.redirect("/");
  });
  res.status(201).send("ok");
});

module.exports = router;
