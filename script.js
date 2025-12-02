const ctx = document.getElementById('pieChart').getContext('2d');
let pieChart;

const defaultData = {
    labels: ['Index Funds', 'Debt Funds', 'Real Estate', 'Gold', 'Cash'],
    datasets: [{
        data: [50, 20, 10, 10, 10],
        backgroundColor: ['#FF5555', '#FF9B2F', '#A76545', '#002455', '#007E6E']
    }]
};

const defaultOptions = {
    plugins: {
        legend: { display: false }, // remove legend/color indicators
        tooltip: { enabled: false }, // remove hover tooltips
        datalabels: {
            color: '#fff',
            font: { weight: 'bold', size: 14 },
            formatter: function(value, context) {
                const label = context.chart.data.labels[context.dataIndex];
                const total = context.dataset.data.reduce((a,b)=>a+b,0);
                const pct = ((value/total)*100).toFixed(1);
                return `${label}\n₹${value}\n(${pct}%)`;
            },
            anchor: 'center',
            align: 'center'
        }
    }
};

// Initialize chart
pieChart = new Chart(ctx, {
    type: 'pie',
    data: defaultData,
    options: defaultOptions,
    plugins: [ChartDataLabels]
});

// Handle form submission
document.getElementById('investmentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const age = parseInt(document.getElementById('age').value);

    let allocations, labels, portfolioType;

    if (age < 30) {
        allocations = [50, 20, 10, 10, 10];
        labels = ['Index Funds', 'Debt Funds', 'Real Estate', 'Gold', 'Cash'];
        portfolioType = 'Growth-Oriented Portfolio';
    } else if (age <= 40) {
        allocations = [40, 30, 15, 7, 8];
        labels = ['Index Funds', 'Debt Funds', 'Real Estate', 'Gold', 'Cash'];
        portfolioType = 'Balanced Portfolio';
    } else {
        allocations = [20, 50, 15, 7, 8];
        labels = ['Index Funds', 'Debt Funds', 'Real Estate', 'Gold', 'Cash'];
        portfolioType = 'Conservative Portfolio';
    }

    const investedAmounts = allocations.map(p => Math.round(amount * p / 100));

    // Update chart
    pieChart.data.labels = labels;
    pieChart.data.datasets[0].data = investedAmounts;
    pieChart.update();

    // Update portfolio type title above chart
    document.getElementById('portfolioTitle').innerText = `${portfolioType} for ₹${amount}`;
});
