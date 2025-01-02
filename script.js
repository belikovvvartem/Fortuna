const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const namesInput = document.getElementById('names');
const winnerDisplay = document.getElementById('winner');

// Початкові значення учасників
let segments = ['Учасник 1', 'Учасник 2', 'Учасник 3', 'Учасник 4'];
let arcSize = 0;
let currentAngle = 0;
let spinAngle = 0;
let spinTimeout = null;

// Задати кольори для сегментів колеса
const segmentColors = [
    'rgba(255, 0, 241, 0.8)',   // Рожевий
    'rgba(179, 0, 178, 0.8)',   // Темно-рожевий
    'rgba(102, 0, 255, 0.8)',   // Блакитно-фіолетовий
    'rgba(0, 183, 255, 0.8)',   // Синій
    'rgba(0, 123, 255, 0.8)',   // Темно-синій
    'rgba(247, 255, 0, 0.8)',   // Жовтий
    'rgba(141, 255, 0, 0.8)',   // Жовто-зелений
    'rgba(0, 255, 253, 0.8)',   // Бірюзовий
    'rgba(70, 255, 182, 0.8)',  // Світло-бірюзовий
    'rgba(141, 0, 255, 0.8)',   // Фіолетовий
    'rgba(255, 178, 0, 0.8)',   // Оранжевий
    'rgba(255, 120, 0, 0.8)',   // Темно-оранжевий
  ];
  

// Малюємо колесо з заданими кольорами
function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  segments.forEach((segment, index) => {
    const startAngle = currentAngle + index * arcSize;
    const endAngle = startAngle + arcSize;
    const color = segmentColors[index % segmentColors.length]; // Використовуємо кольори з масиву

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = color; // Задаємо колір для сегмента
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Додаємо текст
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

// Оновлюємо сегменти (імена учасників)
function updateSegments() {
  segments = namesInput.value
    .split('\n') // Розбиваємо введені дані по нових рядках
    .map(name => name.trim()) // Обрізаємо пробіли
    .filter(Boolean); // Видаляємо порожні рядки

  if (segments.length === 0) {
    segments = ['Учасник 1', 'Учасник 2', 'Учасник 3', 'Учасник 4']; // Повертаємо значення за замовчуванням
  }

  arcSize = (2 * Math.PI) / segments.length;
  drawWheel();
}

// Обертання колеса
function spin() {
  if (segments.length === 0) {
    alert('Будь ласка, введіть імена учасників!');
    return;
  }

  spinAngle = Math.random() * 3000 + 3000; // Випадкова початкова швидкість
  spinAnimation(); // Запуск анімації обертання
}

// Анімація обертання (уповільнення обертання)
function spinAnimation() {
  spinAngle *= 0.99; // Повільніше сповільнення (зменшуємо швидкість)
  currentAngle += spinAngle / 1000;
  drawWheel(); // Перемалюємо колесо

  // Продовжуємо обертання, поки швидкість не стане досить малою
  if (spinAngle > 1) {
    spinTimeout = requestAnimationFrame(spinAnimation);
  } else {
    cancelAnimationFrame(spinTimeout); // Припиняємо анімацію
    const winnerIndex = Math.floor((segments.length - (currentAngle / arcSize) % segments.length) % segments.length);
    winnerDisplay.textContent = `Переможець: ${segments[winnerIndex]}`; // Виведення переможця
  }
}

// Події
namesInput.addEventListener('input', updateSegments);
spinButton.addEventListener('click', spin);

// Початкове малювання колеса
arcSize = (2 * Math.PI) / segments.length;
drawWheel();
