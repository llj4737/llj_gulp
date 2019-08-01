let $ = selector => document.querySelector(selector);
let time = [day, hours, minutes, seconds] = [$('.day'), $('.hours'), $('.minutes'), $('.seconds')];
const endTime = new Date("2019-08-03 00:00:00").getTime();
let timer = null;
console.log(1)
function getLastTime () {
  let now = new Date().getTime();
  let dis = endTime - now;
  if (dis === 0) return clearInterval(timer)
  let day = Math.floor(dis / (1000 * 3600 * 24));
  let lastDay = dis - day * 1000 * 3600 * 24;
  let hours = Math.floor(lastDay / (1000 * 3600));
  let lastHours = lastDay - hours * 1000 * 3600;
  let minutes = Math.floor(lastHours / (1000 * 60));
  let lastMinutes = lastHours - minutes * 1000 * 60;
  let seconds = Math.floor(lastMinutes / 1000);
  render(day, hours, minutes, seconds);
}
getLastTime()

timer = setInterval(() => {
  getLastTime();
}, 1000)

function render (d, h, m, s) {
  
  // day.innerText = ("0" + d).slice(-2);
  // hours.innerText = ("0" + h).slice(-2);
  // minutes.innerText = ("0" + m).slice(-2);
  // seconds.innerText = ("0" + s).slice(-2);
  time.forEach((v, i) => {
    v.innerText = ("0" + arguments[i]).slice(-2);
  })
}