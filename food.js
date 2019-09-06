//关于食物的自调用函数
(function () {
    var element = [];//用来保存每个小方块食物的
    //构造食物的函数
    function Food(x, y, width, height, color) {
        //横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        //宽和高
        this.width = width || 20;
        this.height = height || 20;
        //背景颜色
        this.color = color || "green";
    }

    //给食物的函数的原型添加方法。食物就是一个对象，有宽有高有颜色
    Food.prototype.init = function (map) {
        remove();
        var div = document.createElement("div");
        map.appendChild(div);
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        element.push(div);
    };

    //构造清除食物的函数
    function remove() {
        for (var i = 0; i < element.length; i++) {
            var ele = element[i];
            ele.parentNode.removeChild(ele);
            element.splice(i, 1);
        }
    };
    //把食物的函数暴露给全局
    window.Food = Food;
}());