var API_DATA = '';

function Header(header_params) {

    this.Y = header_params.Y;
    this.W = header_params.W;
    this.H = header_params.H;
    this.X1 = header_params.X;
    this.X2 = this.X1 + this.W + 20;
    this.title1 = 'PARÂMETROS';
    this.title2 = 'RESULTADOS';
    this.title3 = 'TABELA';

    this.cell_bg = [0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04];
    this.font_size = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.cell_bg2 = [0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04];
    this.font_size2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.lines_parametros = [];
    this.lines_resultados = [];

    this.run = function() {

        if (frame == 1){
            var jj = 0;
            for (var j in API_DATA.parametros){
                this.lines_parametros[jj] = [j, API_DATA.parametros[j]];
                jj++;
            }
            var jj = 0;
            for (var j in API_DATA.resultados){
                this.lines_resultados[jj] = [j, API_DATA.resultados[j]];
                jj++;
            }
        }

        // PARÂMETROS
        // background
        fill(255, 255, 255, 0.08);
        rect(this.X1, this.Y, this.W, this.H);

        // título
        fill(255, 255, 255, 0.08);
        rect(this.X1, this.Y, this.W - 1, 70);
        textAlign("center");
        font(25, "poppins");
        fill(255, 255, 255);
        text(this.title1, this.X1 + this.W/2, this.Y + 45);

        // células
        font(18, "poppins");
        for (var i = 0; i < this.lines_parametros.length; i++){

            if (isMouseOver(this.X1 + 20, this.Y + 80 + i*500/this.lines_parametros.length, this.W - 40,  500/this.lines_parametros.length - 2)) {
                this.font_size[i] = increment(this.font_size[i], 0.04, 1);
                this.cell_bg[i] = increment(this.cell_bg[i], 0.001, 0.1);
            } else {
                this.font_size[i] = increment(this.font_size[i], -0.1, 0);
                this.cell_bg[i] = increment(this.cell_bg[i], -0.0015, 0.04);
            }

            fill(255, 255, 255, this.cell_bg[i]);
            rect(this.X1 + 20, this.Y + 80 + i*500/this.lines_parametros.length, this.W - 40, 500/this.lines_parametros.length - 2);

            var x = this.X1 + 40;
            var y = this.Y + 80 + (500/this.lines_parametros.length)*i + 28;

            fill(255, 255, 255);
            textAlign("right");
            font(17, "poppins");
            text(this.lines_parametros[i][0], x + 170, y);
            textAlign("center");
            font(17 + this.font_size[i], "poppins");
            text(this.lines_parametros[i][1], x + 250, y);
            width = Math.ceil(ctx.measureText(this.lines_parametros[i][1]).width);
            if (i == 5 || i == 6) {
                font(13 + this.font_size[i], "poppins");
                fill(150, 240, 255);
                text('%', x + 256 + width/2, y);
            }
        }

        // RESULTADOS
        // background
        fill(255, 255, 255, 0.08);
        rect(this.X2, this.Y, this.W, this.H);

        // título
        fill(255, 255, 255, 0.08);
        rect(this.X2, this.Y, this.W, 70);
        textAlign("center");
        font(25, "poppins");
        fill(255, 255, 255);
        text(this.title2, this.X2 + this.W/2, this.Y + 45);

        // célula
        for (var i = 0; i < this.lines_resultados.length; i++) {

            if (isMouseOver(this.X2 + 20, this.Y + 80 + i*500/this.lines_resultados.length, this.W - 40, 500/this.lines_parametros.length - 2)) {
                this.font_size2[i] = increment(this.font_size2[i], 0.04, 1.2);
                this.cell_bg2[i] = increment(this.cell_bg2[i], 0.001, 0.1);
            } else {
                this.font_size2[i] = increment(this.font_size2[i], -0.1, 0);
                this.cell_bg2[i] = increment(this.cell_bg2[i], -0.0015, 0.04);
            }

            fill(255, 255, 255, this.cell_bg2[i]);
            rect(this.X2 + 20, this.Y + 80 + i*500/this.lines_resultados.length, this.W - 40, 500/this.lines_resultados.length - 2);
            
            var x = this.X2 + 40;
            var y = this.Y + 80 + i*500/this.lines_resultados.length + 30;

            fill(255, 255, 255);
            font(17, "poppins");
            textAlign("right");
            text(this.lines_resultados[i][0], x + 170, y);
            textAlign("center");
            font(17 + this.font_size2[i], "poppins");
            text(this.lines_resultados[i][1], x + 250, y);
            width = Math.ceil(ctx.measureText(this.lines_resultados[i][1]).width);
            if (i < 3 || i > 7) {
                font(13 + this.font_size2[i], "poppins");
                fill(150, 240, 255);
                text('%', x + 257 + width/2, y);
            }
            else if (i < 5) {
                font(13 + this.font_size2[i], "poppins");
                fill(150, 240, 255);
                text('$', x + 257 + width/2, y);
            }
        }
    }
}

