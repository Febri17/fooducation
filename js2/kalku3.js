document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const sidebar = document.getElementById('sidebar');

    if (sidebar) {
        if (menuIcon) { menuIcon.onclick = () => { sidebar.classList.add('active'); } }
        if (closeIcon) { closeIcon.onclick = () => { sidebar.classList.remove('active'); } }
    }

    const formArea = document.getElementById('macro-input-area');
    const resultArea = document.getElementById('macro-result-area');
    const macroForm = document.getElementById('macro-form');

    const calorieGoalDisplay = document.getElementById('calorie-goal');
    const bmrValueDisplay = document.getElementById('bmr-value');
    const tdeeValueDisplay = document.getElementById('tdee-value');
    const resultMessageDisplay = document.getElementById('result-message');
    const resetButton = document.getElementById('reset-macro-btn');

    const genderInput = document.getElementById('gender');
    const activityInput = document.getElementById('activity');
    const goalInput = document.getElementById('goal');
    const genderButtons = document.querySelectorAll('.gender-btn');
    const activityButtons = document.querySelectorAll('.activity-btn');
    const goalButtons = document.querySelectorAll('.goal-btn');
    const activityFactors = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'very_active': 1.725
    };

    const goalAdjustment = {
        'loss': -500,
        'maintain': 0,
        'gain': 500
    };
    function setupButtonSelection(buttons, hiddenInput) {
        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                buttons.forEach(b => b.classList.remove('active'));

                this.classList.add('active');

                hiddenInput.value = this.getAttribute(`data-${hiddenInput.id}`);
            });
        });
    }

    setupButtonSelection(genderButtons, genderInput);
    setupButtonSelection(activityButtons, activityInput);
    setupButtonSelection(goalButtons, goalInput);

    function calculateMacro(event) {
        event.preventDefault();
        const gender = genderInput.value;
        const age = parseFloat(document.getElementById('age').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const activityLevel = activityInput.value;
        const goal = goalInput.value;
        if (!gender || !activityLevel || !goal || isNaN(age) || isNaN(height) || isNaN(weight) || age < 15) {
            alert("Mohon lengkapi semua input dengan nilai yang valid (Usia minimal 15 tahun).");
            return;
        }

        let bmr = 0;
        if (gender === 'pria') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        const activityFactor = activityFactors[activityLevel];
        const tdee = bmr * activityFactor;
        const kaloriTujuan = tdee + goalAdjustment[goal];

        const goalMessages = {
            'loss': "Untuk mencapai tujuan **Turun Berat Badan**, Anda perlu defisit kalori sebesar 500 kcal dari TDEE, dengan target kehilangan ±0.5 kg per minggu.",
            'maintain': "Untuk **Menjaga Berat Badan Ideal** Anda saat ini, konsumsi kalori Anda harus sama dengan TDEE (Kalori Pembakar Harian).",
            'gain': "Untuk mencapai tujuan **Naik Berat Badan**, Anda perlu surplus kalori sebesar 500 kcal dari TDEE, dengan target penambahan ±0.5 kg per minggu."
        };

        calorieGoalDisplay.textContent = `${Math.round(kaloriTujuan)} kcal`;
        bmrValueDisplay.textContent = `${Math.round(bmr)} kcal`;
        tdeeValueDisplay.textContent = `${Math.round(tdee)} kcal`;
        resultMessageDisplay.innerHTML = goalMessages[goal];
        formArea.style.display = 'none';
        resultArea.style.display = 'block';
    }

    function resetMacro() {
        macroForm.reset();

        genderButtons.forEach(b => b.classList.remove('active'));
        activityButtons.forEach(b => b.classList.remove('active'));
        goalButtons.forEach(b => b.classList.remove('active'));

        genderInput.value = '';
        activityInput.value = '';
        goalInput.value = '';
        formArea.style.display = 'block';
        resultArea.style.display = 'none';
    }

    if (macroForm) {
        macroForm.addEventListener('submit', calculateMacro);
    }
    if (resetButton) {
        resetButton.addEventListener('click', resetMacro);
    }
});