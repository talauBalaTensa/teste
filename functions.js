// Canvas variables
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
canvas.width = screen.width - 17;
canvas.height = 3000;

// Auxiliary drawing functions
var textAlign = function(align) {
    return ctx.textAlign = align;
}
var lineWidth = function(w) {
    return ctx.lineWidth = w;
}
var elli = function(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 360, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}
var font = function(size, font) {
    return ctx.font = "" + size + "px " + font + "";
}
var fill = function(r, g, b, t) {
    if (t == undefined) {
        return ctx.fillStyle = "rgb( " + r + ", " + g + ", " + b + ")";
    }
    if (t != undefined) {
        return ctx.fillStyle = "rgba( " + r + ", " + g + ", " + b + ", " + t + ")";
    }
}
var rect = function(x, y, w, h) {
    return ctx.fillRect(x, y, w, h);
}
var text = function(t, x, y) {
    return ctx.fillText(t, x, y);
}
var stroke = function(r, g, b, t) {
    if (t == undefined) {
        return ctx.strokeStyle = "rgb( " + r + ", " + g + ", " + b + ")";
    }
    if (t != undefined) {
        return ctx.strokeStyle = "rgba( " + r + ", " + g + ", " + b + ", " + t + ")";
    }
}
var dist = function(ax, ay, bx, by) {
    return Math.abs(Math.sqrt((ax - bx)*(ax - bx) + (ay - by)*(ay - by)));
}
var line = function(ax, ay, bx, by) {
    ctx.beginPath();
    ctx.lineCap = "butt";
    ctx.moveTo(ax - 0.5, ay - 0.5);
    ctx.lineTo(bx - 0.5, by - 0.5);
    ctx.stroke();
    ctx.closePath();
}
var isMouseOver = function(x, y, w, h, include) {
    if(include || include == undefined){
        if(mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h){
            return true;
        } else {
            return false;
        }
    } else {
        if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
            return true;
        } else {
            return false;
        }    
    }
}
var addColor = function(gradient, num, r, g, b, t) {
    if (t == undefined) {
        return gradient.addColorStop(num, "rgba( " + r + ", " + g + ", " + b + ")");    
    }
    if (t != undefined) {
        return gradient.addColorStop(num, "rgba( " + r + ", " + g + ", " + b + ", " + t + ")");
    }
}
var increment = function(variable, speed, to) {
    if (speed > 0 && variable < to) {
        variable += speed;
        if (variable > to) { variable = to; }
    }
    if (speed < 0 && variable > to) {
        variable += speed;
        if (variable < to) { variable = to; }   
    }

    return variable;
}

// Mouse variables
var mouseWasReleased = false;
var mouseIsPressed = false;
var mouseClicked = false;
var mouseX = 0;
var mouseY = 0;
var timer = {
    mouseA: 0,
    mouseB: 0,
}

// Mouse listeners
document.addEventListener("mousedown", function(e) {
    mouseIsPressed = true;
    mouseClicked = true;
});
document.addEventListener("mouseup", function(e) {
    mouseIsPressed = false;
    mouseWasReleased = true;
});
document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX - ctx.canvas.offsetLeft - canvas.getBoundingClientRect().x;
    mouseY = e.clientY - ctx.canvas.offsetTop - canvas.getBoundingClientRect().y;
});
document.addEventListener("onwheel", function(e) {
    console.log('oi');
});
var mouseEvents = function(){
    if(timer.mouseA > 0) {
        timer.mouseA = 1;
        mouseWasReleased = false;
    }
    if(mouseWasReleased) {
        timer.mouseA++;
    }
    if(mouseIsPressed) {
        timer.mouseA = 0
    }
    
    if(timer.mouseB > 0) {
        timer.mouseB = 1;
        mouseClicked = false;
    }
    if(mouseClicked) {
        timer.mouseB++;
    }
    if(mouseWasReleased) {
        timer.mouseB = 0;
    }
} 