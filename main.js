const express = require("express");
const app = express();
const http = require("http").createServer(app);

const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');

const Page = require("./config/mongoose").Page;

const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");


require('./config/passport')(passport)
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'secret123',
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(flash())


app.get("/shimbabumba",async(req, res) => {
  const error = await req.flash();
  console.log('error', error)
  res.render(__dirname + "/views/login.ejs", {
    error:error
  }
   );
});
app.post('/shimbabumba', passport.authenticate('login', {
  successRedirect: '/shimbabumba/admin',
  failureRedirect: '/shimbabumba',
  failureFlash: true
}));


app.get("/shimbabumba/admin", isLoggedIn, async (req, res) => {
  const result = await Page.find({}, { title_en: 1 });
  res.render(__dirname + "/views/shimbabumba.ejs", {
    pages: result,
  });
});
app.post("/shimbabumba/admin", (req, res) => {
  if (!req.body) return res.sendStatus(400);
  Page.create({
    title_en: req.body.title_en,
    description_en: req.body.description_en,
    alias_en: req.body.alias_en,
    headerLogo: req.body.headerLogo,
    chatLogo: req.body.chatLogo,
    bloggerName_en: req.body.bloggerName_en,
    mainHeader_en: req.body.mainHeader_en,
    underTitleText_en: req.body.underTitleText_en,
    buttonText_en: req.body.buttonText_en,
    infoHeader_en: req.body.infoHeader_en,
    firstImageText_en: req.body.firstImageText_en,
    secondImageText_en: req.body.secondImageText_en,
    thirdImageText_en: req.body.thirdImageText_en,
    fourthImageText_en: req.body.fourthImageText_en,
    feedbackHeader_en: req.body.feedbackHeader_en,
    feedbackText_en: req.body.feedbackText_en,
    reviewLink_en: req.body.reviewLink_en,
    csmoneyAnswer_en: req.body.csmoneyAnswer_en,
    firstVideoLink: req.body.firstVideoLink,
    secondVideoLink: req.body.secondVideoLink,
    thirdVideoLink: req.body.thirdVideoLink,
    useCsmoneyTitle_en: req.body.useCsmoneyTitle_en,
    finalBlockHeader_en: req.body.finalBlockHeader_en,
    promocode: req.body.promocode,
    finalButtonText_en: req.body.finalButtonText_en,
    textUnderFinalButton_en: req.body.textUnderFinalButton_en,

    title_ru: req.body.title_ru,
    description_ru: req.body.description_ru,
    alias_ru: req.body.alias_ru,
    bloggerName_ru: req.body.bloggerName_ru,
    mainHeader_ru: req.body.mainHeader_ru,
    underTitleText_ru: req.body.underTitleText_ru,
    buttonText_ru: req.body.buttonText_ru,
    infoHeader_ru: req.body.infoHeader_ru,
    firstImageText_ru: req.body.firstImageText_ru,
    secondImageText_ru: req.body.secondImageText_ru,
    thirdImageText_ru: req.body.thirdImageText_ru,
    fourthImageText_ru: req.body.fourthImageText_ru,
    feedbackHeader_ru: req.body.feedbackHeader_ru,
    feedbackText_ru: req.body.feedbackText_ru,
    reviewLink_ru: req.body.reviewLink_ru,
    csmoneyAnswer_ru: req.body.csmoneyAnswer_ru,
    useCsmoneyTitle_ru: req.body.useCsmoneyTitle_ru,
    finalBlockHeader_ru: req.body.finalBlockHeader_ru,
    finalButtonText_ru: req.body.finalButtonText_ru,
    textUnderFinalButton_ru: req.body.textUnderFinalButton_ru,
  }).then(res.redirect("/shimbabumba/admin"));
});


app.get('/shimbabumba/logout', (req, res) => {
  req.logOut();
  res.redirect('/shimbabumba')
})

function isLoggedIn(req,res, next){
  if (req.isAuthenticated())
  return next()
  res.redirect('/shimbabumba')
}

