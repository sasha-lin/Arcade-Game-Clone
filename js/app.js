// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.y = Enemy_y[Math.floor(Math.random() * Enemy_y.length)];
        this.speed = Math.random() * 100 + 200;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    this.x = this.x % 505;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//判断是否碰撞
Enemy.prototype.checkCollisions = function(player) {
    if (((this.x % 505) >= (player.x - 30)) && ((this.x % 505) <= (player.x + 30)) && (this.y >= (player.y - 40)) && (this.y <= (player.y + 40))) {
        player.y = 405;
        player.x = 202;
    }
};
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
//更新并判断是否成功
var cs = true;
Player.prototype.update = function(canvas, isFirst) {
    var _this = this;
    isFirst = true;
    if ((_this.y - 63) < 0) {
        cs = win(canvas, cs);
        setTimeout(function() {
            _this.y = 405;
            _this.x = 202;
            ctx.clearRect(0, 0, canvas.width, 50);
            cs = true;
        }, 2500);
    }
};
//键盘操作
Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'left':
            if ((this.x - 55) > 0 && this.y > 63) {
                this.x -= 101;
            } else
                break;
            break;
        case 'right':
            if ((this.x + 101) < 450 && this.y > 63) {
                this.x += 101;
            } else
                break;
            break;
        case 'up':
            if ((this.y - 63) < 0) {
                break;
            } else
                this.y -= 83;
            break;
        case 'down':
            // if ((this.y + 83) < 489) {
            if (this.y < 400 && this.y > 63) {
                this.y += 83;
            } else
                break;
            break;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//成功动画展示
var win = function(canvas, isFirst) {
    if (isFirst) {
        ctx.font = '36px Impact';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText('w i n', canvas.width / 2, 36);
        isFirst = false;
    }
    return isFirst;
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
// var allEnemies = [new Enemy(0, 312, 100)];
var allEnemies = [];
var Enemy_y = [63, 146, 229, 312];
for (var i = 0; i < 4; i++) {

    var y = Math.floor(Math.random() * Enemy_y.length);
    var _y = Enemy_y[y];
    var speed = Math.random() * 100 + 200;
    allEnemies[i] = new Enemy(0, _y, speed);
}
var player = new Player(300, 405);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});