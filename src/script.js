

const menuContent = document.querySelector('.content');
const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelectorAll('.menu-lista a');

menuToggle.addEventListener('click', () => {
    menuContent.classList.toggle('on');
    document.body.style.overflow = menuContent.classList.contains('on') ? 'hidden' : 'initial';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Apenas fecha o menu ao clicar em um link.
        // A navegação suave (smooth scroll) é controlada pelo CSS.
        // Isso evita um "salto" brusco na página.
        menuContent.classList.remove('on');
        document.body.style.overflow = 'initial';
    });
});

// --- Lógica Robusta para Tooltips ---
// A lógica anterior era frágil, pois dependia da ordem exata dos elementos no HTML.
// Esta nova versão usa IDs e data-attributes, tornando o código mais seguro e fácil de manter.
const tooltipTriggers = document.querySelectorAll('[data-tooltip-target]');

tooltipTriggers.forEach(trigger => {
    const tooltipId = trigger.getAttribute('data-tooltip-target');
    const tooltip = document.getElementById(tooltipId);

    if (tooltip) {
        trigger.addEventListener('mouseover', () => {
            tooltip.classList.add('show');
        });
        trigger.addEventListener('mouseout', () => {
            tooltip.classList.remove('show');
        });
    }
});

// --- Lógica para o Slider de Serviços ---
function initServicosSlider() {
    const sliderContainer = document.querySelector('.servicos-slider-container');
    const track = document.querySelector('.paineis-container');
    const prevBtn = document.getElementById('servicos-prev-slide');
    const nextBtn = document.getElementById('servicos-next-slide');
    const slides = document.querySelectorAll('.painel');

    if (!sliderContainer || !track || !prevBtn || !nextBtn || slides.length === 0) {
        return;
    }

    // Adiciona a interatividade de hover para mostrar a descrição
    slides.forEach(slide => {
        slide.addEventListener('mouseover', () => {
            slide.classList.add('expanded');
        });
        slide.addEventListener('mouseout', () => {
            slide.classList.remove('expanded');
        });
    });

    let currentTranslate = 0;

    const updateSlider = () => {
        const slide = slides[0];
        if (!slide) return;

        const maxScroll = track.scrollWidth - sliderContainer.offsetWidth;

        if (currentTranslate < 0) {
            currentTranslate = 0;
        }
        if (currentTranslate > maxScroll) {
            currentTranslate = maxScroll;
        }

        track.style.transform = `translateX(-${currentTranslate}px)`;

        prevBtn.disabled = currentTranslate === 0;
        nextBtn.disabled = currentTranslate >= maxScroll - 1;
    };

    const moveSlider = (direction) => {
        const slide = slides[0];
        if (!slide) return;
        const slideWidth = slide.offsetWidth + parseInt(window.getComputedStyle(track).gap);
        currentTranslate += direction * slideWidth;
        updateSlider();
    };

    nextBtn.addEventListener('click', () => moveSlider(1));
    prevBtn.addEventListener('click', () => moveSlider(-1));

    const resizeObserver = new ResizeObserver(() => updateSlider());
    resizeObserver.observe(sliderContainer);

    updateSlider();
}

// --- Lógica para Animação ao Rolar (Scroll) ---
// Usa a Intersection Observer API para adicionar uma classe quando o elemento se torna visível.
// É mais performático que usar eventos de scroll.
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
        } else {
            // Opcional: remover a classe para animar toda vez que o usuário rolar para cima e para baixo
            // entry.target.classList.remove('show-animation');
        }
    });
});

// Seleciona todos os elementos que devem ser animados e começa a "observá-los"
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach((el) => observer.observe(el));

// --- Lógica para "Ver Mais Trabalhos" com Animação ---
function initVerMaisTrabalhos() {
    const verMaisBtn = document.getElementById('ver-mais-btn');
    const cards = document.querySelectorAll('.card-servico');

    // Se não houver botão ou se houver 4 ou menos cards, não faz nada e esconde o botão.
    if (!verMaisBtn || cards.length <= 4) {
        if (verMaisBtn) verMaisBtn.style.display = 'none';
        return;
    }

    // Oculta os cards a partir do quinto (índice 4)
    for (let i = 4; i < cards.length; i++) {
        cards[i].classList.add('hidden');
    }

    verMaisBtn.addEventListener('click', () => {
        // Mostra os cards ocultos
        for (let i = 4; i < cards.length; i++) {
            cards[i].classList.remove('hidden');
            // Adiciona a classe para a animação de "fade in"
            cards[i].classList.add('revealed');
        }
        // Oculta o botão "Ver Mais" após ser clicado
        verMaisBtn.classList.add('hidden');
    });
}

// Inicializa a funcionalidade "Ver Mais"
initVerMaisTrabalhos();

// Inicializa o slider de serviços
initServicosSlider();
