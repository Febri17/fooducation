// ====== NAV & SIDEBAR TOGGLE ======
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon'); 

    const toggleSidebar = (show) => {
        if (show) {
            sidebar.classList.add('active');
            if (menuIcon) menuIcon.style.display = 'none';
            if (closeIcon) closeIcon.style.display = 'block';
        } else {
            sidebar.classList.remove('active');
            if (menuIcon) menuIcon.style.display = 'block';
            if (closeIcon) closeIcon.style.display = 'none';
        }
    };

    if (menuIcon) {
        menuIcon.addEventListener('click', () => toggleSidebar(true));
    }
    if (closeIcon) {
        closeIcon.addEventListener('click', () => toggleSidebar(false));
    }

    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnIcon = (menuIcon && menuIcon.contains(e.target)) || 
                                 (closeIcon && closeIcon.contains(e.target));
            
            if (!isClickInsideSidebar && !isClickOnIcon) {
                toggleSidebar(false);
            }
        }
    });


    // ====== MODAL HANDLER ======

    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const detailButtons = document.querySelectorAll('.detail-btn');
    const modalContent = document.querySelector('.modal-content');

    const modalImg = document.getElementById('modal-img');
    const dataTitlePangan = document.getElementById('data-title-pangan');
    const dataJenis = document.getElementById('data-jenis');
    const dataKalori = document.getElementById('data-kalori');
    const dataProtein = document.getElementById('data-protein');
    const dataSerat = document.getElementById('data-serat');
    const dataVitamin = document.getElementById('data-vitamin');
    const dataMineral = document.getElementById('data-mineral');
    const dataDescPangan = document.getElementById('data-desc-pangan');

    const showVideoBtn = document.getElementById('show-video-btn');
    const backToDetailsBtn = document.getElementById('back-to-details-btn');
    const youtubeFrame = document.getElementById('youtube-frame');
    const videoOfTitle = document.getElementById('video-of-title');

    const modalDetailsPanel = document.getElementById('modal-content-details');
    const modalVideoPanel = document.getElementById('modal-content-video');


    const closeAndResetModal = () => {
        modal.style.display = 'none';
        modalContent.classList.remove('show-video');
        modalContent.classList.remove('has-video');
        youtubeFrame.src = ''; 
    };

    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const title = btn.getAttribute('data-title');
            const img = btn.getAttribute('data-img');
            const jenis = btn.getAttribute('data-jenis');
            const kalori = btn.getAttribute('data-kalori');
            const protein = btn.getAttribute('data-protein');
            const serat = btn.getAttribute('data-serat');
            const vitamin = btn.getAttribute('data-vitamin');
            const mineral = btn.getAttribute('data-mineral');
            const desc = btn.getAttribute('data-desc');
            const videoUrl = btn.getAttribute('data-video'); 

            modalImg.src = img;
            dataTitlePangan.textContent = title;
            dataJenis.textContent = jenis;
            dataKalori.textContent = kalori;
            dataProtein.textContent = protein;
            dataSerat.textContent = serat;
            dataVitamin.textContent = vitamin;
            dataMineral.textContent = mineral;
            dataDescPangan.textContent = desc;
            if (videoUrl && videoUrl.trim() !== '') {
                modalContent.classList.add('has-video');
                youtubeFrame.setAttribute('data-video-url', videoUrl); 
                showVideoBtn.style.display = 'block'; 
            } else {
                modalContent.classList.remove('has-video');
                youtubeFrame.setAttribute('data-video-url', '');
                showVideoBtn.style.display = 'none'; 
            }
            modalContent.classList.remove('show-video');
            youtubeFrame.src = ''; 
            modal.style.display = 'flex';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeAndResetModal);
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAndResetModal();
        }
    });

    if (showVideoBtn) {
        showVideoBtn.addEventListener('click', () => {
            const videoUrl = youtubeFrame.getAttribute('data-video-url');
            if (videoUrl) {
                const embeddedUrl = videoUrl.includes("?") ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
                youtubeFrame.src = embeddedUrl; 
                videoOfTitle.textContent = dataTitlePangan.textContent;
                modalContent.classList.add('show-video');
            }
        });
    }

    if (backToDetailsBtn) {
        backToDetailsBtn.addEventListener('click', () => {
            modalContent.classList.remove('show-video');
            youtubeFrame.src = ''; 
        });
    }

    const $searchInput = $('#panganSearchInput');
    const $cardsContainer = $('.cards-container');
    const $noResultsMessage = $('#noResultsPangan');
    let typingTimer;
    const doneTypingInterval = 300; 

    function filterPangan(searchTerm) {
        const query = searchTerm.toLowerCase().trim();
        let found = false;
        
        $cardsContainer.find('.card').each(function() {
            const $card = $(this);
            const titleText = $card.find('.card-title-text').text().toLowerCase(); 

            if (titleText.includes(query)) {
                $card.show(); 
                found = true;
            } else {
                $card.hide(); 
            }
        });
        if (!found) {
            $noResultsMessage.show();
        } else {
            $noResultsMessage.hide();
        }
    }
    $searchInput.on('keyup', function() {
        clearTimeout(typingTimer);
        const searchTerm = $searchInput.val();
        
        typingTimer = setTimeout(() => {
            filterPangan(searchTerm);
        }, doneTypingInterval);
    });
    filterPangan(''); 
});