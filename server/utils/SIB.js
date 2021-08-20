require("dotenv").config();
var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
const SIB_key = process.env.SIB_APIkey;

var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = SIB_key;

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

<<<<<<< HEAD
let userArray = [];

sendSmtpEmail.templateId = 2;
sendSmtpEmail.to = userArray;
=======
sendSmtpEmail.templateId = 2;
sendSmtpEmail.to = [{ email: "wonsangalex@gmail.com", name: "Alex Yoon" }];
>>>>>>> f5c906a7649220bdf1223819fc054322f20224a8

const sendMail = async() => {
  await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
    },
    function (error) {
      console.error(error);
    }
  );
};

module.exports = sendMail;
