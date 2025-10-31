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
    // Setup event listener untuk modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Jika tombol berada di dalam tag <a> dengan onclick="event.preventDefault()", 
            // modal harus tetap terbuka
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

    // Event listener untuk tombol Edit/Hapus yang ada di dalam item diskusi (A-tag)
    // agar mereka berfungsi membuka modal
    const actionButtons = document.querySelectorAll('.diskusi-actions button');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Mencegah navigasi <a> ketika tombol diklik
            e.preventDefault(); 
            const modalTarget = e.currentTarget.getAttribute('data-modal-target');
            if (modalTarget) {
                const modal = document.querySelector(modalTarget);
                openModal(modal);
                // Di sini Anda akan menambahkan kode untuk mengisi form edit jika ini adalah tombol edit
            }
        });
    });
});

$(document).ready(function() {
    const $searchInput = $('#diskusiSearchInput');
    const $listContainer = $('.diskusi-list-container');
    const $noResultsMessage = $('#noResultsDiskusi');
    let typingTimer;
    const doneTypingInterval = 300; 
    function filterDiskusi(searchTerm) {
        const query = searchTerm.toLowerCase().trim();
        let found = false;
        $listContainer.find('.diskusi-item').each(function() {
            const $item = $(this);
            const titleText = $item.find('.diskusi-title').text().toLowerCase(); 

            if (titleText.includes(query)) {
                $item.show(); 
                found = true;
            } else {
                $item.hide(); 
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
            filterDiskusi(searchTerm);
        }, doneTypingInterval);
    });
    filterDiskusi(''); 
});