//关于小蛇的自调用函数
(function () {
    var element = [];//用来保存组成小蛇方块的数组

    //构造小蛇的函数
    function Snake(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.body = [{x: 3, y: 2, color: "red"}, {x: 2, y: 2, color: "orange"}, {x: 1, y: 2, color: "orange"}];
        this.direction = direction || "right";
    };
    //为小蛇的函数的原型添加方法---初始化方法
    Snake.prototype.init = function (map) {
        remove();
        for (var i = 0; i < this.body.length; i++) {
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            var obj = this.body[i];
            div.style.backgroundColor = obj.color;
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            element.push(div);
        }
    };
    //为小蛇的函数的原型添加方法----移动的方法
    Snake.prototype.move = function (food, map) {
        //改变小蛇身体的位置
        var i = this.body.length - 1;//2
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //改变小蛇的头部的位置
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        var headX = this.body[0].x*this.width;
        var headY = this.body[0].y*this.height;
        if (headX == food.x && headY == food.y) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x, y: last.y, color: last.color
            });
            food.init(map);
        }
    };

    function remove() {
        var i = element.length - 1;
        for (; i >= 0; i--) {
            var ele = element[i];
            ele.parentNode.removeChild(ele);
            element.splice(i, 1);
        }
    };

    //把小蛇的函数暴露给全局
    window.Snake = Snake;
}());