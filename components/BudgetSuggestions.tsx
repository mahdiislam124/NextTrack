'use client'

import { Transaction, BudgetSuggestion } from '@/types'
import { Brain, TrendingUp, Target } from 'lucide-react'

interface BudgetSuggestionsProps {
  transactions: Transaction[]
}

export default function BudgetSuggestions({ transactions }: BudgetSuggestionsProps) {
  const generateSuggestions = (): BudgetSuggestion[] => {
    if (transactions.length === 0) {
      return []
    }

    const expenseCategories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {} as Record<string, number>)

    const totalExpenses = Object.values(expenseCategories).reduce((sum, amount) => sum + amount, 0)
    
    return Object.entries(expenseCategories)
      .map(([category, totalSpent]) => {
        const avgMonthly = totalSpent / 3 // Assuming 3 months of data
        const percentage = (totalSpent / totalExpenses) * 100
        
        let reasoning = ''
        let suggestedAmount = avgMonthly
        
        if (percentage > 30) {
          reasoning = 'High spending category - consider reducing to improve savings'
          suggestedAmount = avgMonthly * 0.8
        } else if (percentage > 15) {
          reasoning = 'Moderate spending - maintain current level with slight reduction'
          suggestedAmount = avgMonthly * 0.9
        } else {
          reasoning = 'Low spending category - reasonable budget allocation'
          suggestedAmount = avgMonthly * 1.1
        }

        return {
          category,
          suggestedAmount: Math.round(suggestedAmount),
          reasoning,
          confidence: 0.85
        }
      })
      .sort((a, b) => b.suggestedAmount - a.suggestedAmount)
      .slice(0, 3)
  }

  const suggestions = generateSuggestions()

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8">
        <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-text-secondary">
          Add more transaction data to get personalized budget suggestions
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {suggestions.map((suggestion, index) => (
        <div key={suggestion.category} className="p-4 border border-gray-200 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-primary mr-2" />
            <h4 className="font-medium text-text-primary">{suggestion.category}</h4>
          </div>
          
          <p className="text-2xl font-display font-bold text-primary mb-2">
            ${suggestion.suggestedAmount.toLocaleString()}
          </p>
          
          <p className="text-sm text-text-secondary mb-3">
            {suggestion.reasoning}
          </p>
          
          <div className="flex items-center text-xs text-text-secondary">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>{Math.round(suggestion.confidence * 100)}% confidence</span>
          </div>
        </div>
      ))}
    </div>
  )
} 