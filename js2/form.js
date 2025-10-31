document.addEventListener('DOMContentLoaded', function() {
    // === 1. NAV & SIDEBAR CONTROLS ===
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
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

    if (menuIcon) { menuIcon.onclick = () => toggleSidebar(true); }
    if (closeIcon) { closeIcon.onclick = () => toggleSidebar(false); }

    // === 2. MODAL CONTROLS ===
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalTarget;
            const modal = document.querySelector(modalId);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal.active');
            closeModal(modal);
        });
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            });
        });
    }

    const diskusiContainer = document.querySelector('.diskusi-list-container');
    const formTambahDiskusi = document.getElementById('form-tambah-diskusi');
    let currentDiskusiId = 3; 

    function renderDiskusiItem(id, title, excerpt, author, date, comments) {
        const itemClass = 'diskusi-item';
        const linkHref = `diskusi_detail.html?id=${id}`; 

        const discussionHtml = `
            <div class="${itemClass}" id="diskusi-${id}">
                <a href="${linkHref}" class="diskusi-link">
                    <div class="diskusi-info">
                        <h3 class="diskusi-title">${title}</h3>
                        <p class="diskusi-meta">Oleh: <strong>${author}</strong> | ${date} | <span class="komentar-count">${comments} Komentar</span></p>
                        <p class="diskusi-excerpt">${excerpt}</p>
                    </div>
                </a>
            </div>
        `;
        return discussionHtml;
    }

    if (formTambahDiskusi) {
        formTambahDiskusi.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('diskusi-judul');
            const descInput = document.getElementById('diskusi-deskripsi');
            
            currentDiskusiId++;
            const newTitle = titleInput.value;
            const newDesc = descInput.value;
            const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
            
            const newDiskusiHTML = renderDiskusiItem(
                currentDiskusiId, 
                newTitle, 
                newDesc.substring(0, 70) + '...', 
                'Pengguna Baru', 
                date, 
                0
            );
            diskusiContainer.insertAdjacentHTML('afterbegin', newDiskusiHTML);
            formTambahDiskusi.reset();
            closeModal(document.getElementById('modal-tambah-diskusi'));
            
            filterDiskusi($('#diskusiSearchInput').val()); 
        });
    }

    const $searchInput = $('#diskusiSearchInput');
    const $diskusiContainer = $('.diskusi-list-container');
    const $noResultsMessage = $('#noResultsForm');
    let typingTimer;
    const doneTypingInterval = 300; 
    function filterDiskusi(searchTerm) {
        const query = searchTerm.toLowerCase().trim();
        let foundCount = 0;
        
        $diskusiContainer.find('.diskusi-item').each(function() {
            const $item = $(this);
            const titleText = $item.find('.diskusi-title').text().toLowerCase(); 

            if (titleText.includes(query)) {
                $item.show(); 
                foundCount++;
            } else {
                $item.hide(); 
            }
        });

        if (foundCount === 0) {
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