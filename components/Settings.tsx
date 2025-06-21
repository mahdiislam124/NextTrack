'use client'

import { useState } from 'react'
import { Settings as SettingsIcon, Download, Trash2, Shield } from 'lucide-react'

export default function Settings() {
  const [exportStatus, setExportStatus] = useState<'idle' | 'processing' | 'success'>('idle')

  const handleExportData = () => {
    setExportStatus('processing')
    
    // Simulate export process
    setTimeout(() => {
      const data = {
        transactions: JSON.parse(localStorage.getItem('nextrack-transactions') || '[]'),
        budgets: JSON.parse(localStorage.getItem('nextrack-budgets') || '[]')
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `nextrack-data-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      
      setExportStatus('success')
      setTimeout(() => setExportStatus('idle'), 2000)
    }, 1000)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('nextrack-transactions')
      localStorage.removeItem('nextrack-budgets')
      window.location.reload()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Settings
        </h1>
        <p className="text-text-secondary mt-2">
          Manage your application preferences and data
        </p>
      </div>

      <div className="space-y-6">
        {/* Data Management */}
        <div className="card">
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Data Management
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Download className="w-5 h-5 text-primary mr-3" />
                <div>
                  <h4 className="font-medium text-text-primary">Export Data</h4>
                  <p className="text-sm text-text-secondary">
                    Download all your transactions and budgets as JSON
                  </p>
                </div>
              </div>
              <button
                onClick={handleExportData}
                disabled={exportStatus === 'processing'}
                className="btn-secondary"
              >
                {exportStatus === 'processing' ? 'Exporting...' : 'Export'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Trash2 className="w-5 h-5 text-red-500 mr-3" />
                <div>
                  <h4 className="font-medium text-text-primary">Clear All Data</h4>
                  <p className="text-sm text-text-secondary">
                    Permanently delete all transactions and budgets
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearData}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="card">
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            Privacy & Security
          </h3>
          
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <Shield className="w-5 h-5 text-green-500 mr-3" />
            <div>
              <h4 className="font-medium text-text-primary">Data Storage</h4>
              <p className="text-sm text-text-secondary">
                All data is stored locally in your browser. No data is sent to external servers.
              </p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card">
          <h3 className="text-lg font-display font-semibold text-text-primary mb-4">
            About NexTrack
          </h3>
          
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
            <p>
              <strong>Description:</strong> A modern financial management application for tracking income, expenses, and budgets with AI-powered insights.
            </p>
            <p>
              <strong>Features:</strong> Transaction tracking, budget management, data visualization, AI budget suggestions, and CSV import functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 