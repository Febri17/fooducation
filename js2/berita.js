// ====== NAV & SIDEBAR TOGGLE & MODAL HANDLER ======

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    // Elemen Modal
    const detailButtons = document.querySelectorAll('.detail-btn'); 
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalImg = document.getElementById('modal-img');
    const dataTitle = document.getElementById('data-title-pangan'); 
    const dataFullContent = document.getElementById('data-desc-pangan'); 
    const showVideoBtn = document.getElementById('show-video-btn');
    const backToDetailsBtn = document.getElementById('back-to-details-btn');
    const youtubeFrame = document.getElementById('youtube-frame');
    const videoOfTitle = document.getElementById('video-of-title');
    
    // Sidebar Toggle Logic
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

    // Modal Close Logic
    const closeAndResetModal = () => {
        if (!modal || !modalContent || !youtubeFrame) return;
        
        modal.style.display = 'none';
        modalContent.classList.remove('show-video'); 
        youtubeFrame.src = ''; 
    };

    // Modal Detail Click Handler
    const handleDetailClick = (e) => {
        const btn = e.currentTarget; 
        const title = btn.getAttribute('data-title');
        const img = btn.getAttribute('data-img');
        const desc = btn.getAttribute('data-desc');
        const videoUrl = btn.getAttribute('data-video');

        if (!modal) return;
        modalImg.src = img;
        modalImg.onerror = () => modalImg.src = 'https://placehold.co/600x400/9e9e9e/ffffff?text=Gambar+Hilang';
        dataTitle.textContent = title;
        dataFullContent.innerHTML = desc ? desc.replace(/\n/g, '<br>') : ''; 
        
        const hasVideo = videoUrl && videoUrl.trim() !== '';
        
        if (showVideoBtn) {
            showVideoBtn.innerHTML = hasVideo 
                ? "<i class='bx bx-play-circle'></i> Tonton Video Liputan" 
                : "<i class='bx bx-error-circle'></i> Video Tidak Tersedia";
            showVideoBtn.disabled = !hasVideo;
            
            if (hasVideo) {
                modalContent.classList.add('has-video');
                youtubeFrame.setAttribute('data-video-url', videoUrl); 
            } else {
                modalContent.classList.remove('has-video');
                youtubeFrame.setAttribute('data-video-url', '');
            }
        }

        modalContent.classList.remove('show-video');
        youtubeFrame.src = '';
        modal.style.display = 'flex';
    };

    // Event Listeners Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeAndResetModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAndResetModal();
        }
    });

    detailButtons.forEach(button => {
        button.addEventListener('click', handleDetailClick);
    });

    // Toggle Video Logic
    if (showVideoBtn) {
        showVideoBtn.addEventListener('click', () => {
            const videoUrl = youtubeFrame.getAttribute('data-video-url');
            if (videoUrl) {
                const embeddedUrl = videoUrl.includes("?") ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
                
                youtubeFrame.src = embeddedUrl; 
                videoOfTitle.textContent = dataTitle.textContent;
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
    
    $(document).ready(function() {
        const $searchInput = $('#beritaSearchInput');
        const $cardsContainer = $('.cards-container');
        const $noResultsMessage = $('#noResultsBerita');
        let typingTimer;
        const doneTypingInterval = 300; 

        function filterBerita(searchTerm) {
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
                filterBerita(searchTerm);
            }, doneTypingInterval);
        });
        filterBerita(''); 
    });
});