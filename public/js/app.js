const getWeather = (location) => {
  fetch(`/weather?address=${location}`).then(res => {
    res.json().then((data) => {
      const { error } = data;
      if (error) {
        messageTwo.textContent = error;
      } else {
        const { location, forecast } = data;
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    })
  })
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  messageOne.textContent = '';
  messageTwo.textContent = 'Loading...';
  e.preventDefault()
  const location = search.value;
  getWeather(location);
});