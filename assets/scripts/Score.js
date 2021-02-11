import Globals from "./Globals";

cc.Class({
  extends: cc.Component,

  properties: {
    scoreLabel: {
      default: null,
      type: cc.Label
    }
  },

  // onLoad () {},

  start() {
    this.scoreLabel.string = `Score: ${Globals.score}`;

    this.node.on(cc.Node.EventType.TOUCH_END, () => {
      cc.director.loadScene("Game");
    });
  }

  // update (dt) {},
});
