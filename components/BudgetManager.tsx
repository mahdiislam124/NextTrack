'use client'

import { useState } from 'react'
import { Budget, Transaction, BudgetSuggestion } from '@/types'
import { Plus, Target, TrendingUp } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface BudgetManagerProps {
  budgets: Budget[]
  transactions: Transaction[]
  addBudget: (budget: Budget) => void
}

export default function BudgetManager({ budgets, transactions, addBudget }: BudgetManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly' as const
  })

  const generateBudgetSuggestions = (): BudgetSuggestion[] => {
    const expenseCategories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {} as Record<string, number>)

    return Object.entries(expenseCategories)
      .map(([category, totalSpent]) => {
        const avgMonthly = totalSpent / 3 // Assuming 3 months of data
        const suggestedAmount = Math.round(avgMonthly * 1.1) // 10% buffer
        return {
          category,
          suggestedAmount,
          reasoning: `Based on average monthly spending of $${Math.round(avgMonthly)}`,
          confidence: 0.8
        }
      })
      .sort((a, b) => b.suggestedAmount - a.suggestedAmount)
      .slice(0, 5)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const budget: Budget = {
      id: uuidv4(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      period: formData.period,
      spent: 0,
      startDate: new Date().toISOString().split('T')[0]
    }

    addBudget(budget)
    setShowForm(false)
    setFormData({ category: '', amount: '', period: 'monthly' })
  }

  const suggestions = generateBudgetSuggestions()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Budget Management
          </h1>
          <p className="text-text-secondary mt-2">
            Set and track your spending budgets
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Budget
        </button>
      </div>

      {/* Budget Suggestions */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
          AI Budget Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.category} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-text-primary">{suggestion.category}</h4>
              <p className="text-2xl font-display font-bold text-primary mt-2">
                ${suggestion.suggestedAmount.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                {suggestion.reasoning}
              </p>
              <button
                onClick={() => {
                  setFormData({
                    category: suggestion.category,
                    amount: suggestion.suggestedAmount.toString(),
                    period: 'monthly'
                  })
                  setShowForm(true)
                }}
                className="btn-secondary mt-3 w-full"
              >
                Use Suggestion
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Current Budgets */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
          Current Budgets
        </h3>
        {budgets.length === 0 ? (
          <p className="text-text-secondary text-center py-8">
            No budgets set yet. Create your first budget to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const progress = (budget.spent / budget.amount) * 100
              const isOverBudget = progress > 100
              
              return (
                <div key={budget.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary">{budget.category}</h4>
                      <p className="text-sm text-text-secondary">
                        {budget.period} budget
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">
                        ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
                      </p>
                      <p className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-text-secondary'}`}>
                        {progress.toFixed(1)}% used
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isOverBudget ? 'bg-red-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* New Budget Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
              Create New Budget
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Food & Dining"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Period
                </label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value as any }))}
                  className="input-field"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 