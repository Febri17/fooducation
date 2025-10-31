// ====== MODAL HANDLING (Dari kode Anda) ======

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
});


$(document).ready(function() {
    const $searchInput = $('#userSearchInput');
    const $tableBody = $('#userTableBody');
    let typingTimer;
    const doneTypingInterval = 300; 
    const $noResultsRow = $(`
        <tr id="noResultsRow" style="display: none;">
            <td colspan="5" style="text-align:center; font-style: italic;">
                Tidak ada pengguna yang cocok dengan pencarian.
            </td>
        </tr>
    `);
    $tableBody.append($noResultsRow); 
    function filterUsers(searchTerm) {
        const query = searchTerm.toLowerCase();
        let found = false;
        $tableBody.find('tr').not('#noResultsRow').each(function() {
            const $row = $(this);
            const rowText = $row.text().toLowerCase(); 

            if (rowText.includes(query)) {
                $row.show(); 
                found = true;
            } else {
                $row.hide(); 
            }
        });
        if (!found) {
            $('#noResultsRow').show();
        } else {
            $('#noResultsRow').hide();
        }
    }

    $searchInput.on('keyup', function() {
        clearTimeout(typingTimer);
        const searchTerm = $searchInput.val();
        typingTimer = setTimeout(() => {
            filterUsers(searchTerm);
        }, doneTypingInterval);
    });
    filterUsers(''); 
});
