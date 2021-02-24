function Chart(params) {
    this.X = params.X;
    this.Y = params.Y;
    this.W = params.W;
    this.H = params.H;
    this.top_offset = params.top_offset,
    this.bot_offset = params.bot_offset,
    this.left_offset = params.left_offset,
    this.right_offset = params.right_offset,

    this.bg_t = 0.15;
    
    this.title = {
        name: params.title.name,
        font_size: params.title.font_size
    };

    this.x_axis = {
        name: params.x_axis.name,
        font_size: params.x_axis.font_size,
        interval_unit: params.x_axis.interval_unit,
        interval_tick: params.x_axis.interval_tick,
        
        stamps: params.series[0].values.length
    };

    this.y_axis = {
        name: params.y_axis.name,
        font_size: params.y_axis.font_size,

        lowest: Math.min(0, Math.min(...params.series[0].values)),
        highest: Math.max(...params.series[0].values),
    };

    this.series = [
        {
            type: params.series[0].type,
            values: params.series[0].values,
        }
    ];

    this.mouse_interactions = function() {

        var div = function(num, den) {
            if (den == 0) { 
                return 0;
            }
            else { 
                return num/den;
            }

        }

        var vel = 0.2;
        if (isMouseOver(this.X, this.Y, this.W, this.H)) {
            this.bg_t = increment(this.bg_t, 0.0015, 0.21);

            if (mouseIsPressed) {
                this.X = increment(this.X, -vel, params.X - 5);
                this.Y = increment(this.Y, -vel, params.Y - 5);
                this.W = increment(this.W, +vel*2, params.W + 10);
                this.H = increment(this.H, +vel*2, params.H + 10);
            }
        } else {
            this.bg_t = increment(this.bg_t, -0.0015, 0.15);
        }
        if (!mouseIsPressed) {
            this.X = increment(this.X, +vel, params.X);
            this.Y = increment(this.Y, +vel, params.Y);
            this.W = increment(this.W, -vel*2, params.W);
            this.H = increment(this.H, -vel*2, params.H);
        }
        
        if (this.y_axis.name == undefined) {
            this.left_offset = 50;
        }
        this.x = this.X + this.left_offset;
        this.w = this.W - this.left_offset - this.right_offset;
        this.y = this.Y + this.H - this.bot_offset - this.y_axis.highest/(this.y_axis.highest - this.y_axis.lowest);
        this.h = this.H - this.top_offset - this.bot_offset;

        this.y_axis.stamps = 4;
        this.bellow_0h = Math.abs(this.y_axis.lowest/(this.y_axis.highest - this.y_axis.lowest))*this.h;
        this.y_axis.stamps_bellow_0h = Math.floor(this.y_axis.stamps*Math.abs(div(this.y_axis.lowest, this.y_axis.highest)));
    }

    this.run = function() {

        this.mouse_interactions();
        
        // Background
        fill(255, 255, 255, this.bg_t);
        rect(this.X, this.Y, this.W, this.H);

        // Título
        textAlign("center");
        font(this.title.font_size, "poppins");
        fill(255, 255, 255);
        if (this.title.name.includes('($)')) {
            this.title.name2 = this.title.name.replace('($)', '');

            text(this.title.name2, this.X + this.W/2, this.Y + this.top_offset/2);
            font(this.title.font_size/1.6, "poppins");
            fill(0, 0, 0);
            text('$', this.X + this.W/2 + Math.ceil(ctx.measureText(this.title.name2).width)*0.81, this.Y + this.top_offset/2);
        }
        else if (this.title.name.includes('(%)')) {
            this.title.name2 = this.title.name.replace('(%)', '');

            text(this.title.name2, this.X + this.W/2, this.Y + this.top_offset/2);
            font(this.title.font_size/1.6, "poppins");
            fill(0, 0, 0);
            text('%', this.X + this.W/2 + Math.ceil(ctx.measureText(this.title.name2).width)*0.81, this.Y + this.top_offset/2);
        }
        else {
            text(this.title.name, this.X + this.W/2, this.Y + this.top_offset/2);
        }

        // Grid
        stroke(255, 255, 255, 0.5);
        for (var i = 0; i <= this.y_axis.stamps; i++) {
            //line(this.x, this.y - i*(this.h/this.y_axis.stamps), this.x + this.w, this.y - i*(this.h/this.y_axis.stamps));
        }

        // Data series
        for (var i = 0; i < this.series[0].values.length; i++) {
            if (this.series[0].type == 'line') {
                var x = this.x + i*(this.w/(this.series[0].values.length - 1));
                var y = this.y - this.series[0].values[i]/(this.y_axis.highest)*this.h;
                
                if (i < this.series[0].values.length - 1) {
                    var next_x = this.x + (i + 1)*(this.w/(this.series[0].values.length - 1));
                    var next_y = this.y - this.series[0].values[i + 1]/(this.y_axis.highest)*this.h;

                    stroke(0, 0, 0);
                    line(x + 0.5, y + 0.5, next_x + 0.5, next_y + 0.5);
                }
            }

            if (this.series[0].type == 'bar') {
                var w = 20;
                var x = this.x + w/2 + i*((this.w - w)/(this.series[0].values.length - 1));
                var y = this.y - this.bellow_0h;
                var h = this.series[0].values[i]/(this.y_axis.highest - this.y_axis.lowest)*this.h;

                fill(40, 160, 246);
                rect(x - w/2, y, 20, -h);
            }
        }

        lineWidth(1);
        fill(255, 255, 255);
        stroke(255, 255, 255);

        // Eixo x
        line(this.x, this.y - this.bellow_0h, this.x + this.w, this.y - this.bellow_0h);
        if (this.x_axis.name != undefined) {
            font(this.x_axis.font_size, "poppins");
            text(this.x_axis.name, this.x + this.w/2, this.y + this.bot_offset/2 + 15);
        }
 
        for (var i = 0; i < this.x_axis.stamps; i++) {
            if (this.series[0].type == 'line') {
                text(i, this.x + i*(this.w/(this.x_axis.stamps - 1)), this.y + 20);
            }
            if (this.series[0].type == 'bar') {
                text(i, this.x + 20/2 + i*((this.w - 20)/(this.x_axis.stamps - 1)), this.y - this.bellow_0h + 20);
            }
        }

        // Eixo y
        line(this.x, this.y, this.x, this.y - this.h);
        if (this.y_axis.name != undefined) {
            font(this.y_axis.font_size, "poppins");
            ctx.save();
            ctx.rotate(-90*Math.PI/180);
            text(this.y_axis.name, -(this.y - this.h/2), this.x - this.left_offset/2 - 10);
            ctx.restore();
        }

        textAlign('right');
        if(dist(0, this.y, 0, mouseY) > 10 || !isMouseOver(this.x, this.y, this.w, this.h)){
            text("0", this.x - 10, this.y - this.bellow_0h + 4);
        }
        // above x axis
        for(var i = 1; i <= this.y_axis.stamps; i++){

            var stamp_space = (this.h - this.bellow_0h)/this.y_axis.stamps;
            text((this.y_axis.highest*i/this.y_axis.stamps).toFixed(1), this.x - 10, this.y - this.bellow_0h - i*stamp_space + 4);
        }

        // bellow x axis
        for(var i = 1; i <= this.y_axis.stamps_bellow_0h; i++){

            var stamp_space = this.bellow_0h/this.y_axis.stamps_bellow_0h;
            text((this.y_axis.lowest*i/this.y_axis.stamps_bellow_0h).toFixed(1), this.x - 10, this.y - this.bellow_0h + i*stamp_space + 4);
        }
    }
}