(function () {
  function createTimer (seconds) {
    let remaining = seconds;
    let intervalId = null;

    const status = {
      started: false,
      paused: false
    };

    const stopTimer = function  () {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const updateTimer = function () {
      remaining -= 1;
      $(Timer).trigger('tiktak', toString(remaining));
      if (remaining === 0) {
        stopTimer();
        console.log('Timer ended');
      }
    };

    const toString = function (seconds) {
      const sec = seconds % 60;
      const min = (seconds - sec) / 60;

      return ''.concat(('0' + min).slice(-2), ':', ('0' + sec).slice(-2));
    };

    const Timer = {
      start: function () {
        console.log('Timer started');
        status.started = true;
        status.paused = false;
        intervalId = setInterval(updateTimer, 1000);
      },

      stop: function () {
        stopTimer();
        status.paused = true;
      },

      reset: function () {
        stopTimer();
        status.started = false;
        status.paused = false;
        remaining = seconds;
        $(Timer).trigger('tiktak', toString(remaining));
      },

      status: () => status
    }

    return Timer;
  }

  function createSession () {
    const settings = {
      pomodoro: 25,
      break: 5,
      longbreak: 15,
      longbreakafter: 4
    }

    const session = {
      pomodoros: 0,
      breaks: 0
    }


  }
  
  const timer = createTimer(25);

  function setButtonsState () {
    const {paused, started} = timer.status();

    let start = true,
        pause = false,
        resume = false,
        reset = false;

    if (started) {
      start = false;
      resume = false;
      pause = true;
      reset = true;
    }

    if (paused) {
      start = true;
      pause = false;
      resume = true;
      // reset = true;
    }

    $('#start').prop('disabled', !start);
    $('#pause').prop('disabled', !pause);
    $('#reset').prop('disabled', !reset);

    if (resume) {
      $('#start').html('Resume');
    } else {
      $('#start').html('Start');
    }
  }


  $('#start').on('click', function () {
    timer.start();
    setButtonsState();
  });

  $('#pause').on('click', function () {
    timer.stop();
    setButtonsState();
  });

  $('#reset').on('click', function () {
    timer.reset();
    setButtonsState();
  });

  $(timer).on('tiktak', function(event, data) {
    $('#timer').html(data);
  });

  setButtonsState();
})()


