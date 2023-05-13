// Code for particle explosion effect from Dean Wagman: https://codepen.io/deanwagman/pen/EjLBdQ

function explode() {
    var items = document.querySelectorAll("img"),
        elem = items[0].getBoundingClientRect();
    var x = elem.x + elem.width / 2;
        y = elem.y + elem.height / 2;
    cleanUpArray();
    initParticles(config.particleNumber, x, y);
    items[0].style.display = "none";
    for (i = 1; i < items.length; i++) {
        items[i].style.display = "block";
        console.log(items[i]);
    }
}

function computer() {
    var items = document.querySelectorAll("img");
    var elem = document.getElementById("computer-text");
    if (elem.style.display == "none") {
        elem.style.display = "block";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "none";
            console.log(items[i]);
        }
        elem = document.getElementById("computer");
            elem.style.display = "block";
    } else {
        elem.style.display = "none";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "block";
            console.log(items[i]);
        }
    }
}

function jacket() {
    var items = document.querySelectorAll("img");
    var elem = document.getElementById("jacket-text");
    if (elem.style.display == "none") {
        elem.style.display = "block";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "none";
            console.log(items[i]);
        }
        elem = document.getElementById("jacket");
            elem.style.display = "block";
    } else {
        elem.style.display = "none";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "block";
            console.log(items[i]);
        }
    }

}

function down() {
    var items = document.querySelectorAll("img");
    var elem = document.getElementById("down-text");
    if (elem.style.display == "none") {
        elem.style.display = "block";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "none";
            console.log(items[i]);
        }
        elem = document.getElementById("down");
            elem.style.display = "block";
    } else {
        elem.style.display = "none";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "block";
            console.log(items[i]);
        }
    }
}

function masks() {
    var items = document.querySelectorAll("img");
    var elem = document.getElementById("masks-text");
    if (elem.style.display == "none") {
        elem.style.display = "block";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "none";
            console.log(items[i]);
        }
        elem = document.getElementById("masks");
            elem.style.display = "block";
    } else {
        elem.style.display = "none";
        for (i = 1; i < items.length; i++) {
            items[i].style.display = "block";
            console.log(items[i]);
        }
    }
}

// Little Canvas things
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration, Play with these
var config = {
  particleNumber: 800,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50
};

// Colors
var colorPalette = {
    bg: {r:255, g:255, b: 255},
    matter: [
      {r:254,g:255,b:181}, // darkPRPL
      {r:255,g:192,b:113}, // rockDust
      {r:255,g:162,b:85}, // solorFlare
      {r:255,g:91,b:20}, // totesASun
      {r:255,g:35,b:35}
    ]
};

// Some Variables hanging out
var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    drawBg,

// Draws the background for the canvas, because space
drawBg = function (ctx, color) {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

// Particle Constructor
var Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],true );
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r,g,b,a, variation;
    r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.r);
    g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
    b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {r,g,b,a};
    }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
    p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
    return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function () {
    particles = particles.filter((p) => { 
      return (p.x > -100 && p.y > -100); 
    });
};


var initParticles = function (numParticles, x, y) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
};

// That thing
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function(callback) {
        window.setTimeout(callback, 1000 / 60);
     };
})();


// Our Frame function
var frame = function () {
  // Draw background first
  drawBg(ctx, colorPalette.bg);
  // Update Particle models to new position
  particles.map((p) => {
    return updateParticleModel(p);
  });
  // Draw em'
  particles.forEach((p) => {
      drawParticle(p.x, p.y, p.r, p.c);
  });
  // Play the same song? Ok!
  window.requestAnimFrame(frame);
};

frame();