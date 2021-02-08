import { getLimitRandom } from "../utils/index";

const tileSize = 64;

cc.Class({
  extends: cc.Component,

  properties: {
    coinsOffsetMin: 100,
    coinsOffsetMax: 200,
    diamond: {
      default: null,
      type: cc.Prefab,
    },
    tile: {
      default: null,
      type: cc.Prefab,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  update(dt) {
    if (this.active) {
      this.node.x -= 150 * dt;

      if (this.isPlatformOnOutScreen()) {
        this.active = false;
      }
    }
  },

  createDiamonds() {
    const yOffset = getLimitRandom(this.coinsOffsetMin, this.coinsOffsetMax);
    this.node.children.forEach((tile) => {
      // 40 % 機率產生鑽石
      if (Math.random() <= 0.4) {
        const diamond = cc.instantiate(this.diamond);
        tile.addChild(diamond);
        diamond.setPosition(0, yOffset);
      }
    });
  },

  isPlatformOnOutScreen() {
    return this.node.x + this.node.width < -cc.winSize.width / 2;
  },

  init(tilesCount, x, y) {
    this.active = true;
    // 因為會重新使用本實例, 所以每次 init 前需要清除所有子節點
    this.node.removeAllChildren();

    // 設定地板位置
    this.node.setPosition(cc.v2(x, y));

    // 創建地板磚塊 tile
    for (let i = 0; i < tilesCount; i++) {
      // 實例化 tile prefab
      const tile = cc.instantiate(this.tile);

      // 將 tile 添加到自己底下
      this.node.addChild(tile);

      // 設定 tile 位置, 往右延伸
      tile.setPosition(i * tile.width, 0);
    }

    // 更新地板  size
    this.node.width = tileSize * tilesCount;
    this.node.height = tileSize;

    // 更新地板碰撞範圍 collider size
    const collider = this.node.getComponent(cc.PhysicsBoxCollider);
    collider.size.width = this.node.width;
    collider.size.height = this.node.height;
    collider.offset.x = this.node.width / 2 - tileSize / 2;
    collider.apply();

    // 創建鑽石
    this.createDiamonds();
  },
});
