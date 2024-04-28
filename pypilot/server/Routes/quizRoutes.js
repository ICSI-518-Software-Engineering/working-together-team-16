const router = require("express").Router();
const verify_token = require("../middlewares/verify_token");
const USER = require("../models/UserModel");

const questions = require("../question_data.json")["questions"];

router.get("/correct/:qNo/:UAns", verify_token, async (req, res) => {
  const updated_user = await USER.findByIdAndUpdate(req.user.id, {
    $inc: { total_answered: 1, correctly_answered: 1 },
  });
  const user = await USER.findById(req.user.id);
  user.Questions.push({
    qno: req.params.qNo,
    qans: req.params.UAns,
  });
  user.save();
  res.send(user);
});

router.get("/incorrect/:qNo/:UAns", verify_token, async (req, res) => {
  const _user = await USER.findByIdAndUpdate(req.user.id, {
    $inc: { total_answered: 1 },
  });
  const user = await USER.findById(req.user.id);
  user.Questions.push({
    qno: req.params.qNo,
    qans: req.params.UAns,
  });
  user.save();
  res.send(user);
});

router.get("/q/:id", (req, res) => {
  var id = req.params.id % 100;
  res.send(questions[req.params.id]);
});

module.exports = router;
