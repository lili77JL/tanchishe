//游戏的自调用函数
(function () {
    var that = null;

    //构造游戏的函数
    function Game() {
        this.food = new Food();
        this.snake = new Snake();
        this.map = document.querySelector(".map");
        that = this;
    };
    //为游戏函数添加方法
    Game.prototype.init = function () {
        //食物初始化
        this.food.init(this.map);
        //小蛇初始化
        this.snake.init(this.map);
        this.runSnake();
        this.bindKey();
    };
    Game.prototype.runSnake = function () {
        var timeId = setInterval(function () {
            this.snake.move(this.food, this.map);
            this.snake.init(this.map);
            var maxX = this.map.offsetWidth / this.food.width;
            var maxY = this.map.offsetHeight / this.food.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                clearInterval(timeId);
                alert("游戏结束");
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that), 150);
    };
    //为游戏的函数的原型添加方法---改变蛇头移动方向
    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    };
    //把Game函数暴露给window，供全局调用
    window.Game = Game;
}());