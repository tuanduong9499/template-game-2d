let PureAds = null;
try {
  PureAds = require("../../pureAds/src/pureAds").default;
  console.log("Init true pureAds:", PureAds);
}
catch (e) {
  console.log(e);
  PureAds = require("./pureAds.mock").default;
}
export default PureAds;