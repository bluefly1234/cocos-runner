cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.enablePhysics();
  },

  // 啟用物理引擎
  enablePhysics() {
    const physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
  },

  start() {}

  // update (dt) {},
});
