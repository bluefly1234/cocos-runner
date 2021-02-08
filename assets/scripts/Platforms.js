cc.Class({
  extends: cc.Component,

  properties: {
    platform: {
      default: null,
      type: cc.Prefab,
    },
    tilesCountMin: 2,
    tilesCountMax: 6,
    xOffsetMin: 60,
    xOffsetMax: 200,
    yOffsetMin: -300,
    yOffsetMax: 300,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    // debug 顯示物理作用範圍線條、區塊
    cc.director.getPhysicsManager().debugDrawFlags =
      cc.PhysicsManager.DrawBits.e_aabbBit |
      cc.PhysicsManager.DrawBits.e_pairBit |
      cc.PhysicsManager.DrawBits.e_centerOfMassBit |
      cc.PhysicsManager.DrawBits.e_jointBit |
      cc.PhysicsManager.DrawBits.e_shapeBit;
  },

  start() {
    this.platforms = [];
    this.createPlatform({ tilesCount: 4, x: -200, y: -200 });
  },

  update(dt) {
    if (this.isPlatformOnRight()) {
      this.createPlatform();
      cc.log("Platforms length: ", this.platforms.length);
    }
  },

  // 檢查 platform 是否在螢幕的右邊範圍區塊
  isPlatformOnRight() {
    const screenRight = cc.winSize.width / 2;
    const currentPlatformRight = this.current.node.x + this.current.node.width;
    return currentPlatformRight < screenRight;
  },

  getLimitRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  // 依據 min、max 配置值
  // 依據上一個產生的 platform 位置為基準延伸
  // 需限制在螢幕一定範圍內
  generateRandomData() {
    const data = {
      tilesCount: 0,
      x: 0,
      y: 0,
    };

    // 取得 min ~ max 隨機 titlesCount
    const randomTilesCount = this.getLimitRandom(
      this.tilesCountMin,
      this.tilesCountMax
    );
    data.tilesCount = randomTilesCount;

    // 取得 min ~ max 隨機 x
    // 並從上一個 platform 位置朝右邊新增
    const randomXOffset = this.getLimitRandom(this.xOffsetMin, this.xOffsetMax);
    data.x = this.current.node.x + this.current.node.width + randomXOffset;

    // 取得 min ~ max 隨機 x
    // 最高可出現位置：螢幕最高點扣除 platform 高度 * 2
    // 最低可出現位置：螢幕最底部加上 platform 高度
    const randomYOffset = this.getLimitRandom(this.yOffsetMin, this.yOffsetMax);
    const screenTop = cc.winSize.height / 2;
    const screenBottom = -cc.winSize.height / 2;
    let y = this.current.node.y + randomYOffset;
    y = Math.min(y, screenTop - this.current.node.height * 2);
    y = Math.max(y, screenBottom + this.current.node.height);
    data.y = y;

    return data;
  },

  createPlatform(data) {
    if (!data) {
      data = this.generateRandomData();
    }

    // 重 platforms 內取得 active = false 的 platform 實例來重新使用, 優化效能
    const platform = this.platforms.find((platform) => !platform.active);
    if (platform) {
      this.current = platform;
    } else {
      // 實例化 platform prefab
      const node = cc.instantiate(this.platform);
      this.node.addChild(node);

      // 取出 platform prefab 內綁定的 platform 腳本, 並儲存到 current
      this.current = node.getComponent("Platform");
      this.platforms.push(this.current);
    }

    this.current.init(data.tilesCount, data.x, data.y);
  },
});
