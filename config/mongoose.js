const mongoose = require("mongoose");
// Mongoose

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
  title_en: {
    $regex: /\w/,
    unique:true,
    type: String,
  },
  description_en: {
    type: String,
  },
  alias_en: {
    type: String,
  },
  headerLogo: {
    type: String,
  },
  chatLogo: {
    type: String,
  },
  bloggerName_en: {
    type: String,
  },
  mainHeader_en: {
    type: String,
  },
  underTitleText_en: {
    type: String,
  },
  buttonText_en: {
    type: String,
  },
  infoHeader_en: {
    type: String,
  },
  firstImageText_en: {
    type: String,
  },
  secondImageText_en: {
    type: String,
  },
  thirdImageText_en: {
    type: String,
  },
  fourthImageText_en: {
    type: String,
  },
  feedbackHeader_en: {
    type: String,
  },
  feedbackText_en: {
    type: String,
  },
  reviewLink_en: {
    type: String,
  },
  csmoneyAnswer_en: {
    type: String,
  },
  firstVideoLink: {
    type: String,
  },
  secondVideoLink: {
    type: String,
  },
  thirdVideoLink: {
    type: String,
  },
  useCsmoneyTitle_en: {
    type: String,
  },
  finalBlockHeader_en: {
    type: String,
  },
  finalBlockText_en: {
    type: String,
  },
  promocode: {
    type: String,
  },
  finalButtonText_en: {
    type: String,
  },
  textUnderFinalButton_en: {
    type: String,
  },

  title_ru: {
    $regex: /\w/,
    type: String,
  },
  description_ru: {
    type: String,
  },
  alias_ru: {
    type: String,
  },
  bloggerName_ru: {
    type: String,
  },
  mainHeader_ru: {
    type: String,
  },
  underTitleText_ru: {
    type: String,
  },
  buttonText_ru: {
    type: String,
  },
  infoHeader_ru: {
    type: String,
  },
  firstImageText_ru: {
    type: String,
  },
  secondImageText_ru: {
    type: String,
  },
  thirdImageText_ru: {
    type: String,
  },
  fourthImageText_ru: {
    type: String,
  },
  feedbackHeader_ru: {
    type: String,
  },
  feedbackText_ru: {
    type: String,
  },
  reviewLink_ru: {
    type: String,
  },
  csmoneyAnswer_ru: {
    type: String,
  },
  useCsmoneyTitle_ru: {
    type: String,
  },
  finalBlockHeader_ru: {
    type: String,
  },
  finalBlockText_ru: {
    type: String,
  },
  finalButtonText_ru: {
    type: String,
  },
  textUnderFinalButton_ru: {
    type: String,
  },
});

const Admins = mongoose.model("admins", AdminSchema);
const Page = mongoose.model("pages", PageSchema);

// End mongo

module.exports.Admins = Admins;
module.exports.Page = Page;
