function Chart(params) {
    this.X = params.X;
    this.Y = params.Y;
    this.W = params.W;
    this.H = params.H;
    this.top_offset = params.top_offset,
    this.bot_offset = params.bot_offset,
    this.left_offset = params.left_offset,
    this.right_offset = params.right_offset,

    this.x = this.X + this.left_offset;
    this.y = this.Y + this.H - this.bot_offset;
    this.w = this.W - this.left_offset - this.right_offset;
    this.h = this.H - this.top_offset - this.bot_offset;

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

        stamps: Math.round(this.h/120),
        lowest: Math.min(0, Math.min(...params.series[0].values)),
        highest: Math.max(...params.series[0].values),
    };

    this.series = [
        {
            type: params.series[0].type,
            values: params.series[0].values,
        }
    ];

    this.run = function() {
        
        this.y = this.Y + this.H - this.bot_offset - this.y_axis.highest/(this.y_axis.highest - this.y_axis.lowest);
        this.bellow_0_h = Math.abs(this.y_axis.lowest/(this.y_axis.highest - this.y_axis.lowest))*this.h;

        if (this.series[0].type == 'bar') {
            this.bar_width = this.series[0].width*(this.series[0].values.length/this.w);
            text(this.series[0].width, 1000, 1500);
        }

        // Background
        if (isMouseOver(this.X, this.Y, this.W, this.H)) {
            this.bg_t = increment(this.bg_t, 0.0015, 0.18);
        } else {
            this.bg_t = increment(this.bg_t, -0.0015, 0.15);
        }
        fill(255, 255, 255, this.bg_t);
        rect(this.X, this.Y, this.W, this.H);

        // Título
        textAlign("center");
        font(this.title.font_size, "poppins");
        fill(255, 255, 255);
        text(this.title.name, this.X + this.W/2, this.Y + this.top_offset/2);

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
                var y = this.y - this.bellow_0_h;
                var h = this.series[0].values[i]/(this.y_axis.highest - this.y_axis.lowest)*this.h;

                fill(80, 160, 246);
                rect(x - w/2, y, 20, -h);
            }
        }

        lineWidth(1);
        fill(255, 255, 255);
        stroke(255, 255, 255);

        // Eixo x
        line(this.x, this.y - this.bellow_0_h, this.x + this.w, this.y - this.bellow_0_h);
        font(this.x_axis.font_size, "poppins");
        text(this.x_axis.name, this.x + this.w/2, this.y + 45);
        
        for (var i = 0; i < this.x_axis.stamps; i++) {
            if (this.series[0].type == 'line') {
                text(i, this.x + i*(this.w/(this.x_axis.stamps - 1)), this.y + 25);
            }
            if (this.series[0].type == 'bar') {
                text(i, this.x + 20/2 + i*((this.w - 20)/(this.x_axis.stamps - 1)), this.y - this.bellow_0_h + 25);
            }
        }

        // Eixo y
        line(this.x, this.y, this.x, this.y - this.h);
        font(this.y_axis.font_size, "poppins");
        ctx.save();
        ctx.rotate(-90*Math.PI/180);
        text(this.y_axis.name, -(this.y - this.h/2), this.x - 50);
        ctx.restore();

        if(dist(0, this.y, 0, mouseY) > 10 || !isMouseOver(this.x, this.y, this.w, this.h)){
            text("0", this.X + this.left_offset/2 + 15, this.y - this.bellow_0_h + 4);
        }
        // above x axis
        for(var i = 1; i <= this.y_axis.stamps; i++){
            var stamp_space = (this.h - this.bellow_0_h)/this.y_axis.stamps;

            text((this.y_axis.highest*i/this.y_axis.stamps).toFixed(1), this.X + this.left_offset/2 + 15, this.y - this.bellow_0_h - i*stamp_space + 4);

        }
        // bellow x axis
        
        for(var i = 1; i <= 2; i++){
            var stamp_space = this.bellow_0_h/2;

            text((this.y_axis.lowest*i/2).toFixed(1), this.X + this.left_offset/2 + 15, this.y - this.bellow_0_h + i*stamp_space + 4);

        }

        for (var i = 0; i <= this.y_axis.stamps; i++) {
            //text((this.y_axis.lowest + (this.y_axis.highest - this.y_axis.lowest)*(i/this.y_axis.stamps)).toFixed(1), this.x - 25, this.y - i*(this.h/this.y_axis.stamps) + 5);
        }
    }
}