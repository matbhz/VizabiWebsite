var container = document.getElementById('start-splash-bubbles');
var container_width = container.offsetWidth;
var container_height = container.offsetHeight;

var sketch = function(s) {

    var time, theta = 0;
    var frames = 2400,
        num = 100,
        num2 = 50;
    var rs;

    s.setup = function() {
        s.createCanvas(container_width, container_height);
        s.smooth(8);
        s.noStroke();
        rs = s.random(10000);

        window.onresize = function() {
            container_width = container.offsetWidth;
            container_height = container.offsetHeight;
            s.createCanvas(container_width, container_height);
        }
    }

    s.draw = function() {
        s.randomSeed(rs);
        s.background("#58A1CE");
        time = (s.frameCount % frames) / s.float(frames);

        for (var i = 0; i < num; i++) {
            drawBubble(i);
        }
        theta += s.TWO_PI / frames;
    }

    function drawBubble(i) {
        var x = s.random(s.width);
        var y = s.random(s.height);
        var sc = s.random(1, 3);
        var rotation = s.random(-.01, 0.1);
        var m = s.map(s.sin(theta + (s.TWO_PI / num) * i), -1, 1, .5, 1);
        var sz = s.random(20, 70) * m;
        s.push();
        s.scale(sc);
        s.translate((x + s.frameCount) % s.width, y % s.height);
        s.rotate(rotation);
        s.fill('rgba(255, 255, 255, 1)');
        if (s.random(1) > .7) s.fill('rgba(55,55,55, 1)');
        if (s.random(1) > .8) s.fill('rgba(0, 0, 0, 1)');
        s.ellipse(0, -time * s.height + s.height, sz, sz);
        s.ellipse(0, -time * s.height, sz, sz);
        s.pop();
    }

};

var bubbles = new p5(sketch, 'start-splash-bubbles');


var viz = Vizabi('BubbleChart', document.getElementById('embeddable-container'), {
    state: {
        time: {
            start: '1900'
        }
    },
    data: {
        reader: 'csv-file',
        path: 'https://dl.dropboxusercontent.com/u/4933279/csv/basic-indicators.csv'
    },
    bind: {
        ready: function() {
            viz.setOptions({
                state: {
                    time: {
                        playing: true
                    }
                }
            });
        }
    }
});

var embeddable = document.getElementById('embeddable-container');
var close_btn = document.getElementById('close-embeddable');
embeddable.addEventListener('click', function(e) {
    addClass(document.body, 'is-product-tour');
});

close_btn.addEventListener('click', function(e) {
    console.log('test');
    removeClass(document.body, 'is-product-tour');
    e.preventDefault();
});