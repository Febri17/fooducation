document.getElementById('adminLoginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    if (this.checkValidity()) {
        const usernameOrEmail = this.elements[0].value;
        const password = this.elements[1].value;
        const isVerificationSuccessful = true; 

        if (isVerificationSuccessful) {
            sessionStorage.setItem('isLoggedIn', 'true');
            alert("Login Berhasil! Mengarahkan ke Dashboard Admin...");
            window.location.href = "admin/dashboard_admin.html"; 
        } else {
            alert("Username atau Password salah. Silakan coba lagi.");
        }

    } else {
        alert("Harap isi semua kolom yang diperlukan.");
    }
});