// Função para mostrar mais produtos
function mostrarMaisProdutos() {
    const produtosOcultos = document.querySelectorAll('.produto-card.hidden');
    produtosOcultos.forEach(produto => {
        produto.classList.remove('hidden');
    });
    
    // Oculta o botão após mostrar todos os produtos
    const botaoVerMais = document.querySelector('.ver-mais');
    if (botaoVerMais) {
        botaoVerMais.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do Swiper
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        nav.style.display = isMenuOpen ? 'block' : 'none';
        
        // Animação do botão hambúrguer
        menuToggle.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu mobile se estiver aberto
                if (isMenuOpen) {
                    menuToggle.click();
                }
            }
        });
    });

    // Header com efeito de scroll
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = 'var(--shadow)';
            return;
        }

        if (currentScroll > lastScroll) {
            // Scroll para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = 'var(--shadow)';
        }

        lastScroll = currentScroll;
    });

    // Formulário de contato
    const form = document.querySelector('.contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            form.reset();
        });
    }

    // Animação de elementos ao scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.sobre-content, .produto-card, .servico-card, .contato-content'
    );

    animateElements.forEach(element => {
        observer.observe(element);
    });
});

