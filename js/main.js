document.addEventListener('DOMContentLoaded', () => {
 
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // === Sample Data ===
 const skills = [
  { name: 'HTML', level: '90%' },
  { name: 'CSS', level: '85%' },
  { name: 'JavaScript', level: '80%' },
  { name: 'Node.js', level: '75%' },
  { name: 'Git', level: '70%' }
];


  const projects = [
    {
      title: 'Workout Planner',
      tech: ['HTML', 'CSS', 'JS'],
      link: 'https://sin-8380.github.io/Project-Toji/',
      img: 'assets/workoutplanner.jpg',
      desc: 'A modular workout scheduling and timer web app.'
    },
    {
      title: 'SOON..',
      tech: ['HTML', 'SCSS', 'JS'],
      link: '#',
      img: '',
      desc: 'soon..'
    },
    {
      title: 'SOON..',
      tech: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      img: '',
      desc: 'soon..'
    },
    {
      title: 'SOON..',
      tech: ['Node.js', 'MySQL'],
      link: '#',
      img: '',
      desc: 'soon..'
    }
  ];

  // === Populate Skills ===
  const skillsList = document.querySelector('.skills-list');

let currentCategory = '';
skills.forEach(skill => {
 
  let category = '';
  if (['HTML', 'CSS', 'JavaScript'].includes(skill.name)) category = 'Frontend';
  else if (['Node.js'].includes(skill.name)) category = 'Backend';
  else if (['Git'].includes(skill.name)) category = 'Tools';

  if (category !== currentCategory) {
    const heading = document.createElement('h3');
    heading.textContent = category;
    heading.style.marginTop = '1.5rem';
    heading.style.color = 'var(--primary)';
    heading.style.fontSize = '1.2rem';
    skillsList.appendChild(heading);
    currentCategory = category;
  }

  const el = document.createElement('div');
  el.innerHTML = `
    <strong>${skill.name}</strong>
    <div style="background:#e0e0dc; border-radius:6px; overflow:hidden;">
      <div style="width:${skill.level};background:var(--accent);padding:4px 0;color:#fff;text-align:center;">
        ${skill.level}
      </div>
    </div>
  `;
  skillsList.appendChild(el);
});

  // === Populate Projects Spacers ===
  const projectsGrid = document.querySelector('.projects-grid');

  const spacerStart = document.createElement('div');
  spacerStart.classList.add('spacer');
  projectsGrid.appendChild(spacerStart);

  projects.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('project-card');

    card.innerHTML = `
      ${p.img ? `<img src="${p.img}" alt="${p.title}" class="project-img" />` : ''}
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <small>Tech: ${p.tech.join(', ')}</small><br>
      <a href="${p.link}" target="_blank">View Project</a>
    `;

    projectsGrid.appendChild(card);
  });

  const spacerEnd = document.createElement('div');
  spacerEnd.classList.add('spacer');
  projectsGrid.appendChild(spacerEnd);

  // === Project Scroll Snap + Highlighting ===
  const grid = document.querySelector('.projects-grid');
  let scrollTimeout;

  grid.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (!initialScrollHandled) return;
    updateActiveProjectCard();
  }, 100);
});

  function updateActiveProjectCard() {
  const cards = Array.from(document.querySelectorAll('.projects-grid div'))
    .filter(card => !card.classList.contains('spacer'));
  
  let middle = window.innerWidth / 2;
  let closestCard = null;
  let closestDistance = Infinity;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(middle - cardCenter);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });
  
  cards.forEach(card => card.classList.remove('active'));
  if (closestCard) closestCard.classList.add('active');
}

let initialScrollHandled = false;

grid.addEventListener('scroll', () => {
  if (!initialScrollHandled) return;
  window.requestAnimationFrame(updateActiveProjectCard);
});

window.addEventListener('load', () => {
  updateActiveProjectCard();
  initialScrollHandled = true;
});

window.addEventListener('resize', updateActiveProjectCard);

  // === Download CV ===
  function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/profile.jpg';
    link.download = 'S!N-Badge.jpg';
    link.click();
  }

  window.downloadCV = downloadCV;
});
