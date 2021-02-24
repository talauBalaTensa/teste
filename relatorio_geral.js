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

    this.run = function() {

        // PARÂMETROS
        // variáveis
        var dias = 1250;
        var semanas = 85;
        var meses = 42;
        var anos = 3;
        var tp = 20;
        var sl = 10;
        var MACD_fastperiod = 15;
        var MACD_slowperiod = 23;
        var MACD_signalperiod = 40;
        var SMA_period = 69;
        lines_parametros = [
            ['Dias:'             ,  '', dias],
            ['Semanas:'          ,  '', semanas],
            ['Meses:'            ,  '', meses],
            ['Anos:'             ,  '', anos],
            ['Take profit:'      , '%', tp],
            ['Stop loss:'        , '%', sl],
            ['MACD fastperiod:'  ,  '', MACD_fastperiod],
            ['MACD slowperiod:'  ,  '', MACD_slowperiod],
            ['MACD signalperiod:',  '', MACD_signalperiod],
            ['SMA period:'       ,  '', SMA_period]
        ]

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
        for (var i = 0; i < lines_parametros.length; i++){

            if (isMouseOver(this.X1 + 20, this.Y + 80 + 50*i, this.W - 40, 45)) {
                this.font_size[i] = increment(this.font_size[i], 0.04, 1);
                this.cell_bg[i] = increment(this.cell_bg[i], 0.001, 0.1);
            } else {
                this.font_size[i] = increment(this.font_size[i], -0.1, 0);
                this.cell_bg[i] = increment(this.cell_bg[i], -0.0015, 0.04);
            }

            fill(255, 255, 255, this.cell_bg[i]);
            rect(this.X1 + 20, this.Y + 80 + 50*i, this.W - 40, 45);

            var x = this.X1 + 40;
            var y = this.Y + 110 + 50*i;

            fill(255, 255, 255);
            textAlign("right");
            font(17, "poppins");
            text(lines_parametros[i][0], x + 170, y);
            textAlign("center");
            font(17 + this.font_size[i], "poppins");
            text(lines_parametros[i][2], x + 250, y);
            width = Math.ceil(ctx.measureText(lines_parametros[i][2]).width);
            if (lines_parametros[i][1] != ''){
                font(13 + this.font_size[i], "poppins");
                fill(150, 240, 255);
                text(lines_parametros[i][1], x + 257 + width/2, y);
            }
        }
        
        // RESULTADOS
        // variáveis
        var LLM = 8.06;
        var LL = 2400;
        var HODL = 1200;
        var initial_balance = 100;
        var actual_balance = 2500;
        var operacoes = 1052;
        var acertos = 380;
        var erros = 672;
        var ta = 40;
        var te = 72;
        lines_resultados = [
            ['LLM:'              , '%', LLM],
            ['LL:'               , '%', LL],
            ['HODL:'             , '%', HODL],
            ['Balanço inicial:'  , '$', initial_balance],
            ['Balanço atual:'    , '$', actual_balance],
            ['Operações:'        ,  '', operacoes],
            ['Acertos:'          ,  '', acertos],
            ['Erros:'            ,  '', erros],
            ['Taxa de acertos:'  , '%', ta],
            ['Taxa de exposição:', '%', te]
        ]

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
        for (var i = 0; i < lines_resultados.length; i++) {

            if (isMouseOver(this.X2 + 20, this.Y + 80 + 50*i, this.W - 40, 45)) {
                this.font_size2[i] = increment(this.font_size2[i], 0.04, 1.2);
                this.cell_bg2[i] = increment(this.cell_bg2[i], 0.001, 0.1);
            } else {
                this.font_size2[i] = increment(this.font_size2[i], -0.1, 0);
                this.cell_bg2[i] = increment(this.cell_bg2[i], -0.0015, 0.04);
            }

            fill(255, 255, 255, this.cell_bg2[i]);
            rect(this.X2 + 20, this.Y + 80 + 50*i, this.W - 40, 45);
            
            var x = this.X2 + 40;
            var y = this.Y + 110 + 50*i;

            fill(255, 255, 255);
            font(17, "poppins");
            textAlign("right");
            text(lines_resultados[i][0], x + 170, y);
            textAlign("center");
            font(17 + this.font_size2[i], "poppins");
            text(lines_resultados[i][2], x + 250, y);
            width = Math.ceil(ctx.measureText(lines_resultados[i][2]).width);
            if (lines_resultados[i][1] != '') {
                font(13 + this.font_size2[i], "poppins");
                fill(150, 240, 255);
                text(lines_resultados[i][1], x + 257 + width/2, y);
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

        if (frame == 1 || frame % 200 == 0) {
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

var bg_t = 0.1;

function relatorio_geral() {
    header.run();
    BTCUSDT_chart.run();

    /*
    if (isMouseOver(40, BTCUSDT_chart.Y + BTCUSDT_chart.H + 20, 1820, 80)) {
        bg_t = increment(bg_t, 0.002, 0.18);
    } else {
        bg_t = increment(bg_t, -0.002, 0.1);
    }

    fill(255, 255, 255, bg_t);
    rect(40, BTCUSDT_chart.Y + BTCUSDT_chart.H + 20, 1820, 80);
    textAlign("center");
    font(27, "poppins");
    fill(255, 255, 255);
    text('RELATÓRIO COMPLETO', 40 + 1820/2, BTCUSDT_chart.Y + BTCUSDT_chart.H + 70);
    */

    evolucao_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 120 - 100;
    evolucao_chart.run();

    distribuicao_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 120 - 100;
    distribuicao_chart.run();

    LL_relativo_mes_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 740 - 100;
    LL_relativo_mes_chart.run();

    LL_relativo_semana_chart.Y = BTCUSDT_chart.Y + BTCUSDT_chart.H + 740 - 100;
    LL_relativo_semana_chart.run();
}