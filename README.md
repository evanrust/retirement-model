Retirement Savings Projection Calculator
An interactive retirement planning calculator that helps you determine when you can retire based on your savings, contributions, and spending goals.

Features
Visual Portfolio Projection: See how your investments will grow over time
Retirement Readiness Calculator: Automatically determines when you can retire
Multiple Account Types: Track 401(k), Roth IRA, and taxable accounts separately
Dynamic Asset Allocation: Implements an automatic glide path that adjusts stock/bond ratio as you approach retirement
4% Rule Calculator: Uses the classic safe withdrawal rate methodology
Real-time Updates: All calculations update instantly as you adjust inputs
Responsive Design: Works on desktop, tablet, and mobile devices

Usage
Input Fields
Personal Information:

Current Age
Target Retirement Age
Current Balances:

Current 401(k) balance
Current Roth IRA balance
Current Taxable account balance
Monthly Contributions:

Monthly 401(k) contribution
Monthly IRA contribution
Monthly taxable account contribution
Employer match rate (e.g., 0.5 = 50% match)
Retirement Planning:

Annual spending need (in today's dollars)
Safe withdrawal rate (default 4% = 0.04)
Years in retirement (planning horizon)
Understanding the Results
The calculator shows:

When you can retire: The earliest age when your portfolio will support your desired spending
Retirement goal: The total portfolio value needed (Annual Spending ÷ Withdrawal Rate)
Projected portfolio value: What your savings will be at your target retirement age
Total contributed vs. investment growth: See how much comes from your contributions vs. compound returns
Model Assumptions
Stock returns: 7% real (inflation-adjusted)
Bond returns: 2% real (inflation-adjusted)
Starting allocation: 90% stocks / 10% bonds
Glide path: Automatically reduces stock allocation by 1% per year after age 35, reaching 60/40 at retirement
Withdrawal rate: Default 4% (adjustable) - the "4% rule"
All values in today's dollars: Everything is inflation-adjusted
The 4% Rule
The 4% rule states that you can safely withdraw 4% of your retirement portfolio annually (adjusted for inflation) with a high probability your money will last 30+ years. This is based on historical market data and is a widely-used retirement planning guideline.

Example: If you need $60,000/year in retirement, you need a portfolio of $1,500,000 ($60,000 ÷ 0.04).

Technologies Used
HTML5
CSS3 (with CSS Grid and Flexbox)
Vanilla JavaScript (ES6+)
Chart.js for data visualization
File Structure
retirement-calculator/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Calculation logic and interactivity
└── README.md          # This file
Customization
You can easily customize the calculator by modifying:

Return assumptions: Edit stockReturn and bondReturn in script.js
Glide path: Adjust the allocation formula in the calculateProjection() function
Colors and styling: Modify styles.css to match your preferences
Default values: Change the value attributes in index.html
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
Disclaimer
This calculator is for educational and planning purposes only. It makes assumptions about future market returns that may not reflect actual performance. Please consult with a qualified financial advisor before making investment decisions.

Past performance does not guarantee future results. All investing involves risk, including the potential loss of principal.

License
This project is open source and available under the MIT License.

Acknowledgments
Inspired by the FIRE (Financial Independence, Retire Early) movement
Built with insights from Trinity Study and safe withdrawal rate research
Chart visualization powered by Chart.js
Contact
evan.p.rust@gmail.com