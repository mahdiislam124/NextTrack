'use client'

import { useState } from 'react'
import { Transaction } from '@/types'
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface ImportTransactionsProps {
  addTransaction: (transaction: Transaction) => void
}

export default function ImportTransactions({ addTransaction }: ImportTransactionsProps) {
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [importedCount, setImportedCount] = useState(0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setImportStatus('processing')
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string
        const lines = csvContent.split('\n')
        const headers = lines[0]?.split(',') || []
        
        let imported = 0
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim()
          if (!line) continue
          
          const values = line.split(',')
          if (values.length >= 4) {
            const transaction: Transaction = {
              id: uuidv4(),
              type: parseFloat(values[1]) > 0 ? 'income' : 'expense',
              amount: Math.abs(parseFloat(values[1])),
              category: values[2] || 'Other',
              description: values[0] || 'Imported transaction',
              date: values[3] || new Date().toISOString().split('T')[0]
            }
            
            addTransaction(transaction)
            imported++
          }
        }
        
        setImportedCount(imported)
        setImportStatus('success')
      } catch (error) {
        setImportStatus('error')
      }
    }
    
    reader.readAsText(file)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Import Transactions
        </h1>
        <p className="text-text-secondary mt-2">
          Import your bank transactions from CSV files
        </p>
      </div>

      <div className="card">
        <div className="text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          
          <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
            Upload CSV File
          </h3>
          
          <p className="text-text-secondary mb-6">
            Supported format: Date, Amount, Category, Description
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="btn-primary cursor-pointer inline-flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Choose CSV File
            </label>
          </div>

          {importStatus === 'processing' && (
            <div className="flex items-center justify-center text-primary">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
              Processing transactions...
            </div>
          )}

          {importStatus === 'success' && (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Successfully imported {importedCount} transactions!
            </div>
          )}

          {importStatus === 'error' && (
            <div className="flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              Error importing transactions. Please check your file format.
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-text-primary mb-2">CSV Format Example:</h4>
          <pre className="text-sm text-text-secondary">
{`Date,Amount,Category,Description
2024-01-15,-50.00,Food & Dining,Grocery shopping
2024-01-16,2500.00,Salary,Monthly salary
2024-01-17,-25.00,Transportation,Gas station`}
          </pre>
        </div>
      </div>
    </div>
  )
} 