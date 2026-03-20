// js/currency.js
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = window.API_KEYS?.exchangerate;
  if (!apiKey) {
    alert('ExchangeRate-API key missing. Please add it to js/config.js');
    return;
  }

  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  const amountInput = document.getElementById('amount');
  const convertBtn = document.getElementById('convert-btn');
  const resultDiv = document.getElementById('currency-result');
  const spinner = resultDiv.querySelector('.loading-spinner');
  const errorDiv = resultDiv.querySelector('.error-message');
  const conversionDiv = resultDiv.querySelector('.conversion-result');

  let rates = null;
  let currencies = [];

  // Fetch available currencies and rates on load
  async function init() {
    spinner.style.display = 'block';
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      rates = data.conversion_rates;
      currencies = Object.keys(rates).sort();

      populateSelects();
      spinner.style.display = 'none';
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
      spinner.style.display = 'none';
    }
  }

  function populateSelects() {
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    currencies.forEach(code => {
      fromSelect.add(new Option(code, code));
      toSelect.add(new Option(code, code));
    });
    // Set defaults: USD to EUR
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
  }

  convertBtn.addEventListener('click', convert);

  function convert() {
    if (!rates) {
      errorDiv.textContent = 'Rates not loaded yet. Please wait.';
      errorDiv.style.display = 'block';
      return;
    }

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount < 0) {
      errorDiv.textContent = 'Please enter a valid positive amount';
      errorDiv.style.display = 'block';
      conversionDiv.style.display = 'none';
      return;
    }

    const from = fromSelect.value;
    const to = toSelect.value;
    const rate = rates[to] / rates[from];
    const result = amount * rate;

    conversionDiv.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    conversionDiv.style.display = 'block';
    errorDiv.style.display = 'none';
  }

  init();
});