// develop mode인 경우 process.env.NODE_ENV -> development
// deploy한 경우 process.env.NODE_ENV -> production
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
