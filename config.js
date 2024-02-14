// {
//   "port": "3000",
//   "mongodb_uri": "mongodb://localhost:27017/mycon",
//   "secret-key": "palakm"
// }

module.exports = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || "palakm",
  mongodb_uri: "mongodb://localhost:27017/mycon",
};

