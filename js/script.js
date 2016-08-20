// Конструктор элементов страницы
function ELEMENT (tag, id, className, content, listener) {
  var element = document.createElement(tag);
  ((id) && (id != "")) ? element.id = id : false;
  ((className) && (className != "")) ? element.className = className : false;
  ((content) && (content != "")) ? element.innerHTML = content : false;
  ((listener) && (listener != "")) ? element.onclick = listener : false;
  return element;
}

// Функция форматирования времени
function parseTime(current) {
  var results = [];
  results['ms'] = checkTime(current % 1000, 3);
  var second = Math.floor(current / 1000);
  results['h'] = checkTime(Math.floor(second / 3600));
  second = (second % 3600);
  results['m'] = checkTime(Math.floor(second / 60));
  results['s'] = checkTime(second % 60);
  results['hms'] = results['h'] + ":" + results['m'] + ":" + results['s'];
  results['full'] = results['hms'] + ":" + results['ms'];
  return results;

  function checkTime(time, digits) {
    var result = time;
    if ((digits == 3) && (time < 100)) {
      result = "0" + time;
    }
    if (time < 10) {
      result = "0" + result;
    }
    return result;
  }
}

// Обработчик событий (нажатий кнопок)
function timeActivity() {
  var startButton = new ELEMENT("div", "start", "button", "Start", timeActivity);
  var pauseButton = new ELEMENT("div", "pause", "button", "Pause", timeActivity);
  var contButton = new ELEMENT("div", "cont", "button", "Cont.", timeActivity);

    switch (this.id) {

      case "start":
        this.parentNode.replaceChild(pauseButton, this);
        start = Date.now();
        t = setInterval(getTime, 31);
        break;

      case "pause":
        this.parentNode.replaceChild(contButton, this);
        clearInterval(t);
        var interimResults = document.getElementById("results");
        interimResults.className = "results";
        var interimResult = new ELEMENT("div", "", "result", time['full'] );
        interimResults.insertBefore(interimResult, interimResults.firstChild);
        break;

      case "cont":
        this.parentNode.replaceChild(pauseButton, this);
        start = Date.now() - rest;
        t = setInterval(getTime, 31);
        break;

      case "clear":
        clearInterval(t);
        loadPage();
        break;
    }
}

// Функция подсчета и вывода времени секундомера
function getTime() {
  rest = Date.now() - start;
  time = parseTime(rest);
  var divHMS = document.getElementById('time');
  divHMS.innerHTML = time['hms'];
  var divMS = new ELEMENT("div", "ms", "", time['ms']);
  divHMS.appendChild(divMS);
  return rest;
}

// Обнуление страницы, добавление нужных элементов
function loadPage() {
  document.body.innerHTML = "";
  var wrapper = new ELEMENT("div", "", "wrapper");
  document.body.appendChild(wrapper);
  var divHMS = new ELEMENT("div", "time", "", "00:00:00");
  wrapper.appendChild(divHMS);
  var divMS = new ELEMENT("div", "ms", "", "000");
  divHMS.appendChild(divMS);
  var startButton = new ELEMENT("div", "start", "button", "Start", timeActivity);
  wrapper.appendChild(startButton);
  var clearButton = new ELEMENT("div", "clear", "button", "Clear", timeActivity);
  wrapper.appendChild(clearButton);
  var interimResults = new ELEMENT("div", "results");
  wrapper.appendChild(interimResults);
}

loadPage();