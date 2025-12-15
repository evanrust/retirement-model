// State management
let chart = null;
let hasCalculated = false;

// Example scenario values
const exampleScenario = {
    currentAge: 30,
    retirementAge: 65,
    current401k: 50000,
    currentRothIRA: 25000,
    currentTaxable: 15000,
    monthly401k: 800,
    monthlyIRA: 500,
    monthlyTaxable: 200,
    employerMatch: 0.5,
    annualSpending: 50000,
    withdrawalRate: 0.04,
    yearsInRetirement: 30
};

// Get all input elements
const inputs = {
    currentAge: document.getElementById('currentAge'),
    retirementAge: document.getElementById('retirementAge'),
    current401k: document.getElementById('current401k'),
    currentRothIRA: document.getElementById('currentRothIRA'),
    currentTaxable: document.getElementById('currentTaxable'),
    monthly401k: document.getElementById('monthly401k'),
    monthlyIRA: document.getElementById('monthlyIRA'),
    monthlyTaxable: document.getElementById('monthlyTaxable'),
    employerMatch: document.getElementById('employerMatch'),
    annualSpending: document.getElementById('annualSpending'),
    withdrawalRate: document.getElementById('withdrawalRate'),
    yearsInRetirement: document.getElementById('yearsInRetirement')
};

// Get UI elements
const welcomeMessage = document.getElementById('welcome-message');
const inputSection = document.getElementById('input-section');
const resultsSection = document.getElementById('results-section');
const loadExampleBtn = document.getElementById('load-example-btn');
const enterOwnBtn = document.getElementById('enter-own-btn');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

// Event listeners for welcome screen buttons
loadExampleBtn.addEventListener('click', () => {
    loadExampleScenario();
    showInputSection();
    calculateAndRender();
});

enterOwnBtn.addEventListener('click', () => {
    showInputSection();
});

calculateBtn.addEventListener('click', () => {
    if (validateInputs()) {
        calculateAndRender();
    }
});

resetBtn.addEventListener('click', () => {
    loadExampleScenario();
    calculateAndRender();
});

// Add event listeners to inputs for real-time calculation (only after first calculation)
Object.values(inputs).forEach(input => {
    input.addEventListener('input', () => {
        if (hasCalculated) {
            calculateAndRender();
        }
    });
});

// Load example scenario into inputs
function loadExampleScenario() {
    Object.keys(exampleScenario).forEach(key => {
        if (inputs[key]) {
            inputs[key].value = exampleScenario[key];
        }
    });
}

// Show input section and hide welcome
function showInputSection() {
    welcomeMessage.classList.add('hidden');
    inputSection.classList.remove('hidden');
}

// Validate that all inputs have values
function validateInputs() {
    const values = Object.values(inputs).map(input => input.value);
    const allFilled = values.every(val => val !== '' && val !== null);
    
    if (!allFilled) {
        alert('Please fill in all fields before calculating.');
        return false;
    }
    return true;
}

