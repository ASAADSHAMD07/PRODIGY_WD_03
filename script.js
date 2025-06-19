let startTime, interval, elapsed = 0, running = false;
const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function format(ms) {
  let milliseconds = ms % 1000;
  let totalSeconds = Math.floor(ms / 1000);
  let seconds = totalSeconds % 60;
  let minutes = Math.floor(totalSeconds / 60) % 60;
  let hours = Math.floor(totalSeconds / 3600);
  return (
    String(hours).padStart(2, '0') + ' : ' +
    String(minutes).padStart(2, '0') + ' : ' +
    String(seconds).padStart(2, '0') + ' : ' +
    String(milliseconds).padStart(3, '0')
  );
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsed;
  display.textContent = format(diff);
}

document.getElementById("start").onclick = () => {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    running = true;
  }
};

document.getElementById("pause").onclick = () => {
  if (running) {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    running = false;
  }
};

document.getElementById("reset").onclick = () => {
  clearInterval(interval);
  display.textContent = "00 : 00 : 00 : 000";
  elapsed = 0;
  running = false;
  lapList.innerHTML = "";
};

document.getElementById("lap").onclick = () => {
  if (running) {
    const now = Date.now();
    const diff = now - startTime + elapsed;
    const lap = document.createElement("li");
    lap.textContent = `Lap - ${format(diff)}`;
    lapList.prepend(lap);
  }
};
