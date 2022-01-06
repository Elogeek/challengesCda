window.addEventListener("load", function() {
    const ctx = document.getElementById('bubbleCanvas').getContext('2d');
    //gradient
    let options = {
        resolution: 1,
        gradient:
            {
                resolution: 4,
                smallRadius: 0,
                hue:
                    {
                        min: 0,
                        max: 360
                    },
                saturation:
                    {
                        min: 40,
                        max: 80
                    },
                lightness:
                    {
                        min: 25,
                        max: 35
                    }
            },
        bokeh:
            {
                count: 30,
                size:
                    {
                        min: 0.1,
                        max: 0.3
                    },
                alpha:
                    {
                        min: 0.05,
                        max: 0.4
                    },
                jitter:
                    {
                        x: 0.3,
                        y: 0.3
                    }
            },
        speed:
            {
                min: 0.0001,
                max: 0.001
            },
        debug:
            {
                strokeBokeh: false,
                showFps: false
            }
    };

    // Canvas
    let gradientDesign = document.createElement('canvas').getContext('2d');
    let circleDesign = document.createElement('canvas').getContext('2d');

    //render time, fps calculations, debug
    let time;
    let targetFps = 60; //not actual fps, but updates per second
    let curFps = 0;
    let cntFps = 0;
    let fps = 0;
    let w = 0;
    let h = 0;
    let scale = 0;

    // To go faster
    let pi2 = Math.PI * 2;

    function leap(a, b, step) {
        return step * (b - a) + a;
    }

    function clamp(a) {
        if (a < 0) return 0;
        if (a > 1) return 1;
        return a;
    }

    // For to have a number random
    function rand(obj) {
        return Math.random() * (obj.max - obj.min) + obj.min;
    }

    // For to have a new color
    function newColor() {
        return new Color(
            rand(options.gradient.hue),
            rand(options.gradient.saturation),
            rand(options.gradient.lightness)
        );
    }

    // Before the next browser refresh, it must perform an animation update
    window.requestAnimFrame = (function(callback) {
        window.setTimeout(callback, 1000 / 60);
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame

    });

    //classes
    function Color(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;

        this.str = function() {
            return this.h + ", " + this.s + "%, " + this.l +"%";
        }
    }

    function ColorPoint(x, y, color) {
        this.x = x;
        this.y = y;
        this.oldColor = color;
        this.newColor = color;
        this.step = 0;
        this.speed = 0;

        this.color = function() {
            return new Color(leap(this.oldColor.h, this.newColor.h, this.step),
                leap(this.oldColor.s, this.newColor.s, this.step),
                leap(this.oldColor.l, this.newColor.l, this.step));
        }

    }

    let colorPoints = [
        new ColorPoint(0, 0, new Color(196, 59, 34)),
        new ColorPoint(0, 1, new Color(269, 79, 32)),
        new ColorPoint(1, 0, new Color(30, 42, 33)),
        new ColorPoint(1, 1, new Color(304, 47, 27)),
    ];

    function Circle(x, y, size, alpha) {
        this.oldX = x;
        this.oldY = y;
        this.oldSize = size;
        this.oldAlpha = alpha;
        this.newX = 0;
        this.newY = 0;
        this.newAlpha = 0;
        this.newSize = 0;
        this.step = 0;

        this.x = function() {
            return leap(this.oldX, this.newX, this.step);
        }
        this.y = function() {
            return leap(this.oldY, this.newY, this.step);
        }
        this.alpha = function() {
            return leap(this.oldAlpha, this.newAlpha, this.step);
        }
        this.size = function() {
            return leap(this.oldSize, this.newSize, this.step);
        }
    }

    let circles = [];

    function setJitter(circle) {
        circle.newX = clamp(circle.oldX + rand({
            min: -options.bokeh.jitter.x,
            max: options.bokeh.jitter.x
        }));
        circle.newY = clamp(circle.oldY + rand({
            min: -options.bokeh.jitter.y,
            max: options.bokeh.jitter.y
        }));
    }


    function resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        w = width * options.resolution;
        h = height * options.resolution;
        scale = Math.sqrt(w * h);

        //actual canvas
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        ctx.scale(1 / options.resolution, 1 / options.resolution);

        // Canvas circle
        let circleSize = options.bokeh.size.max * scale;
        circleDesign.canvas.width = circleSize * 2 + 1;
        circleDesign.canvas.height = circleSize * 2 + 1;

        circleDesign.fillStyle = "rgb(255, 255, 255)";
        circleDesign.beginPath();
        circleDesign.arc(circleSize, circleSize, circleSize, 0, pi2);
        circleDesign.closePath();
        circleDesign.fill();

        render();
    }

    function init() {
        gradientDesign.canvas.height = options.gradient.resolution;
        gradientDesign.canvas.width = options.gradient.resolution;

        resize();

        colorPoints.forEach(function(point) {
            point.oldColor = newColor();
            point.newColor = newColor()
            point.speed = rand(options.speed);
        });

        for(let i = 0; i < options.bokeh.count; i++) {
            circles.push(new Circle(Math.random(), Math.random(),
                rand(options.bokeh.size), rand(options.bokeh.alpha)));
            circles[i].newAlpha = rand(options.bokeh.alpha);
            circles[i].newSize = rand(options.bokeh.size);
            circles[i].speed = rand(options.speed);
            setJitter(circles[i]);
        }

    }

    function iterate() {
        let now = Date.now();
        curFps += (now - (time || now));
        cntFps++;
        let delta = (now - (time || now)) / (1000 / targetFps);
        time = now;

        if(curFps > 1000) {
            fps = 1000 / (curFps / cntFps);
            curFps -= 1000;
            cntFps = 0;
        }

        colorPoints.forEach(function(point) {
            point.step += point.speed * delta;

            if (point.step >= 1) {
                point.step = 0;

                point.oldColor = point.newColor;

                point.newColor = newColor();
                point.speed = rand(options.speed);
            }
        });

        circles.forEach(function(circle) {
            circle.step += circle.speed * delta;
            if(circle.step >= 1) {
                circle.step = 0;

                circle.oldX = circle.newX;
                circle.oldY = circle.newY;
                circle.oldAlpha = circle.newAlpha;
                circle.oldSize = circle.newSize;

                setJitter(circle);
                circle.newAlpha = rand(options.bokeh.alpha);
                circle.newSize = rand(options.bokeh.size);
                circle.speed = rand(options.speed);
            }
        });

    }

    function render() {
        iterate();

        // Draw point gradient to canvas(gradientDesgin)
        colorPoints.forEach(function(point) {
            let x = point.x * options.gradient.resolution;
            let y = point.y * options.gradient.resolution;
            let grad = gradientDesign.createRadialGradient(x, y,
                options.gradient.smallRadius, x, y,
                options.gradient.resolution);
            grad.addColorStop(0, 'hsla(' + point.color().str() + ', 255)');
            grad.addColorStop(1, 'hsla(' + point.color().str() + ', 0)');

            gradientDesign.fillStyle = grad;
            gradientDesign.fillRect(0, 0,
                options.gradient.resolution, options.gradient.resolution);
        });

        // Draw gradient from memory
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(gradientDesign.canvas, 0, 0, w, h);

        // Draw bokeh(==tampon)
        ctx.globalCompositeOperation = "overlay";
        if (options.debug.strokeBokeh)
            ctx.strokeStyle = "yellow";

        circles.forEach(function(circle) {
            let size = circle.size() * scale;

            ctx.globalAlpha = circle.alpha();
            ctx.drawImage(circleDesign.canvas,
                circle.x() * w - size / 2, circle.y() * h - size / 2,
                size, size);

            if(options.debug.strokeBokeh) {
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeRect(circle.x() * w - size / 2,
                    circle.y() * h - size / 2, size, size);
                ctx.globalCompositeOperation = "overlay";
            }
        });

        ctx.globalAlpha = 1;

        // Move the circles
        window.requestAnimFrame(render);
    }

    // Resize for the little screen
    window.addEventListener("resize", resize);
    init();
    render();

});