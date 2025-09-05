

const menuContent = document.querySelector('.content');
const menuToggle = document.querySelector('.menu-toggle');
const menuLinks = document.querySelectorAll('.menu-lista a');

menuToggle.addEventListener('click', () => {
    menuContent.classList.toggle('on');
    document.body.style.overflow = menuContent.classList.contains('on') ? 'hidden' : 'initial';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Redireciona para a página do link e fecha o menu
        window.location.href = link.href;
        menuContent.classList.remove('on');
        document.body.style.overflow = 'initial';
    });
});

// Seleciona todos os elementos com a classe tooltip
const tooltips = document.querySelectorAll('.tooltip');

// Função para mostrar/esconder o tooltip
function toggleTooltip(event) {
    const tooltip = event.target.nextElementSibling;
    tooltip.classList.toggle('show');
}

// Adiciona o evento mouseover a cada elemento com a classe tooltip
tooltips.forEach(tooltip => {
    tooltip.previousElementSibling.addEventListener('mouseover', toggleTooltip);
    tooltip.previousElementSibling.addEventListener('mouseout', toggleTooltip);
});

