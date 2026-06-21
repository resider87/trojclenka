document.addEventListener('DOMContentLoaded', () => {
    // Získání odkazů na HTML elementy
    const inputA1 = document.getElementById('inputA1');
    const inputB1 = document.getElementById('inputB1');
    const inputA2 = document.getElementById('inputA2');
    const outputX = document.getElementById('outputX');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const proportionTypeRadios = document.querySelectorAll('input[name="proportionType"]');
    const directArrowContainer = document.querySelector('.direct-arrow');
    const indirectArrowContainer = document.querySelector('.indirect-arrow');

    // Funkce pro zobrazení chyby
    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        resultDiv.textContent = ''; // Vymaže předchozí výsledek
    };

    // Funkce pro skrytí chyby
    const hideError = () => {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    };

    // Funkce pro aktualizaci zobrazení šipek
    const updateArrowVisibility = () => {
        const selectedType = document.querySelector('input[name="proportionType"]:checked').value;
        if (selectedType === 'direct') {
            directArrowContainer.classList.add('active');
            indirectArrowContainer.classList.remove('active');
        } else {
            directArrowContainer.classList.remove('active');
            indirectArrowContainer.classList.add('active');
        }
    };

    // Funkce pro výpočet trojčlenky
    const calculateRuleOfThree = () => {
        hideError(); // Skryje předchozí chyby

        // Získání hodnot a převod na čísla
        const a1 = parseFloat(inputA1.value);
        const b1 = parseFloat(inputB1.value);
        const a2 = parseFloat(inputA2.value);
        const selectedType = document.querySelector('input[name="proportionType"]:checked').value;

        // Validace vstupů
        if (isNaN(a1) || isNaN(b1) || isNaN(a2)) {
            showError('Prosím, zadejte platná čísla do všech tří polí (A1, B1, A2).');
            outputX.textContent = 'X'; // Resetuje 'X'
            resultDiv.textContent = ''; // Vymaže výsledek
            return;
        }
        
        // Zamezení dělení nulou
        if (selectedType === 'direct' && a1 === 0) {
            showError('Pro přímou úměru nemůže být A1 nulové.');
            outputX.textContent = 'X';
            resultDiv.textContent = '';
            return;
        }
        if (selectedType === 'indirect' && a2 === 0) {
            showError('Pro nepřímou úměru nemůže být A2 nulové.');
            outputX.textContent = 'X';
            resultDiv.textContent = '';
            return;
        }


        let x; // Proměnná pro výsledek

        // Výpočet na základě typu úměry
        if (selectedType === 'direct') {
            // Přímá úměra: A1 / B1 = A2 / X  =>  X = (A2 * B1) / A1
            x = (a2 * b1) / a1;
        } else {
            // Nepřímá úměra: A1 * B1 = A2 * X  =>  X = (A1 * B1) / A2
            x = (a1 * b1) / a2;
        }

        // Zobrazení výsledku
        resultDiv.textContent = `X = ${x.toFixed(2)}`; // Zaokrouhlení na 2 desetinná místa
        outputX.textContent = x.toFixed(2); // Zobrazí výsledek i v buňce
    };

    // Naslouchání na události

    // Při kliknutí na tlačítko "Vypočítat"
    calculateBtn.addEventListener('click', calculateRuleOfThree);

    // Při změně typu úměry (radio button)
    proportionTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateArrowVisibility);
    });

    // Při načtení stránky nastaví výchozí šipky
    updateArrowVisibility();

    // Volitelné: Spouštět výpočet i při stisknutí Enter v inputu
    inputA1.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculateRuleOfThree(); });
    inputB1.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculateRuleOfThree(); });
    inputA2.addEventListener('keypress', (e) => { if (e.key === 'Enter') calculateRuleOfThree(); });
});