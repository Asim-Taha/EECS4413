'use client';

import { useState } from 'react';
import SideNav from '@/app/componets/dashboard/sidenav';
import TopNav from '@/app/componets/dashboard/topnav';

export default function LoanCalculatorPage() {
  const [formData, setFormData] = useState({
    vehiclePrice: '',
    downPayment: '',
    interestRate: '',
    loanDurationMonths: ''
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('http://localhost:8080/api/loan/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Include session cookie
        body: JSON.stringify({
          vehiclePrice: parseFloat(formData.vehiclePrice),
          downPayment: parseFloat(formData.downPayment),
          interestRate: parseFloat(formData.interestRate),
          loanDurationMonths: parseInt(formData.loanDurationMonths)
        })
      });
      

      if (!res.ok) throw new Error('Loan calculation failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please check your inputs.');
    }
  };

  return (
    <div className="dashboard-layout">
      <div className="main-content flex-1 p-4">
        <div className="flex justify-center items-start mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Loan Calculator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vehiclePrice" className="block font-medium mb-1">Vehicle Price ($)</label>
                <input type="number" name="vehiclePrice" value={formData.vehiclePrice} onChange={handleChange} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="downPayment" className="block font-medium mb-1">Down Payment ($)</label>
                <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="interestRate" className="block font-medium mb-1">Interest Rate (%)</label>
                <input type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="loanDurationMonths" className="block font-medium mb-1">Loan Duration (months)</label>
                <input type="number" name="loanDurationMonths" value={formData.loanDurationMonths} onChange={handleChange} required className="w-full p-2 border rounded" />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Calculate
              </button>

            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {result && (
              <div className="mt-4 bg-gray-100 p-4 rounded">
                <p><strong>Monthly Payment:</strong> ${result.monthlyPayment}</p>
                <p><strong>Loan Amount:</strong> ${result.loanAmount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
