document.addEventListener('DOMContentLoaded', () => {
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    overlay.classList.add('active');
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }

  const overlay = document.getElementById('overlay');
  const feedbackModal = document.getElementById('feedbackModal'); 
  const deleteConfirmModal = document.getElementById('modal-konfirmasi-hapus'); 
  const modalUsername = document.getElementById('modalUsername');
  const modalMessageContent = document.getElementById('modalMessageContent');
  const modalFeedbackTitle = document.getElementById('modalFeedbackTitle');
  const modalDeleteButton = document.getElementById('modalDeleteButton'); 
  const deleteConfirmBtn = deleteConfirmModal ? deleteConfirmModal.querySelector('.delete-confirm-btn') : null;
  const deleteCancelBtns = document.querySelectorAll('[data-close-button]');

  let currentDeletingId = null; 
  let currentDeletingType = null; 
  deleteCancelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const closestModal = btn.closest('.modal');
      if (closestModal) closeModal(closestModal);
    });
  });

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      const activeModals = document.querySelectorAll('.modal.active');
      activeModals.forEach(m => closeModal(m));
    });
  }

  window.openFeedbackModal = function(element) {
    const item = element.closest('.feedback-item') || element;
    if (!item) return;

    const username = item.getAttribute('data-user') || item.dataset.user || item.querySelector('.username-feedback')?.textContent || 'Unknown';
    const message = item.getAttribute('data-message') || item.dataset.message || item.querySelector('.message-summary')?.textContent || '';

    // isi modal
    if (modalUsername) modalUsername.textContent = username;
    if (modalMessageContent) modalMessageContent.textContent = message;
    if (modalFeedbackTitle) modalFeedbackTitle.textContent = `Pesan dari ${username}`;
    const id = item.getAttribute('data-id') || item.dataset.id;
    if (modalDeleteButton) {
      modalDeleteButton.dataset.itemId = id;
      modalDeleteButton.dataset.itemType = 'feedback';
    }
    openModal(feedbackModal);
  };

  window.openDeleteConfirmModal = function(itemId, itemType) {
    if (deleteConfirmModal) {
      const p = deleteConfirmModal.querySelector('.modal-body p');
      if (p) p.textContent = 'Anda yakin ingin menghapus pesan ini?';
      if (deleteConfirmBtn) {
        deleteConfirmBtn.dataset.itemId = String(itemId);
        deleteConfirmBtn.dataset.itemType = itemType || 'feedback';
      }
      currentDeletingId = String(itemId);
      currentDeletingType = itemType || 'feedback';

      openModal(deleteConfirmModal);
    }
  };

  if (modalDeleteButton) {
    modalDeleteButton.addEventListener('click', (e) => {
      const id = modalDeleteButton.dataset.itemId;
      const type = modalDeleteButton.dataset.itemType || 'feedback';
      if (deleteConfirmModal) {
        const p = deleteConfirmModal.querySelector('.modal-body p');
        if (p) p.textContent = 'Anda yakin ingin menghapus pesan ini?';
      }
      if (deleteConfirmBtn) {
        deleteConfirmBtn.dataset.itemId = id;
        deleteConfirmBtn.dataset.itemType = type;
      }
      currentDeletingId = id;
      currentDeletingType = type;
      closeModal(feedbackModal);
      openModal(deleteConfirmModal);
    });
  }

  if (deleteConfirmBtn) {
    deleteConfirmBtn.addEventListener('click', (e) => {
      const idToDelete = deleteConfirmBtn.dataset.itemId || currentDeletingId;
      const type = deleteConfirmBtn.dataset.itemType || currentDeletingType || 'feedback';
      if (idToDelete) {
        const selector = `.feedback-item[data-id="${idToDelete}"]`;
        const el = document.querySelector(selector);
        if (el) {
          el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          el.style.opacity = '0';
          el.style.transform = 'translateY(-6px)';
          setTimeout(() => {
            el.remove();
          }, 250);
        }
      }
      closeModal(deleteConfirmModal);
    });
  }

  document.querySelectorAll('.feedback-item .delete-message-btn, .feedback-item .btn-delete').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation(); 
      const parent = btn.closest('.feedback-item');
      const id = parent?.getAttribute('data-id');
      openDeleteConfirmModal(id, 'feedback');
    });
  });

});
