'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'
import { Transaction, Budget } from '@/types'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('nextrack-transactions')
    const savedBudgets = localStorage.getItem('nextrack-budgets')
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nextrack-transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('nextrack-budgets', JSON.stringify(budgets))
  }, [budgets])

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction])
  }

  const addBudget = (budget: Budget) => {
    setBudgets(prev => [...prev, budget])
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <Dashboard 
          transactions={transactions}
          budgets={budgets}
          addTransaction={addTransaction}
          addBudget={addBudget}
          activeTab={activeTab}
        />
      </main>
    </div>
  )
} 