import AutomationExecutionsDashboard from "@/components/automation-executions-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Settings</span>
          <span>/</span>
          <span>Account settings</span>
          <span>/</span>
          <span>Current Plan</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Subscription</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-8">
          <button className="pb-3 px-1 text-sm font-medium text-yellow-600 border-b-2 border-yellow-600">
            Current Plan
          </button>
          <button className="pb-3 px-1 text-sm font-medium text-gray-600 hover:text-gray-900">
            Invoices
          </button>
          <button className="pb-3 px-1 text-sm font-medium text-gray-600 hover:text-gray-900">
            Payment Method
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Manage your subscriptions from making a payment to upgrading your plan
        </p>

        {/* Plan Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Workiomer</h2>
              <span className="text-gray-600">Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">8</span>
              <span className="text-gray-600">Active users</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Records */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="9" strokeWidth="2"/>
                  <line x1="9" y1="13" x2="15" y2="13" strokeWidth="2"/>
                  <line x1="9" y1="17" x2="13" y2="17" strokeWidth="2"/>
                </svg>
                <span className="font-medium text-gray-700">Records</span>
              </div>
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                  <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="none"
                    strokeDasharray={`${251.2 * 0.2} 251.2`}/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold">20%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">2K of 10K Records</p>
            </div>

            {/* Storage */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M3 15v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4M7 10l5 5 5-5M12 3v12"/>
                </svg>
                <span className="font-medium text-gray-700">Storage</span>
              </div>
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                  <circle cx="48" cy="48" r="40" stroke="#ef4444" strokeWidth="8" fill="none"
                    strokeDasharray={`${251.2 * 0} 251.2`}/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold">0%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">0 GB of 100 GB Storage</p>
            </div>

            {/* AI Builder */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span className="font-medium text-gray-700">AI builder</span>
              </div>
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                  <circle cx="48" cy="48" r="40" stroke="#eab308" strokeWidth="8" fill="none"
                    strokeDasharray={`${251.2 * 0} 251.2`}/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-semibold">0%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">5 of 100K AI builder</p>
            </div>
          </div>
        </div>

        {/* Automation Executions Dashboard */}
        <AutomationExecutionsDashboard />
      </div>
    </main>
  );
}
