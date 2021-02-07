cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  // update (dt) {},

  // 監聽物理碰撞
  onBeginContact() {
    cc.log("onBeginContact");
  },

  // 監聽結束碰撞
  onEndContact() {
    cc.log("onEndContact");
  }
});
