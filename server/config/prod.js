// deploy 했을 경우 MONGO_URI이라는 이름을 따로 넣어주게 되는데 그것을 가리키도록 한다.
// 해로쿠베포시 db uri를 따로 관리하기 때문이다. -> 보안상의 이유??
module.exports = {
  mongoURI: process.env.MONGO_URI,
};
