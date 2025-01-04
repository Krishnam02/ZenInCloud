const rectangle = document.getElementById('rectangle');
const rotationSlider = document.getElementById('rotationSlider');
const colorPicker = document.getElementById('colorPicker');
const circle = document.getElementById('circle');
const container = document.getElementById('circle-container');

rotationSlider.addEventListener('input', () => {
    rectangle.style.transform = `rotate(${rotationSlider.value}deg)`;
});

colorPicker.addEventListener('input', () => {
    rectangle.style.backgroundColor = colorPicker.value;
});

let isDragging = false;
let offsetX, offsetY;

circle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - circle.offsetLeft;
    offsetY = e.clientY - circle.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const containerRect = container.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const circleWidth = circleRect.width;
    const circleHeight = circleRect.height;

    x = Math.max(0, Math.min(x, containerWidth - circleWidth));
    y = Math.max(0, Math.min(y, containerHeight - circleHeight));

    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

circle.addEventListener('mousedown', (e) => {
  if(e.target === circle){
      circle.originalWidth = circle.offsetWidth;
      circle.originalHeight = circle.offsetHeight;
      circle.originalX = e.clientX;
      circle.originalY = e.clientY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
  }
});

function resize(e){
  circle.style.width = Math.abs(circle.originalWidth + (e.clientX - circle.originalX)) + 'px';
  circle.style.height = Math.abs(circle.originalHeight + (e.clientY - circle.originalY)) + 'px';
}

function stopResize(){
  window.removeEventListener('mousemove', resize);
}