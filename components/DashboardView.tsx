'use client'

import { Transaction, Budget, FinancialMetrics } from '@/types'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  Calendar,
  BarChart3
} from 'lucide-react'
import { format } from 'date-fns'
import FinancialCharts from './FinancialCharts'
import BudgetSuggestions from './BudgetSuggestions'

interface DashboardViewProps {
  transactions: Transaction[]
  budgets: Budget[]
}

export default function DashboardView({ transactions, budgets }: DashboardViewProps) {
  const calculateMetrics = (): FinancialMetrics => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const netIncome = totalIncome - totalExpenses
    const savingsRate = totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0

    // Calculate top expense categories
    const expenseCategories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {} as Record<string, number>)

    const topExpenseCategories = Object.entries(expenseCategories)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalExpenses) * 100
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      savingsRate,
      topExpenseCategories
    }
  }

  const metrics = calculateMetrics()
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Financial Dashboard
        </h1>
        <p className="text-text-secondary mt-2">
          Overview of your financial health and spending patterns
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-text-secondary">Total Income</p>
              <p className="text-2xl font-display font-bold text-green-600">
                ${metrics.totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-text-secondary">Total Expenses</p>
              <p className="text-2xl font-display font-bold text-red-600">
                ${metrics.totalExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-text-secondary">Net Income</p>
              <p className={`text-2xl font-display font-bold ${
                metrics.netIncome >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                ${metrics.netIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-accent/20 rounded-lg">
              <PiggyBank className="w-6 h-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-text-secondary">Savings Rate</p>
              <p className="text-2xl font-display font-bold text-accent">
                {metrics.savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Spending Overview
          </h3>
          <FinancialCharts transactions={transactions} />
        </div>

        <div className="card">
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <p className="text-text-secondary text-center py-8">
                No transactions yet. Add your first transaction to get started!
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-text-primary">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {transaction.category} • {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Budget Suggestions */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
          AI Budget Suggestions
        </h3>
        <BudgetSuggestions transactions={transactions} />
      </div>
    </div>
  )
} 