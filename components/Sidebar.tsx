'use client'

import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Upload, 
  Settings,
  PiggyBank
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'income', label: 'Income', icon: DollarSign },
    { id: 'expenses', label: 'Expenses', icon: TrendingUp },
    { id: 'budgets', label: 'Budgets', icon: PiggyBank },
    { id: 'import', label: 'Import', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="w-64 bg-surface shadow-medium h-full">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold text-primary">
          NexTrack
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Financial Management
        </p>
      </div>
      
      <nav className="mt-8">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                isActive 
                  ? 'bg-primary text-white' 
                  : 'text-text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
} 