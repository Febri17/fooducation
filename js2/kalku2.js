document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const sidebar = document.getElementById('sidebar');

    if (sidebar) {
        if (menuIcon) { menuIcon.onclick = () => { sidebar.classList.add('active'); } }
        if (closeIcon) { closeIcon.onclick = () => { sidebar.classList.remove('active'); } }
    }

    const formArea = document.getElementById('imt-input-area');
    const resultArea = document.getElementById('imt-result-area');
    const imtForm = document.getElementById('imt-form');
    const imtValueDisplay = document.getElementById('imt-value');
    const imtCategoryDisplay = document.getElementById('imt-category');
    const imtIndicator = document.getElementById('imt-indicator');
    const resetButton = document.getElementById('reset-btn');

    const genderButtons = document.querySelectorAll('.gender-btn');
    const genderInput = document.getElementById('gender'); 

    let selectedGender = '';
    genderButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            genderButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedGender = this.getAttribute('data-gender');
            genderInput.value = selectedGender;
        });
    });

    function calculateIMT(event) {
        event.preventDefault();

        const heightCm = parseFloat(document.getElementById('height').value);
        const weightKg = parseFloat(document.getElementById('weight').value);
        const gender = genderInput.value; 
        if (gender === '' || isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            alert("Mohon pilih Jenis Kelamin dan masukkan nilai Tinggi/Berat badan yang valid.");
            return;
        }

        const heightM = heightCm / 100;
        const imt = weightKg / (heightM * heightM);
        const imtFixed = imt.toFixed(2);
        let category = '';
        let color = '#138132';
        let indicatorPosition = 0;
        if (imt < 17.0) {
            category = "Kurus (Kekurangan Berat Badan Tingkat Berat)";
            color = "#00aaff";
        } else if (imt >= 17.0 && imt < 18.5) {
            category = "Kurus (Kekurangan Berat Badan Tingkat Ringan)";
            color = "#00aaff";
        } else if (imt >= 18.5 && imt < 23.0) { 
            category = "Normal";
            color = "#4CAF50";
        } else if (imt >= 23.0 && imt < 25.0) { 
            category = "Gemuk (Pre-obesitas/Risiko)";
            color = "#FFC107";
        } else if (imt >= 25.0 && imt < 30.0) {
            category = "Obesitas I";
            color = "#F44336";
        } else { 
            category = "Obesitas II atau Lebih";
            color = "#F44336";
        }
        const minImt = 15;
        const maxImt = 35;
        indicatorPosition = ((imt - minImt) / (maxImt - minImt)) * 100;
        if (indicatorPosition < 0) indicatorPosition = 0;
        if (indicatorPosition > 100) indicatorPosition = 100;

        imtValueDisplay.textContent = imtFixed;
        imtCategoryDisplay.textContent = category;
        imtValueDisplay.style.color = color;
        imtCategoryDisplay.style.color = color;
        imtIndicator.style.left = `calc(${indicatorPosition}% - 1px)`; 
        formArea.style.display = 'none';
        resultArea.style.display = 'block';
    }

    function resetIMT() {
        imtForm.reset();
        genderButtons.forEach(b => b.classList.remove('active')); 
        genderInput.value = '';

        formArea.style.display = 'block';
        resultArea.style.display = 'none';
        imtIndicator.style.left = `0%`; 
    }

    if (imtForm) {
        imtForm.addEventListener('submit', calculateIMT);
    }
    if (resetButton) {
        resetButton.addEventListener('click', resetIMT);
    }
});