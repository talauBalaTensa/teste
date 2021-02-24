// Dynamic variables
var time_frame = "1m"; //1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
var candles = 60;

// Static variables
var frame = 0;
var candle = [];
var new_candle = false;
var first_price = 0;
var last_price = 0;

var open = 1;
var high = 2;
var low = 3;
var close = 4;