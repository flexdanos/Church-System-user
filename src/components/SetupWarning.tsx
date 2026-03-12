export const SetupWarning = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Setup Required</h2>
          <p className="text-gray-600">
            This app needs Supabase configuration to work properly.
          </p>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please configure your Supabase credentials in the .env file:
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                <li>VITE_SUPABASE_URL</li>
                <li>VITE_SUPABASE_ANON_KEY</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <strong>Steps:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Create a Supabase project at supabase.com</li>
            <li>Copy your Project URL and anon key</li>
            <li>Update the .env file with your credentials</li>
            <li>Restart the development server</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
