var XMLRequest = new XMLHttpRequest();
var open_time_check = [0, 0];
var highest = [0, 0];
var lowest = [0, 0];
var request_response = 0;
var previous_response = 0;

var _get = function(url, params){
    XMLRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            request_response = JSON.parse(XMLRequest.responseText);
            previous_response = request_response;
        }
        else {
            request_response = previous_response;
        }
    }
    XMLRequest.open('GET', url + params);
    XMLRequest.send();
}

var get_candles_data = function(){
    new_candle = false

    // This happens only when the program is first runned
    if (frame == 1){
        first_price = last_price;

        // Gets and stores data from the initial candles
        var url = "https://api.binance.com/api/v3/klines";
        var params = '?symbol=BTCUSDT&interval=' + time_frame + '&limit=' + candles;

        XMLRequest.onload = function() {
            request_response = JSON.parse(XMLRequest.responseText);
            previous_response = request_response;
        }
        XMLRequest.open('GET', url + params, false);
        XMLRequest.send();

        var data = request_response;

        // Writes data from initial candles
        for(var i = 0; i < candles; i++){
            candle.push([0, 0, 0, 0, 0, 0, 0]);

            candle[i][0] = parseFloat(data[i][0]);
            candle[i][1] = parseFloat(data[i][1]);
            candle[i][2] = parseFloat(data[i][2]);
            candle[i][3] = parseFloat(data[i][3]);
            candle[i][4] = parseFloat(data[i][4]);
            candle[i][5] = parseFloat(data[i][5]);
        }
    }
    // Defines URL and stores its data
    var url = "https://api.binance.com/api/v3/klines";
    var params = '?symbol=BTCUSDT&interval=' + time_frame + '&limit=2';

    XMLRequest.onload = function() {
        request_response = JSON.parse(XMLRequest.responseText);
        previous_response = request_response;
    }
    XMLRequest.open('GET', url + params);
    XMLRequest.send();

    var data = request_response;
    console.log(data)

    // Checks if a candle has been consolidated
    open_time_check[0] = open_time_check[1];
    open_time_check[1] = parseFloat(data[1][0]);
    if (open_time_check[0] != 0 && open_time_check[0] != open_time_check[1]){
        new_candle = true
        
        candles++;
        candle.push([0, 0, 0, 0, 0, 0, 0]);
        
        // Corrects consolidated candle's values
        candle[candles - 2][0] = parseFloat(data[0][0]);
        candle[candles - 2][1] = parseFloat(data[0][1]);
        candle[candles - 2][2] = parseFloat(data[0][2]);
        candle[candles - 2][3] = parseFloat(data[0][3]);
        candle[candles - 2][4] = parseFloat(data[0][4]);
        candle[candles - 2][5] = parseFloat(data[0][5]);
    }

    // Constantly updates values of the still-going candle (last element of var.candle)
    candle[candles - 1][0] = parseFloat(data[1][0]);
    candle[candles - 1][1] = parseFloat(data[1][1]);
    candle[candles - 1][2] = parseFloat(data[1][2]);
    candle[candles - 1][3] = parseFloat(data[1][3]);
    candle[candles - 1][4] = parseFloat(data[1][4]);
    candle[candles - 1][5] = parseFloat(data[1][5]);

    // Gets most recent price with highest accuracy
    var update_last_price = function(){
        if (new_candle || time_frame == 1){
            lowest = [candle[candles - 1][3], candle[candles - 1][3]];
            highest = [candle[candles - 1][2], candle[candles - 1][2]];
        }

        highest[0] = highest[1]
        highest[1] = candle[candles - 1][2]
        lowest[0] = lowest[1]
        lowest[1] = candle[candles - 1][3]
        
        if (highest[1] > highest[0]){
            last_price = highest[1]
        }

        if (lowest[1] < lowest[0]){
            last_price = lowest[1]
        }

        if (highest[0] == highest[1] && lowest[0] == lowest[1]){
            last_price = candle[candles - 1][4]
        }
    }
    update_last_price()
}