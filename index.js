var width = window.innerWidth;
var height = window.innerHeight;
var app;
var colors = [0xFFFF0B, 0xFF700B, 0x4286f4, 0x4286f4, 0xf441e8, 0x8dff6d, 0x41ccc9, 0xe03375, 0x95e032, 0x77c687, 0x43ba5b, 0x0ea3ba];
var gravity = 4;
var figuresAmount = -1;
var figure = [];



var model = {
    createCanvas: function() {
        app = new PIXI.Application(width, height);
        document.body.appendChild(app.view);
    },
    drawCircle: function() {
        rand = Math.floor(Math.random() * colors.length);
        var radius = 50;
        var inAreaX = width - 100;
        var circleY = -50;
        var circleX = Math.floor(Math.random() * inAreaX);
        var circle = new PIXI.Graphics();
        circle.lineStyle(0);
        circle.beginFill(colors[rand], 1);
        circle.drawCircle(circleX, circleY, radius);
        circle.endFill();
        circle.interactive = true;
        circle.buttonMode = true;
        circle.live = true;
        figuresAmount++;
        circle.num = figuresAmount;
        figure.push(circle);
        app.stage.addChild(circle);
        circle.on('pointerdown', controller.clearFigure);
    },
    gameOver: function() {
        var style = new PIXI.TextStyle({
            fill: '0xffffff',
            fontSize: 36
        });
        var gameOverText = new PIXI.Text('Game Over', style);
        gameOverText.x = width / 2;
        gameOverText.y = height / 2;
        gameOverText.pivot.x = 50;
        gameOverText.pivot.y = 50;
        app.stage.addChild(gameOverText);
    }
};
var view = {
    loadGame: function() {
        model.createCanvas();
        model.drawCircle();

        setInterval(model.drawCircle, 500);

        app.ticker.add(function() {
            for (var i = 0; i < figuresAmount; i++) {
                figure[i].position.y += gravity;
                if (figure[i].position.y > height && figure[i].live == true) {
                    model.gameOver();
                    return false;
                }

            }
        });
    }
};


var controller = {
    clearFigure: function() {
        this.clear();
        figure[this.num].live = false;

    }
};

view.loadGame();