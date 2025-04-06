export const calculateLoan = (req, res) => {
  const { vehiclePrice, downPayment, interestRate, loanDurationMonths } = req.body;


  console.log('Request received:', req.body);
  
  if (
    typeof vehiclePrice !== 'number' ||
    typeof downPayment !== 'number' ||
    typeof interestRate !== 'number' ||
    typeof loanDurationMonths !== 'number' ||
    isNaN(vehiclePrice) ||
    isNaN(downPayment) ||
    isNaN(interestRate) ||
    isNaN(loanDurationMonths)
  ) {
    return res.status(400).json({ error: 'All fields must be valid numbers.' });
  }

  const principal = vehiclePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const n = loanDurationMonths;

  const monthlyPayment = monthlyRate === 0
    ? principal / n
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1);

  return res.json({
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    loanAmount: parseFloat(principal.toFixed(2)),
  });
};