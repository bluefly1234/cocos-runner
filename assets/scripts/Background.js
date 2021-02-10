cc.Class({
  extends: cc.Component,

  properties: {
    speed: 50
  },

  update(dt) {
    this.node.children.forEach((node) => {
      this.move(node, dt * this.speed);
    });
  },

  move(node, offset) {
    // 取得當前圖面最右邊的 x 軸座標
    const spriteRightX = node.x + node.width / 2;

    // 取得螢幕最左邊 x 軸座標
    const screenLeftX = -cc.winSize.width / 2;

    // 如果當前圖片 x 軸超出螢幕, 將當前圖片移動到右邊
    if (spriteRightX <= screenLeftX) {
      node.x += node.width * 2 - offset;
    } else {
      node.x -= offset;
    }
  }
});
