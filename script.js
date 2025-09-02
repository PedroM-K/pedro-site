const body = document.body;
const menuButtons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.content');
const gradients = {
  sobre: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
  formacao: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
  portfolio: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
  contato: 'linear-gradient(135deg, #667eea, #764ba2)'
};
let current = document.querySelector('.content.active');
let currentId = current ? current.id : 'sobre';

menuButtons.forEach(btn => {
  btn.setAttribute('role', 'tab');
  btn.setAttribute('aria-controls', btn.dataset.section);
});

// Troca de seção
menuButtons.forEach(button => {
  button.addEventListener('click', () => changeSection(button));
});

function changeSection(button) {
  const targetId = button.dataset.section;
  if (targetId === currentId) return;

  // Atualiza estado visual do menu
  menuButtons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');

  // Atualiza gradiente do fundo
  body.style.background = gradients[button.dataset.color] || gradients.sobre;

  // Calcula direção da transição
  const targetIndex = [...sections].findIndex(s => s.id === targetId);
  const currentIndex = [...sections].findIndex(s => s.id === currentId);
  const directionLeft = targetIndex > currentIndex ? 'exit-left' : 'exit-right';

  // Seção atual sai
  current.classList.remove('active');
  current.classList.add(directionLeft);

  // Próxima entra
  const next = document.getElementById(targetId);

  next.classList.remove('exit-left', 'exit-right');

  requestAnimationFrame(() => {
    next.classList.add('active');
    // Após animação, limpa a anterior
    setTimeout(() => current.classList.remove('exit-left', 'exit-right'), 520);
  });

  current = next;
  currentId = targetId;

  const title = current.querySelector('h2');
  if (title) title.setAttribute('tabindex', '-1'), title.focus();
}
// Efeito de clique nos botões do menu
menuButtons.forEach(btn => {
  btn.addEventListener('pointerdown', () => {
    btn.style.transform = 'translateY(0) scale(0.98)';
  });
  btn.addEventListener('pointerup', () => {
    btn.style.transform = '';
  });
});
