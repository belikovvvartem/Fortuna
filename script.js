const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const spinButtonSpin = document.getElementById('spin-button');
const namesInput = document.getElementById('names');
const winnerDisplay = document.getElementById('winner');

let segments = ['Учасник 1', 'Учасник 2', 'Учасник 3', 'Учасник 4'];
let arcSize = 0;
let currentAngle = 0;
let spinAngle = 0;
let spinTimeout = null;

const segmentColors = [
'rgb(30, 144, 255)',  
'rgb(70, 130, 180)',  
'rgb(25, 25, 112)',  
'rgb(0, 0, 139)',  
'rgb(0, 191, 255)'

  ];
  

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  segments.forEach((segment, index) => {
    const startAngle = currentAngle + index * arcSize;
    const endAngle = startAngle + arcSize;
    const color = segmentColors[index % segmentColors.length]; 

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = color; 
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

   
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((startAngle + endAngle) / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(segment, radius - 10, 10);
    ctx.restore();
  });
}

function updateSegments() {
  segments = namesInput.value
    .split('\n')
    .map(name => name.trim())
    .filter(Boolean); 
  if (segments.length === 0) {
    segments = ['Учасник 1', 'Учасник 2', 'Учасник 3', 'Учасник 4']; 
  }

  arcSize = (2 * Math.PI) / segments.length;
  drawWheel();
}


function spin() {
  if (segments.length === 0) {
    alert('Будь ласка, введіть імена учасників!');
    return;
  }

  spinAngle = Math.random() * 3000 + 3000; 
  spinAnimation(); 
}


function spinAnimation() {
  spinAngle *= 0.99; 
  currentAngle += spinAngle / 1000;
  drawWheel(); 

  
  if (spinAngle > 1) {
    spinTimeout = requestAnimationFrame(spinAnimation);
  } else {
    cancelAnimationFrame(spinTimeout); 
    const winnerIndex = Math.floor((segments.length - (currentAngle / arcSize) % segments.length) % segments.length);
    winnerDisplay.textContent = `Переможець: ${segments[winnerIndex]}`; 
  }
}

namesInput.addEventListener('input', updateSegments);
spinButtonSpin.addEventListener('click', spin);
spinButton.addEventListener('click', spin);

arcSize = (2 * Math.PI) / segments.length;
drawWheel();
