cc.Class({
  extends: cc.Component,

  properties: {
    platform: {
      default: null,
      type: cc.Prefab
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {
    this.createPlatform({ tilesCount: 4, x: -200, y: 100 });
    this.createPlatform({ tilesCount: 3, x: 0, y: -100 });
    this.createPlatform({ tilesCount: 5, x: 200, y: 0 });
  },

  // update (dt) {},

  createPlatform({ tilesCount, x, y }) {
    // 實例化 platform prefab
    const node = cc.instantiate(this.platform);
    this.node.addChild(node);

    // 取出 platform prefab 內綁定的 platform 腳本, 來調用 init 方法
    const platform = node.getComponent("Platform");
    platform.init(tilesCount, x, y);
  }
});
