document.addEventListener('DOMContentLoaded', function() {
    
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const closeIcon = document.getElementById('close-icon');

    if (sidebar) {
        if (menuIcon) { menuIcon.onclick = () => { sidebar.classList.add('active'); } }
        if (closeIcon) { closeIcon.onclick = () => { sidebar.classList.remove('active'); } }
    }

});