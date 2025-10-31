document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const sidebar = document.getElementById('sidebar');

    if (sidebar) {
        if (menuIcon) { menuIcon.onclick = () => { sidebar.classList.add('active'); } }
        if (closeIcon) { closeIcon.onclick = () => { sidebar.classList.remove('active'); } }
    }

    const foodListModal = document.getElementById("food-list-modal");
    const portionModal = document.getElementById("portion-modal");
    if (!foodListModal || !portionModal) {
        console.error("Kesalahan Fatal: Salah satu atau kedua elemen modal (#food-list-modal / #portion-modal) tidak ditemukan di HTML.");
        return;
    }

    const addMealBtns = document.querySelectorAll(".add-button");
    const foodSelectionList = document.querySelector(".food-selection-list");
    const foodItems = document.querySelectorAll(".food-item");
    const foodSearchInput = document.getElementById("food-search-input");
    const mealTypeDisplay = document.getElementById("meal-type-display");
    const closeBtns = document.querySelectorAll(".close-button");
    const portionForm = document.getElementById('portion-input-form');
    const portionFoodName = document.getElementById('portion-food-name');
    const selectedFoodId = document.getElementById('selected-food-id');
    const selectedMealTime = document.getElementById('selected-meal-time');
    const portionCalDisplay = document.getElementById('portion-cal');
    const portionProteinDisplay = document.getElementById('portion-protein');

    const nutritionDatabase = {
        'nasi_putih': { kalori: 130, protein: 2.7 },
        'telur_rebus': { kalori: 155, protein: 12.6 },
        'daging_sapi': { kalori: 250, protein: 26 },
        'ayam_goreng': { kalori: 290, protein: 29 },
        'apel': { kalori: 52, protein: 0.3 },
        'pisang': { kalori: 89, protein: 1.1 },
        'brokoli_rebus': { kalori: 35, protein: 2.5 },
        'tempe_goreng': { kalori: 190, protein: 18.2 },
    };

    function filterFoodList() {
        if (!foodSearchInput || foodItems.length === 0) return;

        const searchTerm = foodSearchInput.value.toLowerCase();

        foodItems.forEach(item => {
            const foodName = item.getAttribute('data-food-name').toLowerCase();

            if (foodName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (foodSearchInput) {
        foodSearchInput.addEventListener('keyup', filterFoodList);
    }

    closeBtns.forEach(btn => {
        btn.onclick = function () {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) targetModal.style.display = 'none';
            if (modalId === 'food-list-modal' && foodSearchInput) {
                foodSearchInput.value = '';
                filterFoodList();
            }
        }
    });

    addMealBtns.forEach(btn => {
        btn.onclick = function () {
            const meal = btn.getAttribute('data-meal');
            const mealName = meal.charAt(0).toUpperCase() + meal.slice(1).replace('-', ' ');

            if (selectedMealTime) selectedMealTime.value = mealName;
            if (mealTypeDisplay) mealTypeDisplay.textContent = mealName;
            if (foodSearchInput) foodSearchInput.value = '';
            filterFoodList();
            foodListModal.style.display = "block";
        }
    });

    if (foodSelectionList && portionModal) {
        foodSelectionList.addEventListener('click', function (e) {
            if (e.target.classList.contains('select-food-btn')) {
                const btn = e.target;
                const foodId = btn.getAttribute('data-food-id');
                const foodItemElement = document.querySelector(`.food-item[data-food-id="${foodId}"]`);
                const foodName = foodItemElement.getAttribute('data-food-name');
                const nutrition = nutritionDatabase[foodId];

                if (nutrition && selectedFoodId) {
                    portionFoodName.textContent = `Atur Porsi: ${foodName}`;
                    selectedFoodId.value = foodId;
                    portionCalDisplay.textContent = `${nutrition.kalori} kcal`;
                    portionProteinDisplay.textContent = `${nutrition.protein} g`;

                    foodListModal.style.display = 'none';
                    portionModal.style.display = 'block';
                } else {
                    alert(`Data gizi untuk ${foodName} belum tersedia.`);
                }
            }
        });
    }

    if (portionForm) {
        portionForm.onsubmit = function (event) {
            event.preventDefault();

            if (!selectedFoodId || !selectedMealTime || !portionCalDisplay) {
                alert("Kesalahan: Elemen form porsi tidak lengkap.");
                return;
            }

            const foodId = selectedFoodId.value;
            const foodItemElement = document.querySelector(`.food-item[data-food-id="${foodId}"]`);
            const foodName = foodItemElement.getAttribute('data-food-name');
            const quantity = document.getElementById('portion-qty').value;
            const mealTime = selectedMealTime.value;
            const nutrition = nutritionDatabase[foodId];

            const totalCalories = (nutrition.kalori / 100) * quantity;
            const totalProtein = (nutrition.protein / 100) * quantity;

            console.log(`Log: ${foodName} (${quantity}g) for ${mealTime}. Total Cal: ${totalCalories.toFixed(1)}`);
            alert(`Berhasil: ${foodName} (${quantity}g) ditambahkan ke ${mealTime}.\nTotal: ${totalCalories.toFixed(1)} kcal`);

            portionModal.style.display = 'none';
            portionForm.reset();
        }
    }

    window.onclick = function (event) {
        if (event.target == foodListModal) {
            foodListModal.style.display = 'none';
            if (foodSearchInput) foodSearchInput.value = '';
            filterFoodList();
        }
        if (event.target == portionModal) {
            portionModal.style.display = 'none';
        }
    }
});