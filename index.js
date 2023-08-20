const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let interval;
  
  return (seconds) => {
    clearInterval(interval)

    let secondsLeft = seconds;

    function runTimer() {
      const sec = (secondsLeft % 60).toString().padStart(2, '0');
      const min = Math.floor((secondsLeft % 3600) / 60).toString().padStart(2, '0');
      const hr = Math.floor(secondsLeft / 3600).toString().padStart(2, '0');
      
      timerEl.innerHTML = `${hr}:${min}:${sec}`
  
      secondsLeft--;

      if(secondsLeft < 0) {
        clearInterval(interval)
      }
    }

    runTimer();

    interval = setInterval(runTimer, 1000)
  };
};

const animateTimer = createTimerAnimator();

buttonEl.disabled = true;

const btnState = () => {
  if(inputEl.value !== '') {
    buttonEl.disabled = false;
  } else {
    buttonEl.disabled = true;
  }
}

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g,'');
  btnState()
});

const startTimer = () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';

  btnState();
}

buttonEl.addEventListener('click', startTimer);

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if(inputEl.value !== '') {
      e.preventDefault()
      startTimer();
    } else {
      e.preventDefault()
    }
  }
})