function Chart_BTCUSDT(btcusdt_params) {

    this.X = btcusdt_params.X;
    this.Y = btcusdt_params.Y;
    this.W = btcusdt_params.W;
    this.H = btcusdt_params.H;
    this.top_offset = btcusdt_params.top_offset;
    this.bot_offset = btcusdt_params.bot_offset;
    this.left_offset = btcusdt_params.left_offset;
    this.right_offset = btcusdt_params.right_offset;

    this.x = this.X + this.left_offset;
    this.y = this.Y + this.H - this.bot_offset;
    this.w = this.W - this.left_offset - this.right_offset;
    this.h = this.H - this.top_offset - this.bot_offset;

    this.title = 'GRÁFICO BTCUSDT';
    this.price_stamps = 4;
    this.candle_width = 0.6;
    this.highest_price = 0;
    this.lowest_price = Number.MAX_SAFE_INTEGER;
    this.collapse = false;
    this.collapsing = false;
    this.graph_t = 1;
    this.bg_t = 0.1;
    this.Hspeed = 1;
 
    this.green_color = [56, 142, 60];
    this.red_color = [211, 47, 47];

    this.run = function() {
        
        if (isMouseOver(this.X, this.Y, this.W, 80) && mouseClicked && !this.collapsing) { 
            this.collapse = !this.collapse;
            this.collapsing = true;
        }
        
        // Collapse animation
        if (this.collapse) {

            if (isMouseOver(this.X, this.Y, this.W, 80)) {
                this.bg_t = increment(this.bg_t, 0.002, 0.18);
            } else {
                this.bg_t = increment(this.bg_t, -0.002, 0.1);
            }
            
            this.graph_t = increment(this.graph_t, -0.035, 0);
            if (this.graph_t == 0) { 
                if (this.H > 80) {
                    if(this.H < 0.35*btcusdt_params.H){ this.Hspeed /= 1.12; } else { this.Hspeed *= 1.04; }
                    this.H -= this.Hspeed;
                } else {
                    this.Hspeed = 1;
                    this.H = 80;
                    this.collapsing = false;
                }
            }
        } 
        if (!this.collapse) {

            if (isMouseOver(this.X, this.Y, this.W, this.H)) {
                this.bg_t = increment(this.bg_t, 0.001, 0.18);
            } else {
                this.bg_t = increment(this.bg_t, -0.001, 0.12);
            }

            if (this.H < btcusdt_params.H) { 
                if(this.H > 0.75*btcusdt_params.H){ this.Hspeed /= 1.1; } else { this.Hspeed *= 1.04; }
                this.H += this.Hspeed;
            } else {
                this.H = btcusdt_params.H;
                this.Hspeed = 1;
                this.collapsing = false;

                this.graph_t = increment(this.graph_t, 0.03, 1);
            }
        }
        if (this.collapsing || frame == 1) {
            evolucao_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 120 - 100;
            distribuicao_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 120 - 100;
            LL_relativo_mes_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 740 - 100;
            LL_relativo_semana_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 740 - 100;

            charts.evolucao.Y = evolucao_chart.Y;
            charts.distribuicao.Y = distribuicao_chart.Y;
            charts.LL_relativo_mes.Y = LL_relativo_mes_chart.Y;
            charts.LL_relativo_semana.Y = LL_relativo_semana_chart.Y;
        }

        // Background
        fill(255, 255, 255, this.bg_t);
        rect(this.X, this.Y, this.W, this.H);

        // Título
        textAlign("center");
        font(27, "poppins");
        fill(255, 255, 255);
        text(this.title, this.X + this.W/2, this.Y + 50);

        if (this.graph_t > 0) { this.display(); }
    }

    this.display = function() {
        this.first_candle = 0;
        this.last_candle = candles;

        if (frame == 1) {
            get_candles_data();
        }
        
        // Defines highest and lowest price
        for (var i = this.first_candle; i < this.last_candle; i++) {
            if (candle[i][high] > this.highest_price) { this.highest_price = candle[i][high]; }
            if (candle[i][low] < this.lowest_price) { this.lowest_price = candle[i][low]; }
        }

        // Prices and horizontal lines
        font(14, "poppins");
        textAlign("center");
        fill(255, 255, 255, this.graph_t);
        stroke(100, 100, 100, 0.5*this.graph_t);
        lineWidth(1);
        for (var i = 0; i <= this.price_stamps + 1; i++) {
            var thisY = this.Y + this.top_offset + i*this.h/(this.price_stamps + 1);
            var price = (this.highest_price - i*(this.highest_price - this.lowest_price)/(this.price_stamps + 1)).toFixed(2);

            text(price, this.X + this.W - this.right_offset/2, thisY + 5);
            line(this.x, thisY, this.X + this.W - this.right_offset, thisY);
        }

        if (isMouseOver(this.x, this.y - this.h, this.w, this.h, true)) {
            var candleOnMouse = Math.floor((mouseX - this.x)*candles/this.w);
            var xCandleOnMouse = Math.round(this.x + (candleOnMouse + 0.5)*this.w/candles);
            var priceOnMouse = (this.lowest_price + ((this.y - mouseY)/this.h)*(this.highest_price - this.lowest_price)).toFixed(2);

            // Mouse lines
            lineWidth(1);
            stroke(50, 50, 50, 0.5);
            line(this.x, mouseY, this.x + this.w, mouseY);
            line(xCandleOnMouse, this.y - this.h, xCandleOnMouse, this.y);

            // Axis texts
            fill(0, 0, 0);
            text(priceOnMouse, this.X + this.W - this.right_offset/2, mouseY + 5);
            text(candleOnMouse, xCandleOnMouse, this.y + 23);
        }

        // Candles
        for (var i = this.first_candle; i < this.last_candle; i++) {
            var X    = Math.round(this.x + (i - this.first_candle)*this.w/candles) + (1 - this.candle_width)*this.w/candles/2;
            var W    = Math.round(this.candle_width*this.w/candles);
            var H    =          (candle[i][open] - candle[i][close] )/(this.highest_price - this.lowest_price)*this.h;
            var Y    = this.y - (candle[i][open] - this.lowest_price)/(this.highest_price - this.lowest_price)*this.h;
            var HIGH = this.y - (candle[i][high] - this.lowest_price)/(this.highest_price - this.lowest_price)*this.h;
            var LOW  = this.y - (candle[i][low]  - this.lowest_price)/(this.highest_price - this.lowest_price)*this.h;
            
            if(candle[i][close] >= candle[i][open]){
                fill(...this.green_color, this.graph_t);
                stroke(...this.green_color, this.graph_t);
            }
            else {
                fill(...this.red_color, this.graph_t);
                stroke(...this.red_color, this.graph_t);
            }

            lineWidth(1 + 40/candles);
            rect(X, Y, W, H); //body
            line(X + Math.round(W/2), HIGH, X + Math.round(W/2), LOW); //shadow
        }
    }
}

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

        lowest: params.y_axis.lowest || Math.min(...params.series[0].values),
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
        this.y = this.Y + this.H - this.bot_offset - this.y_axis.lowest + this.y_axis.highest/(this.y_axis.highest - this.y_axis.lowest);
        this.h = this.H - this.top_offset - this.bot_offset;

        this.y_axis.stamps = 4;
        if (this.y_axis.lowest < 0){
            this.bellow_0h = Math.abs(this.y_axis.lowest/(this.y_axis.highest - this.y_axis.lowest))*this.h;
            this.y_axis.stamps_bellow_0h = Math.floor(this.y_axis.stamps*Math.abs(div(this.y_axis.lowest, this.y_axis.highest)));
        } 
        else {
            this.bellow_0h = 0;
            this.y_axis.stamps_bellow_0h = 0;
        }
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

        // Data series
        for (var i = 0; i < this.series[0].values.length; i++) {
            if (this.series[0].type == 'line') {
                var x = this.x + i*(this.w/(this.series[0].values.length - 1));
                var y = this.y - this.h*(this.series[0].values[i] - this.y_axis.lowest)/(this.y_axis.highest - this.y_axis.lowest);
                
                if (i < this.series[0].values.length - 1) {
                    var next_x = this.x + (i + 1)*(this.w/(this.series[0].values.length - 1));
                    var next_y = this.y - this.h*(this.series[0].values[i + 1] - this.y_axis.lowest)/(this.y_axis.highest - this.y_axis.lowest);

                    stroke(0, 0, 0);
                    line(x + 0.5, y - 0.5, next_x + 0.5, next_y - 0.5);
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
        stroke(255, 255, 255, 0.5);
        // above x axis
        for(var i = 0; i <= this.y_axis.stamps; i++){
            var stamp_space = (this.h - this.bellow_0h)/this.y_axis.stamps;

            text((this.y_axis.lowest + i*(this.y_axis.highest - this.y_axis.lowest)/this.y_axis.stamps).toFixed(1), this.x - 10, this.y - this.bellow_0h - i*stamp_space + 4);
            line(this.x, this.y - this.bellow_0h - i*stamp_space + 4, this.x + this.w, this.y - this.bellow_0h - i*stamp_space + 4);
        }

        // bellow x axis
        for(var i = 0; i <= this.y_axis.stamps_bellow_0h; i++){
            var stamp_space = this.bellow_0h/this.y_axis.stamps_bellow_0h;

            text((i*this.y_axis.lowest/this.y_axis.stamps_bellow_0h).toFixed(1), this.x - 10, this.y - this.bellow_0h + i*stamp_space + 4);
            line(this.x, this.y - this.bellow_0h - i*stamp_space + 4, this.x + this.w, this.y - this.bellow_0h - i*stamp_space + 4);
        }
    }
}

function relatorio_geral() {
    header.run();
    BTCUSDT_chart.run();

    evolucao_chart.run();
    distribuicao_chart.run();
    //LL_relativo_mes_chart.run();
    //LL_relativo_semana_chart.run();
}