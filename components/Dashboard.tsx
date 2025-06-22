'use client'

import { Transaction, Budget } from '@/types'
import DashboardView from './DashboardView'
import IncomeForm from './IncomeForm'
import ExpenseForm from './ExpenseForm'
import BudgetManager from './BudgetManager'
import ImportTransactions from './ImportTransactions'
import Settings from './Settings'

interface DashboardProps {
  transactions: Transaction[]
  budgets: Budget[]
  addTransaction: (transaction: Transaction) => void
  addBudget: (budget: Budget) => void
  activeTab: string
}

export default function Dashboard({ 
  transactions, 
  budgets, 
  addTransaction, 
  addBudget, 
  activeTab 
}: DashboardProps) {
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView transactions={transactions} budgets={budgets} />
      case 'income':
        return <IncomeForm addTransaction={addTransaction} />
      case 'expenses':
        return <ExpenseForm addTransaction={addTransaction} />
      case 'budgets':
        return <BudgetManager budgets={budgets} transactions={transactions} addBudget={addBudget} />
      case 'import':
        return <ImportTransactions addTransaction={addTransaction} />
      case 'settings':
        return <Settings />
      default:
        return <DashboardView transactions={transactions} budgets={budgets} />
    }
  }

  return (
    <div className="p-6">
      {renderActiveTab()}
    </div>
  )
} 