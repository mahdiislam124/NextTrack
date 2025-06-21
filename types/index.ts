export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
  tags?: string[]
}

export interface Budget {
  id: string
  category: string
  amount: number
  period: 'monthly' | 'weekly' | 'yearly'
  spent: number
  startDate: string
  endDate?: string
}

export interface BudgetSuggestion {
  category: string
  suggestedAmount: number
  reasoning: string
  confidence: number
}

export interface FinancialMetrics {
  totalIncome: number
  totalExpenses: number
  netIncome: number
  savingsRate: number
  topExpenseCategories: Array<{
    category: string
    amount: number
    percentage: number
  }>
} 