export default function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-4 text-xl text-gray-600">Welcome to your dashboard!</p>
            <a href="/profile" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Go to Profile
            </a>
        </div>
    );
}