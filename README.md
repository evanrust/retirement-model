# 💰 Retirement Savings Projection Calculator

An interactive retirement planning calculator that helps you determine when you can retire based on your savings, contributions, and spending goals.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-ff6384.svg)

## ✨ Features

- 📊 **Visual Portfolio Projection** - See how your investments will grow over time
- 🎯 **Retirement Readiness Calculator** - Automatically determines when you can retire
- 💼 **Multiple Account Types** - Track 401(k), Roth IRA, and taxable accounts separately
- 📈 **Dynamic Asset Allocation** - Implements an automatic glide path that adjusts stock/bond ratio as you approach retirement
- 💵 **4% Rule Calculator** - Uses the classic safe withdrawal rate methodology
- ⚡ **Real-time Updates** - All calculations update instantly as you adjust inputs
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/retirement-calculator.git
cd retirement-calculator
```

2. Open `index.html` in your web browser - no build process required!

Alternatively, serve it with a simple HTTP server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 📖 Usage

### Input Parameters

#### Personal Information
- **Current Age** - Your age today
- **Target Retirement Age** - When you plan to retire

#### Current Balances
- **Current 401(k)** - Your current 401(k) balance
- **Current Roth IRA** - Your current Roth IRA balance
- **Current Taxable Accounts** - Brokerage accounts, index funds, etc.

#### Monthly Contributions
- **Monthly 401(k) Contribution** - How much you contribute each month
- **Monthly IRA Contribution** - Your monthly IRA contributions
- **Monthly Taxable Contribution** - Additional monthly investments
- **Employer Match Rate** - e.g., 0.5 = 50% match on your 401(k)

#### Retirement Planning
- **Annual Spending Need** - Your desired annual spending in retirement (in today's dollars)
- **Safe Withdrawal Rate** - Default 4% (0.04) based on the 4% rule
- **Years in Retirement** - Your planning horizon (typically 30 years)

### Understanding Your Results

The calculator provides several key insights:

1. **🎉 Can Retire At** - The earliest age when your portfolio will support your desired spending
2. **🎯 Retirement Goal** - The total portfolio value needed (calculated as: Annual Spending ÷ Withdrawal Rate)
3. **📊 Projected Value** - What your savings will be at your target retirement age
4. **💰 Investment Breakdown** - See contributions vs. compound growth across all account types

## 📐 Model Assumptions

The calculator uses conservative, research-backed assumptions:

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Stock Returns** | 7% real | Inflation-adjusted annual return |
| **Bond Returns** | 2% real | Inflation-adjusted annual return |
| **Starting Allocation** | 90% stocks / 10% bonds | Aggressive growth for younger investors |
| **Glide Path** | -1% stocks/year after 35 | Gradually becomes more conservative |
| **Target Allocation** | 60% stocks / 40% bonds | At retirement age |
| **All Values** | Inflation-adjusted | Everything in today's dollars |

### The 4% Rule

The **4% rule** is a widely-accepted retirement planning guideline that states you can safely withdraw 4% of your retirement portfolio annually (adjusted for inflation) with a high probability your money will last 30+ years.

**Example:** If you need $60,000/year in retirement:
- Required portfolio = $60,000 ÷ 0.04 = **$1,500,000**

This rule is based on the [Trinity Study](https://en.wikipedia.org/wiki/Trinity_study) which analyzed historical market data from 1926-1995.

## 🛠️ Technologies

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling with Grid and Flexbox
- **JavaScript (ES6+)** - Calculation logic and interactivity
- **[Chart.js](https://www.chartjs.org/)** - Data visualization

## 📁 Project Structure

```
retirement-calculator/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Calculation logic and interactivity
└── README.md          # Documentation
```

## 🎨 Customization

### Adjusting Return Assumptions

Edit the return rates in `script.js`:

```javascript
// Expected returns (real, inflation-adjusted)
const stockReturn = 0.07;  // 7% for stocks
const bondReturn = 0.02;   // 2% for bonds
```

### Modifying the Glide Path

Adjust the asset allocation formula in `calculateProjection()`:

```javascript
let stockAllocation = 0.90;
if (yearsUntilRetirement <= 30) {
    stockAllocation = 0.90 - ((30 - yearsUntilRetirement) * 0.01);
    stockAllocation = Math.max(stockAllocation, 0.60);
}
```

### Styling

Customize colors and appearance in `styles.css`. The project uses CSS custom properties for easy theming.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions

- [ ] Add tax calculations for different account types
- [ ] Include Social Security benefit estimates
- [ ] Add scenarios/comparisons feature
- [ ] Export results to PDF
- [ ] Add inflation rate customization
- [ ] Include healthcare cost estimates

## ⚠️ Disclaimer

**This calculator is for educational and planning purposes only.** It makes assumptions about future market returns that may not reflect actual performance. 

- Past performance does not guarantee future results
- All investing involves risk, including potential loss of principal
- Please consult with a qualified financial advisor before making investment decisions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the [FIRE movement](https://www.investopedia.com/terms/f/financial-independence-retire-early-fire.asp) (Financial Independence, Retire Early)
- Built with insights from the Trinity Study and safe withdrawal rate research
- Chart visualization powered by [Chart.js](https://www.chartjs.org/)
- Icons and badges from [Shields.io](https://shields.io/)

## 📬 Contact

Questions or suggestions? Feel free to:
- Open an issue
- Submit a pull request
- Reach out: evan.p.rust@gmail.com

---

**Made with ❤️ for the personal finance community**

*Star ⭐ this repository if you find it helpful!*