// Utility function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Calculate retirement projection
function calculateProjection() {
    const currentAge = parseInt(inputs.currentAge.value);
    const retirementAge = parseInt(inputs.retirementAge.value);
    const current401k = parseFloat(inputs.current401k.value);
    const currentRothIRA = parseFloat(inputs.currentRothIRA.value);
    const currentTaxable = parseFloat(inputs.currentTaxable.value);
    const monthly401k = parseFloat(inputs.monthly401k.value);
    const monthlyIRA = parseFloat(inputs.monthlyIRA.value);
    const monthlyTaxable = parseFloat(inputs.monthlyTaxable.value);
    const employerMatch = parseFloat(inputs.employerMatch.value);
    const annualSpending = parseFloat(inputs.annualSpending.value);
    const withdrawalRate = parseFloat(inputs.withdrawalRate.value);

    const yearsToRetirement = retirementAge - currentAge;
    const data = [];
    
    let total401k = current401k;
    let totalRothIRA = currentRothIRA;
    let totalTaxable = currentTaxable;
    let earliestRetirementAge = null;
    
    for (let year = 0; year <= yearsToRetirement; year++) {
        const age = currentAge + year;
        const yearsUntilRetirement = retirementAge - age;
        
        // Adjust allocation as we approach retirement (glide path)
        let stockAllocation = 0.90;
        if (yearsUntilRetirement <= 30) {
            stockAllocation = 0.90 - ((30 - yearsUntilRetirement) * 0.01);
            stockAllocation = Math.max(stockAllocation, 0.60);
        }
        const bondAllocation = 1 - stockAllocation;
        
        // Expected returns (real, inflation-adjusted)
        const stockReturn = 0.07;
        const bondReturn = 0.02;
        const blendedReturn = (stockReturn * stockAllocation) + (bondReturn * bondAllocation);
        
        const totalAssets = total401k + totalRothIRA + totalTaxable;
        const neededForRetirement = annualSpending / withdrawalRate;
        const canRetire = totalAssets >= neededForRetirement;
        
        // Check if this is the earliest retirement age
        if (canRetire && earliestRetirementAge === null) {
            earliestRetirementAge = age;
        }
        
        // Add current year values
        data.push({
            age,
            year: 2024 + year,
            total401k: Math.round(total401k),
            totalRothIRA: Math.round(totalRothIRA),
            totalTaxable: Math.round(totalTaxable),
            totalAssets: Math.round(totalAssets),
            stockAllocation: Math.round(stockAllocation * 100),
            expectedReturn: (blendedReturn * 100).toFixed(1),
            neededForRetirement: Math.round(neededForRetirement),
            canRetire
        });
        
        // Calculate next year
        if (year < yearsToRetirement) {
            const annual401kContribution = monthly401k * 12;
            const annual401kWithMatch = annual401kContribution * (1 + employerMatch);
            const annualIRAContribution = monthlyIRA * 12;
            const annualTaxableContribution = monthlyTaxable * 12;
            
            total401k = (total401k * (1 + blendedReturn)) + annual401kWithMatch;
            totalRothIRA = (totalRothIRA * (1 + blendedReturn)) + annualIRAContribution;
            totalTaxable = (totalTaxable * (1 + blendedReturn)) + annualTaxableContribution;
        }
    }
    
    return { data, earliestRetirementAge };
}

// Calculate total contributed
function calculateTotalContributed() {
    const currentAge = parseInt(inputs.currentAge.value);
    const retirementAge = parseInt(inputs.retirementAge.value);
    const current401k = parseFloat(inputs.current401k.value);
    const currentRothIRA = parseFloat(inputs.currentRothIRA.value);
    const currentTaxable = parseFloat(inputs.currentTaxable.value);
    const monthly401k = parseFloat(inputs.monthly401k.value);
    const monthlyIRA = parseFloat(inputs.monthlyIRA.value);
    const monthlyTaxable = parseFloat(inputs.monthlyTaxable.value);
    const employerMatch = parseFloat(inputs.employerMatch.value);

    const years = retirementAge - currentAge;
    const contrib401k = monthly401k * 12 * years * (1 + employerMatch);
    const contribIRA = monthlyIRA * 12 * years;
    const contribTaxable = monthlyTaxable * 12 * years;
    const currentTotal = current401k + currentRothIRA + currentTaxable;
    
    return currentTotal + contrib401k + contribIRA + contribTaxable;
}

// Update the chart
function updateChart(data) {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }
    
    // Create new chart
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.age),
            datasets: [
                {
                    label: 'Retirement Goal',
                    data: data.map(d => d.neededForRetirement),
                    borderColor: '#ef4444',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0,
                    tension: 0.1
                },
                {
                    label: '401(k)',
                    data: data.map(d => d.total401k),
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Roth IRA',
                    data: data.map(d => d.total401k + d.totalRothIRA),
                    backgroundColor: 'rgba(16, 185, 129, 0.6)',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    fill: '-1',
                    tension: 0.1
                },
                {
                    label: 'Taxable',
                    data: data.map(d => d.totalAssets),
                    backgroundColor: 'rgba(139, 92, 246, 0.6)',
                    borderColor: '#8b5cf6',
                    borderWidth: 1,
                    fill: '-1',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += formatCurrency(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Age'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Portfolio Value'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            }
        }
    });
}

