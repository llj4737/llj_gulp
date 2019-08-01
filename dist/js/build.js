var _ref;

var $ = function $(selector) {
  return document.querySelector(selector);
};

var time = (_ref = [$('.day'), $('.hours'), $('.minutes'), $('.seconds')], day = _ref[0], hours = _ref[1], minutes = _ref[2], seconds = _ref[3], _ref);
var endTime = new Date("2019-08-03 00:00:00").getTime();
var timer = null;
console.log(1);

function getLastTime() {
  var now = new Date().getTime();
  var dis = endTime - now;
  if (dis === 0) return clearInterval(timer);
  var day = Math.floor(dis / (1000 * 3600 * 24));
  var lastDay = dis - day * 1000 * 3600 * 24;
  var hours = Math.floor(lastDay / (1000 * 3600));
  var lastHours = lastDay - hours * 1000 * 3600;
  var minutes = Math.floor(lastHours / (1000 * 60));
  var lastMinutes = lastHours - minutes * 1000 * 60;
  var seconds = Math.floor(lastMinutes / 1000);
  render(day, hours, minutes, seconds);
}

getLastTime();
timer = setInterval(function () {
  getLastTime();
}, 1000);

function render(d, h, m, s) {
  var _arguments = arguments;
  // day.innerText = ("0" + d).slice(-2);
  // hours.innerText = ("0" + h).slice(-2);
  // minutes.innerText = ("0" + m).slice(-2);
  // seconds.innerText = ("0" + s).slice(-2);
  time.forEach(function (v, i) {
    v.innerText = ("0" + _arguments[i]).slice(-2);
  });
}