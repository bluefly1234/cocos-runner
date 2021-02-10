import Globals from "./Globals";

cc.Class({
  extends: cc.Component,

  properties: {
    hero: {
      default: null,
      type: cc.Node
    },
    score: {
      default: null,
      type: cc.Label
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.enablePhysics();
    this.enableCollision();
    // this.enablePhysicsDebug();

    // 監聽 hero 觸發 score 事件
    this.hero.on("score", () => {
      this.handleAddScore();
    });
  },

  // 啟用物理引擎
  enablePhysics() {
    cc.director.getPhysicsManager().enabled = true;
  },

  // 啟動碰撞引擎
  enableCollision() {
    cc.director.getCollisionManager().enabled = true;
  },

  // debug 顯示物理作用範圍線條、區塊
  enablePhysicsDebug() {
    cc.director.getPhysicsManager().debugDrawFlags =
      cc.PhysicsManager.DrawBits.e_aabbBit |
      cc.PhysicsManager.DrawBits.e_pairBit |
      cc.PhysicsManager.DrawBits.e_centerOfMassBit |
      cc.PhysicsManager.DrawBits.e_jointBit |
      cc.PhysicsManager.DrawBits.e_shapeBit;
  },

  handleAddScore() {
    Globals.score++;
    this.score.string = Globals.score.toString();
  },

  start() {}

  // update (dt) {},
});
