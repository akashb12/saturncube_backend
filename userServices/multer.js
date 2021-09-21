const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");
var aws = require("aws-sdk");
var s3 = new aws.S3({
  accessKeyId: config.accessKey,
  secretAccessKey: config.secretKey,
});

module.exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "nakshmart.co.in",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `uploads/${req.ui}/${Date.now()}_${file.originalname}`);
    },
  }),
}).single("file");
