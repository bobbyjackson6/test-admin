const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { createServer } = require("http");

const app = express();
const port = 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

const server = createServer(app);

// Mongo

mongoose
  .connect(
    "mongodb+srv://redalert:redalert@cluster0-vzasu.mongodb.net/promo-csmoney?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const AdminSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// pagesSchema

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  alias: {
    type: String,
  },
  headerLogo: {
    type: String,
  },
  chatLogo: {
    type: String,
  },
  bloggerName: {
    type: String,
  },
  mainHeader: {
    type: String,
  },
  underTitileText: {
    type: String,
  },
  buttonText: {
    type: String,
  },
  infoTitle: {
    type: String,
  },
  firstImageText: {
    type: String,
  },
  secondImageText: {
    type: String,
  },
  thirdImageText: {
    type: String,
  },
  fourthImageText: {
    type: String,
  },
  feedbackHeader: {
    type: String,
  },
  feedbackText: {
    type: String,
  },
  reviewLink: {
    type: String,
  },
  csmoneyAnswer: {
    type: String,
  },
  firsVideoLink: {
    type: String,
  },
  secondVideoLink: {
    type: String,
  },
  thirdVideoLink: {
    type: String,
  },
  useCsmoneyLink: {
    type: String,
  },
  finalBlockHeader: {
    type: String,
  },
  finalBlockText: {
    type: String,
  },
  promocode: {
    type: String,
  },
  finalButtonText: {
    type: String,
  },
  textUnderFinalButton: {
    type: String,
  },
});

const Admins = mongoose.model("admins", AdminSchema);
const Page = mongoose.model("pages", PageSchema);

// End mongo

app.get("/shimbabumba", (req, res) => {
  res.render(__dirname + "/views/login.ejs");
});
app.post("/shimbabumba", urlencodedParser, (req, res) => {
  if (!req.body) {
    return res.status(400);
  }
  if (
    Admins.find({
      login: req.body.login,
      password: req.body.password,
    })
  ) {
    res.redirect("/shimbabumba/admin");
  }
});

app.get("/shimbabumba/admin", (req, res) => {
  Page.find({}, { title: 1 }).then((result) => {
    console.log("result:", result);
    res.render(__dirname + "/views/shimbabumba.ejs", {
      titles: result,
    });
  });
});
app.post("/shimbabumba/admin", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  Page.create({
    title: req.body.title,
    description: req.body.description,
    alias: req.body.alias,
    headerLogo: req.body.firstLogo,
    chatLogo: req.body.secondLogo,
    bloggerName: req.body.bloggerName,
    mainHeader: req.body.mainHeader,
    underTitileText: req.body.subtitle,
    buttonText: req.body.buttonText,
    infoTitle: req.body.infoHeader,
    firstImageText: req.body.imageText1,
    secondImageText: req.body.imageText2,
    thirdImageText: req.body.imageText3,
    fourthImageText: req.body.imageText4,
    feedbackHeader: req.body.feedbackHeader,
    feedbackText: req.body.feedbackText,
    reviewLink: req.body.reviewLink,
    csmoneyAnswer: req.body.csmoneyAnswer,
    firsVideoLink: req.body.video1,
    secondVideoLink: req.body.video1,
    thirdVideoLink: req.body.video3,
    useCsmoneyLink: req.body.useCsmoneywith,
    finalBlockHeader: req.body.finalHeader,
    promocode: req.body.promocode,
    finalButtonText: req.body.finalButton,
    textUnderFinalButton: req.body.textUnderFinalButton,
  }).then(res.redirect("/shimbabumba/admin"));
});

// app.use((req, res, next) => {
//   res.status(404).send("The page doesn't exist");
// });

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Page.findOne({ title: id }, function (err, user) {
    if (err) return console.log(err);
    console.log(user);
    res.render(__dirname + "/views/influencer.ejs", {
      pageInfo: user,
    });
  });

  // Page.find({ title: req.params.id }).then((result) => {
  //   console.log(result);
  //   res.render(__dirname + "/views/influencer.ejs", {
  //     pageInfo: result,
  //   });
  // });
});
server.listen(port, () => console.log(`server is up. port : ${port}`));
/* 
Сделать, чтобы отображение страницы инфлюенсера было нормальным.
сделать опцию редактирования страницы.
*/
