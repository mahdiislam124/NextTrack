'use client'

import { Transaction } from '@/types'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface FinancialChartsProps {
  transactions: Transaction[]
}

export default function FinancialCharts({ transactions }: FinancialChartsProps) {
  const COLORS = ['#138585', '#77B5FE', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']

  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const pieData = Object.entries(expenseCategories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  const monthlyData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' })
      acc[month] = (acc[month] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  const barData = Object.entries(monthlyData)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return months.indexOf(a.month) - months.indexOf(b.month)
    })

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-secondary">
          No transaction data available. Add some transactions to see charts!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Expense Categories Pie Chart */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Expense Categories</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Spending Bar Chart */}
      {barData.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Monthly Spending</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="amount" fill="#138585" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
} 