// Update all UI elements
function updateUI(projectionData, earliestRetirementAge) {
    const finalValue = projectionData[projectionData.length - 1];
    const currentAge = parseInt(inputs.currentAge.value);
    const annualSpending = parseFloat(inputs.annualSpending.value);
    const withdrawalRate = parseFloat(inputs.withdrawalRate.value);
    const neededForRetirement = annualSpending / withdrawalRate;
    const totalContributed = calculateTotalContributed();
    const growthFromInvestment = finalValue.totalAssets - totalContributed;

    // Show results section
    resultsSection.classList.remove('hidden');

    // Update alert
    const alertEl = document.getElementById('retirement-alert');
    if (earliestRetirementAge) {
        alertEl.className = 'alert success';
        alertEl.innerHTML = `
            <h2>🎉 You Can Retire at Age ${earliestRetirementAge}!</h2>
            <p>Based on the ${(withdrawalRate * 100).toFixed(1)}% withdrawal rule, you'll have enough to maintain ${formatCurrency(annualSpending)}/year in spending.</p>
            <p style="margin-top: 0.5rem; opacity: 0.9;">That's ${earliestRetirementAge - currentAge} years from now (year ${2024 + (earliestRetirementAge - currentAge)})</p>
        `;
    } else {
        alertEl.className = 'alert warning';
        alertEl.innerHTML = `
            <p>⚠️ Based on current projections, you won't reach your retirement goal by age ${inputs.retirementAge.value}. Consider increasing contributions or adjusting spending expectations.</p>
        `;
    }

    // Update summary cards
    document.getElementById('canRetireAge').textContent = earliestRetirementAge ? `Age ${earliestRetirementAge}` : 'N/A';
    document.getElementById('canRetireAge').className = earliestRetirementAge ? 'value text-green' : 'value text-red';
    document.getElementById('yearsUntil').textContent = earliestRetirementAge ? `${earliestRetirementAge - currentAge} years` : 'Keep saving!';
    
    document.getElementById('retirementGoal').textContent = formatCurrency(neededForRetirement);
    document.getElementById('retirementGoal').className = 'value text-indigo';
    document.getElementById('spendingInfo').textContent = `For ${formatCurrency(annualSpending)}/yr`;
    
    document.getElementById('projectedValue').textContent = formatCurrency(finalValue.totalAssets);
    document.getElementById('projectedValue').className = 'value text-blue';
    document.getElementById('targetAgeInfo').textContent = `Age ${inputs.retirementAge.value}`;
    
    document.getElementById('totalContributed').textContent = formatCurrency(totalContributed);
    document.getElementById('totalContributed').className = 'value text-green';
    
    document.getElementById('investmentGrowth').textContent = formatCurrency(growthFromInvestment);
    document.getElementById('investmentGrowth').className = 'value text-purple';

    // Update breakdown
    document.getElementById('final401k').textContent = formatCurrency(finalValue.total401k);
    document.getElementById('percent401k').textContent = `${((finalValue.total401k / finalValue.totalAssets) * 100).toFixed(1)}% of total`;
    
    document.getElementById('finalRothIRA').textContent = formatCurrency(finalValue.totalRothIRA);
    document.getElementById('percentRothIRA').textContent = `${((finalValue.totalRothIRA / finalValue.totalAssets) * 100).toFixed(1)}% of total`;
    
    document.getElementById('finalTaxable').textContent = formatCurrency(finalValue.totalTaxable);
    document.getElementById('percentTaxable').textContent = `${((finalValue.totalTaxable / finalValue.totalAssets) * 100).toFixed(1)}% of total`;

    // Update withdrawal rate display
    document.getElementById('withdrawalRateDisplay').textContent = (withdrawalRate * 100).toFixed(1);

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Main calculation and render function
function calculateAndRender() {
    const { data, earliestRetirementAge } = calculateProjection();
    updateUI(data, earliestRetirementAge);
    updateChart(data);
    hasCalculated = true;
}