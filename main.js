var header_params = {
    X: 40,
    Y: 130,
    W: 380,
    H: 600
}

var btcusdt_params = {
    X: 40,
    Y: 750,
    W: 1820,
    H: 700,
    top_offset: 80,
    bot_offset: 40,
    left_offset: 30,
    right_offset: 100,
    price_stamps: 4
}

var charts = {
    evolucao: {
        X: 40,
        Y: 1500,
        W: 900,
        H: 600,
        top_offset: 80,
        bot_offset: 60,
        left_offset: 80,
        right_offset: 40,
        
        title: {
            name: 'EVOLUÇÃO DO BALANÇO ($)',
            font_size: 23
        },

        x_axis: {
            name: 'OPERAÇÃO',
            font_size_legend: 14,
            font_size_values: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            name: 'BALANÇO ($)',
            font_size_legend: 12,
            major_tick_mark: true
        },

        series: [
            {
                type: 'line',
                y_values: []
            }
        ],
    },

    distribuicao: {
        X: 960,
        Y: 1500,
        W: 900,
        H: 600,
        top_offset: 80,
        bot_offset: 60,
        left_offset: 80,
        right_offset: 40,
        
        title: {
            name: 'DISTRIBUIÇÃO DA FREQUÊNCIA DE LUCRO BRUTO RELATIVO',
            font_size: 23
        },

        x_axis: {
            name: 'LUCRO BRUTO (%)',
            font_size_legend: 14,
            font_size_values: 10,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            name: 'FREQUÊNCIA',
            font_size_legend: 12,
            lowest: 0,
            major_tick_mark: false,
        },

        series: [
            {
                type: 'bar',
                width: 0.8,
                x_values: [],
                y_values: []
            }
        ],
    },

    LL_relativo_mes: {
        X: 40,
        Y: 2000,
        W: 900,
        H: 600,
        top_offset: 80,
        bot_offset: 60,
        left_offset: 80,
        right_offset: 40,
        
        title: {
            name: 'LUCRO LÍQUIDO RELATIVO POR MÊS (%)',
            font_size: 21
        },

        x_axis: {
            name: 'MÊS',
            font_size_legend: 14,
            font_size_values: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            lowest: 0,
            font_size_legend: 12,
            major_tick_mark: false
        },

        series: [
            {
                type: 'bar',
                width: 0.6,
                x_values: [],
                y_values: [],
            }
        ],  
    },

    LL_relativo_semana: {
        X: 960,
        Y: 2000,
        W: 900,
        H: 600,
        top_offset: 80,
        bot_offset: 60,
        left_offset: 80,
        right_offset: 40,
        
        title: {
            name: 'LUCRO LÍQUIDO RELATIVO POR SEMANA (%)',
            font_size: 21
        },

        x_axis: {
            name: 'SEMANA',
            font_size_legend: 14,
            font_size_values: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            lowest: 0,
            font_size_legend: 12,
            major_tick_mark: false
        },

        series: [
            {
                type: 'bar',
                width: 0.6,
                x_values: [],
                y_values: []
            }
        ],  
    }
}

var page = 'relatorio'
var subpage = 'geral';
var bg_t1 = 0.1;
var bg_t2 = 0.1;

var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
addColor(gradient, 0, 70, 112, 200);
addColor(gradient, 0.6, 50, 190, 210);

function loop() {

    frame++;
    mouseEvents();

    if (page == 'relatorio') {

        if (frame == 1){
    
            for (var i = 0; i < API_DATA_STRING.length; i++){
                if (i != 13 && i != API_DATA_STRING.length - 2){
                    API_DATA += API_DATA_STRING[i];
                }
            }
            API_DATA = JSON.parse(API_DATA).API_DATA;
            console.log(API_DATA);
    
            header = new Header(header_params);
            BTCUSDT_chart = new Chart_BTCUSDT(btcusdt_params);
    
            charts.evolucao.series[0].x_values = [0, 1, 2, 3, 4];
            charts.evolucao.series[0].y_values = API_DATA.charts_series[0];
            charts.distribuicao.series[0].x_values = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
            charts.distribuicao.series[0].y_values = API_DATA.charts_series[1];
            
            evolucao_chart = new Chart(charts.evolucao);
            distribuicao_chart = new Chart(charts.distribuicao);
            LL_relativo_mes_chart = new Chart(charts.LL_relativo_mes);
            LL_relativo_semana_chart = new Chart(charts.LL_relativo_semana);
        }
    
        ctx.fillStyle = gradient;
        rect(0, 0, canvas.width, canvas.height);
    
        font(28, 'poppins');
        textAlign('center');
    
        // Botão 1
        if (isMouseOver(40, 20, 905, 80)) {
            bg_t1 = increment(bg_t1, 0.002, 0.18);
        }
        else {
            bg_t1 = increment(bg_t1, -0.002, 0.1);
        }
        fill(255, 255, 255, bg_t1);
        rect(40, 20, 905, 80);
        fill(255, 255, 255);
        text('RELATÓRIO GERAL', 40 + 900/2, 30 + 80/2);
    
        // Botão 2
        if (isMouseOver(955, 20, 905, 80)) {
            bg_t2 = increment(bg_t2, 0.002, 0.18);
        }
        else {
            bg_t2 = increment(bg_t2, -0.002, 0.1);
        }
        fill(255, 255, 255, bg_t2);
        rect(955, 20, 905, 80);
        fill(255, 255, 255);
        text('RELATÓRIO OPERACIONAL', 950 + 900/2, 30 + 80/2);

        if (subpage == 'geral') {
            relatorio_geral();
        }

        if (subpage == 'operacional') {

        }
    }
}

setInterval(loop, 1);