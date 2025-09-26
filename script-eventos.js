document.addEventListener('DOMContentLoaded', () => {
  // hamburguer menu
  const btn = document.getElementById('hamburguer');
  const navLateral = document.getElementById('menu-lateral');
  btn.addEventListener('click', () => {
    navLateral.classList.toggle('show');
    btn.classList.toggle('ativo');
  });

  // tema com checkbox simples
  const toggleThemeCheckbox = document.getElementById('toggle-theme');
  const themeLabel = document.getElementById('theme-label');
  let currentTheme = localStorage.getItem('theme') || 'dark';

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.remove('dark-mode');
      toggleThemeCheckbox.checked = true;
      themeLabel.textContent = 'Modo Escuro';
    }
    else {
      document.body.classList.add('dark-mode');
      toggleThemeCheckbox.checked = false;
      themeLabel.textContent = 'Modo Claro';
    }
  }

  applyTheme(currentTheme);
  toggleThemeCheckbox.addEventListener('change', () => {
    currentTheme = toggleThemeCheckbox.checked ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });

  // botão topo
  const btnTopo = document.getElementById('btn-topo');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) btnTopo.classList.add('show');
    else btnTopo.classList.remove('show');
  });
  btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // slider simples
  const slidesEl = document.getElementById('slides');
  const total = slidesEl.children.length;
  let idx = 0;
  let interval = setInterval(nextSlide, 5000);

  function goto(i) {
    idx = (i + total) % total;
    slidesEl.style.transform = `translateX(-${idx * 100}%)`;
  }
  function nextSlide() { goto(idx + 1) }

  // Lightbox para imagens dos cards
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = lightbox.querySelector(".close");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");

  let imagensAtuais = [];
  let idxAtual = 0;

  document.querySelectorAll(".evento-card").forEach(card => {
    const imgs = Array.from(card.querySelectorAll("img"));
    imgs.forEach((img, i) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        imagensAtuais = imgs.map(im => im.src);
        idxAtual = i;
        mostrarImagem();
        lightbox.style.display = "flex";
      });
    });
  });

  function mostrarImagem() {
    lightboxImg.src = imagensAtuais[idxAtual];
  }

  closeBtn.addEventListener("click", () => lightbox.style.display = "none");
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    idxAtual = (idxAtual - 1 + imagensAtuais.length) % imagensAtuais.length;
    mostrarImagem();
  });
  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    idxAtual = (idxAtual + 1) % imagensAtuais.length;
    mostrarImagem();
  });
});

// removido código de thumbs e vídeos (não usados no HTML)
