// ====== MODAL HANDLING ======

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
    const $searchInput = $('#beritaSearchInput');
    const $cardContainer = $('.card-container');
    const $noResultsMessage = $('#noResultsBerita');
    let typingTimer;
    const doneTypingInterval = 300; 
    function filterBerita(searchTerm) {
        const query = searchTerm.toLowerCase();
        let found = false;
        $cardContainer.find('.card').each(function() {
            const $card = $(this);
            const cardText = $card.text().toLowerCase(); 

            if (cardText.includes(query)) {
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