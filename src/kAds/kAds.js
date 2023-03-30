let KAds = null;
try {
  KAds = require("../../exportAds/kAds").default;
  console.log("Init true kAds");
}
catch (e) {
  console.log(e);
  KAds = require("./kAds.mock").default;
}
export default KAds;
