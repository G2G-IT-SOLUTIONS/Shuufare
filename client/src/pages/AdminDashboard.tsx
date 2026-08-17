import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, LogOut, Loader2, AlertCircle, Search, User as UserIcon } from 'lucide-react'
import axios from 'axios'
// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL;

const getUploadUrl = (path: string | null) => {
  if (!path) return '';
  const baseUrl = API_URL?.replace(/\/api$/, '') || '';
  return `${baseUrl}${path}`;
};

interface User {
  id: number
  fayda_id: string
  name: string | null
  phone_number: string | null
  alt_phone_number: string | null
  email: string | null
  photo_url: string | null
  age: number | null
  gender: string | null
  nationality: string | null
  address: string | null
  birthdate: string | null
  has_license: string | null
  license_file_path: string | null
  is_employed: string | null
  ride_experience: string | null
  ride_platform: string | null
  location: string | null
  accessibility: string | null
  growth_goals: string | null
  future_opportunities: string | null
  referral_source: string | null
  till_number: string | null
  fcn_number: string | null
  targa_number: string | null
  created_at: string
  updated_at: string
}

interface DashboardStats {
  totalUsers: number
  usersThisMonth: number
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/users`, { withCredentials: true }),
        axios.get(`${API_URL}/admin/stats`, { withCredentials: true })
      ])
      setUsers(usersRes.data)
      setStats(statsRes.data)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch data')
      if (err.response?.status === 401) {
        navigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/admin/logout`, {}, { withCredentials: true })
      navigate('/admin/login')
    } catch (err) {
      navigate('/admin/login')
    }
  }

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone_number?.includes(searchTerm)
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 p-4">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Users</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">New This Month</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.usersThisMonth}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-slate-900">Users</h2>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or phone..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.photo_url ? (
                            <img
                              src={getUploadUrl(user.photo_url)}
                              alt={user.name || 'User'}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-slate-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-slate-900">{user.name || 'N/A'}</p>
                           
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">{user.email || 'N/A'}</p>
                        <p className="text-sm text-slate-500">{user.phone_number || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">Gender: {user.gender || 'N/A'}</p>
                        <p className="text-sm text-slate-500">Nationality: {user.nationality || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">
                          {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">User Details</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {selectedUser.photo_url ? (
                  <img
                    src={getUploadUrl(selectedUser.photo_url)}
                    alt={selectedUser.name || 'User'}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center">
                    <UserIcon className="h-10 w-10 text-slate-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{selectedUser.name || 'N/A'}</h3>
                </div>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.phone_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Alternative Phone</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.alt_phone_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Current Address</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Personal Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Age</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.age || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Gender</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.gender || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Nationality</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.nationality || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date of Birth</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.birthdate || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* License Information */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">License Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Has License</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.has_license || 'N/A'}</p>
                    </div>
                    {selectedUser.license_file_path && (
                      <div className="col-span-2">
                        <p className="text-sm text-slate-500 mb-2">License Photo</p>
                        <img
                          src={getUploadUrl(selectedUser.license_file_path)}
                          alt="License Photo"
                          className="w-full max-w-xs h-auto rounded-lg border border-slate-200 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('/api')) {
                              target.src = getUploadUrl(selectedUser.license_file_path);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Employment & Experience */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Employment & Experience</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Currently Employed</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.is_employed || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Previous Experience</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.ride_experience || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Previous Platform</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.ride_platform || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Detail Location</p>
<p className="text-sm font-medium text-slate-900">
  {selectedUser.address
    ? (() => {
        const address =
          typeof selectedUser.address === 'string'
            ? JSON.parse(selectedUser.address)
            : selectedUser.address;

        return [
          address.region,
          address.zone,
          address.woreda,
        ]
          .filter(Boolean)
          .map(value => value.trim())
          .join(', ');
      })()
    : 'N/A'}
</p>                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Additional Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Accessibility Considerations</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.accessibility || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Growth Goals</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.growth_goals || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Future Opportunities</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.future_opportunities || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Heard From</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.referral_source || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Financial Information</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Till Number</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.till_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">FCN Number</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.fcn_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Targa Number</p>
                      <p className="text-sm font-medium text-slate-900">{selectedUser.targa_number || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Timestamps</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Registered</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(selectedUser.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Last Updated</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(selectedUser.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
