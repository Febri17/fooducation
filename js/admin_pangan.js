// ====== MODAL HANDLING (Disesuaikan dari kode Anda sebelumnya) ======

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    const anyModalActive = document.querySelectorAll('.modal.active').length > 0;
    if (!anyModalActive) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Setup event listener untuk modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal'); 
            closeModal(modal);
        });
    });
    
    // Listener untuk tombol Edit/Hapus
    const staticButtons = document.querySelectorAll('.edit-btn, .delete-btn');
    staticButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modalTarget = e.currentTarget.getAttribute('data-modal-target');
            if (modalTarget) {
                const modal = document.querySelector(modalTarget);
                openModal(modal);
            }
        });
    });
});

$(document).ready(function() {
    const $searchInput = $('#panganSearchInput');
    const $allCards = $('.project-section').find('.card');
    const $allCategories = $('.category');
    const $noResultsMessage = $('#noResultsPangan');
    
    let typingTimer;
    const doneTypingInterval = 300; 
    function filterPangan(searchTerm) {
        const query = searchTerm.toLowerCase();
        let globalFound = false; 

        $allCategories.each(function() {
            const $category = $(this);
            const $cardsInThisCategory = $category.find('.card');
            let categoryFound = false; 
            $cardsInThisCategory.each(function() {
                const $card = $(this);
                const cardText = $card.find('.pangan-nama').text().toLowerCase(); 

                if (cardText.includes(query)) {
                    $card.show();
                    categoryFound = true;
                    globalFound = true;
                } else {
                    $card.hide();
                }
            });

            if (query !== '' && !categoryFound) {
                $category.hide();
                $category.prev('.section-divider').hide(); 
            } else {
                $category.show();
                $category.prev('.section-divider').show(); 
            }
            $('.section-divider:first').hide();
        });
        if (!globalFound && query !== '') {
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