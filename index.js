var width = innerWidth/4;

var height = innerHeight/2;

var app;

var j = 0;

var colors = [0x66CDAA, 0xF08080, 0x6B8E23, 0xFFFF00, 0xFF6347];

var model = {
    figure : [],
    gravity : 4,
    figuresAmount : -1,
    createCanvas: function() {
        app = new PIXI.Application(width, height);
        document.body.appendChild(app.view);
    },

    drawCircle: function () {
        rand = Math.floor(Math.random() * colors.length);
        var radius = width/8;
        var inAreaX = 3*width/4;
        var circleY = 50;
        var circleX;
        for (var i = 0; i < width; i+=radius) {
            circleX = i-width+86;
        }
        var circle = new PIXI.Graphics();
        circle.lineStyle(0); //начинаем рисовать
        circle.beginFill(colors[rand], 1); //задаем рандомный цвет
        circle.drawCircle(circleX, circleY, radius); //рисование круга
        circle.endFill(); //закончили отрисовку

        for (j = 0; j < width; j+=radius) {
            app.stage.addChild(circle);
        } ///выводим круг на холсте
    }
};

var view = {
    loadGame: function() {
        model.createCanvas();
        model.drawCircle();

        setInterval(model.drawCircle, 500);

        app.ticker.add(function() { //постоянное обновление холста
            for (var i = 0; i < model.figuresAmount; i++) {
                figure[i].position.y += gravity; //заставляем гравитацию работать
            }
    });
    }
};

var controller = {
    clearFigure: function () {
        this.clear();
    }
};

view.loadGame();