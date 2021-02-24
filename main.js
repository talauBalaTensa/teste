var header_params = {
    X: 40,
    Y: 130,
    W: 380,
    H: 600
};

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
};

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
            font_size: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            name: 'BALANÇO ($)',
            font_size: 14,
            major_tick_mark: 'none'
        },

        series: [
            {
                type: 'line',
                values: [1, 2, 3, 8, 9, 5, 6, 8, 12, 15, 14, 12, 16, 18, 22],
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
            font_size: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            name: 'FREQUÊNCIA',
            font_size: 14,
            major_tick_mark: 'none'
        },

        series: [
            {
                type: 'bar',
                width: 0.8,
                values: [0, 0, 1, 2, 4, 7, 11, 16, 17, 15, 13, 9, 6, 7, 5, 4, 4, 2, 1, 0, 0, 1],
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
            font_size: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            major_tick_mark: 'none'
        },

        series: [
            {
                type: 'bar',
                width: 0.6,
                values: [8, 7, -2, -4, 11, 14, 15, 12, 1, 2, -8, -1, 6, 16],
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
            font_size: 14,
            interval_unit: 1,
            interval_tick: 1
        },

        y_axis: {
            major_tick_mark: 'none'
        },

        series: [
            {
                type: 'bar',
                width: 0.6,
                values: [8, 7, -2, -4, 11, 14, 15, 7, -2, -4, 11, 14, 1, 5, 12, 1, 2, -8, -1, 15, 12, 1, 2, -8, -1, 6, 16,  6, 16],
            }
        ],  
    }
}

var page = 'geral';
var bg_t1 = 0.1;
var bg_t2 = 0.1;

var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//addColor(gradient, 0, 130, 112, 219);
//addColor(gradient, 0.6, 0, 200, 201);
addColor(gradient, 0,   40, 140, 201);
addColor(gradient, 0.8, 100, 220, 201);

loop = function(){
    frame++;
    mouseEvents();

    if (frame == 1){
        header = new Header(header_params);
        BTCUSDT_chart = new Chart_BTCUSDT(btcusdt_params);
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
    } else {
        bg_t1 = increment(bg_t1, -0.002, 0.1);
    }
    
    fill(255, 255, 255, bg_t1);
    rect(40, 20, 905, 80);
    fill(255, 255, 255);
    text('RELATÓRIO GERAL', 40 + 900/2, 30 + 80/2);

    // Botão 2
    if (isMouseOver(955, 20, 905, 80)) {
        bg_t2 = increment(bg_t2, 0.002, 0.18);
    } else {
        bg_t2 = increment(bg_t2, -0.002, 0.1);
    }

    fill(255, 255, 255, bg_t2);
    rect(955, 20, 905, 80);
    fill(255, 255, 255);
    text('RELATÓRIO OPERACIONAL', 950 + 900/2, 30 + 80/2);

    if (page == 'geral') {
        relatorio_geral();
    }
}

setInterval(loop, 1);