app.get("/:name", async (req, res) => {
  try {
    const result = await Page.find({ title_en: req.params.name });
    const firstVideoID = getYouTubeID(result[0].firstVideoLink);
    const secondVideoID = getYouTubeID(result[0].secondVideoLink);
    const thirdVideoID = getYouTubeID(result[0].thirdVideoLink);
    const firstVideoInfo = await fetchVideoInfo(firstVideoID);
    const secondVideoInfo = await fetchVideoInfo(secondVideoID);
    const thirdVideoInfo = await fetchVideoInfo(thirdVideoID);
    res.render(__dirname + "/views/influencer.ejs", {
      pageInfo: result[0],
      firstVideoTitle: firstVideoInfo.title,
      secondVideoTitle: secondVideoInfo.title,
      thirdVideoTitle: thirdVideoInfo.title,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/influencer/edit/:name", async (req, res) => {
  const result = await Page.find({ title_en: req.params.name });
  res.render("edit.ejs", {
    user: result[0],
  });
});
app.post("/influencer/edit/:name", (req, res) => {
  Page.findOneAndUpdate(
    { title_en: req.body.title_en },
    {
      title_en: req.body.title_en,
      description_en: req.body.description_en,
      alias_en: req.body.alias_en,
      headerLogo: req.body.headerLogo,
      chatLogo: req.body.chatLogo,
      bloggerName_en: req.body.bloggerName_en,
      mainHeader_en: req.body.mainHeader_en,
      underTitleText_en: req.body.underTitleText_en,
      buttonText_en: req.body.buttonText_en,
      infoHeader_en: req.body.infoHeader_en,
      firstImageText_en: req.body.firstImageText_en,
      secondImageText_en: req.body.secondImageText_en,
      thirdImageText_en: req.body.thirdImageText_en,
      fourthImageText_en: req.body.fourthImageText_en,
      feedbackHeader_en: req.body.feedbackHeader_en,
      feedbackText_en: req.body.feedbackText_en,
      reviewLink_en: req.body.reviewLink_en,
      csmoneyAnswer_en: req.body.csmoneyAnswer_en,
      firstVideoLink: req.body.firstVideoLink,
      secondVideoLink: req.body.secondVideoLink,
      thirdVideoLink: req.body.thirdVideoLink,
      useCsmoneyTitle_en: req.body.useCsmoneyTitle_en,
      finalBlockHeader_en: req.body.finalBlockHeader_en,
      promocode: req.body.promocode,
      finalButtonText_en: req.body.finalButtonText_en,
      textUnderFinalButton_en: req.body.textUnderFinalButton_en,

      title_ru: req.body.title_ru,
      description_ru: req.body.description_ru,
      alias_ru: req.body.alias_ru,
      bloggerName_ru: req.body.bloggerName_ru,
      mainHeader_ru: req.body.mainHeader_ru,
      underTitleText_ru: req.body.underTitleText_ru,
      buttonText_ru: req.body.buttonText_ru,
      infoHeader_ru: req.body.infoHeader_ru,
      firstImageText_ru: req.body.firstImageText_ru,
      secondImageText_ru: req.body.secondImageText_ru,
      thirdImageText_ru: req.body.thirdImageText_ru,
      fourthImageText_ru: req.body.fourthImageText_ru,
      feedbackHeader_ru: req.body.feedbackHeader_ru,
      feedbackText_ru: req.body.feedbackText_ru,
      reviewLink_ru: req.body.reviewLink_ru,
      csmoneyAnswer_ru: req.body.csmoneyAnswer_ru,
      useCsmoneyTitle_ru: req.body.useCsmoneyTitle_ru,
      finalBlockHeader_ru: req.body.finalBlockHeader_ru,
      finalButtonText_ru: req.body.finalButtonText_ru,
      textUnderFinalButton_ru: req.body.textUnderFinalButton_ru,
    }
  );
  res.redirect("/shimbabumba/admin");
});

app.get("/influencer/delete/:name", (req, res) => {
  Page.findOneAndDelete({ title_en: req.params.name }).then((err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/shimbabumba/admin");
  });
});


app.get("*", (req,res)=>{
  res.status(404).send("The page doesn't exist");
})


http.listen(3000, () => {
  console.log("listening on port 3000");
});

