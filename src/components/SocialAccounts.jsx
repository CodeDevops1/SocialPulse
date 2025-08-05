import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react'

export default function SocialAccounts() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, API_BASE_URL } = useAuth()

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social-accounts/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAccounts(data.accounts || [])
      }
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: 'bg-blue-600',
      twitter: 'bg-sky-500',
      instagram: 'bg-pink-600',
      linkedin: 'bg-blue-700',
      youtube: 'bg-red-600'
    }
    return colors[platform] || 'bg-gray-600'
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading accounts...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Social Media Accounts</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${getPlatformColor(account.platform)} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">
                      {account.platform.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{account.account_name}</CardTitle>
                    <CardDescription>{account.account_handle}</CardDescription>
                  </div>
                </div>
                {account.is_connected ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Followers</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{account.follower_count?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={account.is_connected ? 'default' : 'destructive'}>
                    {account.is_connected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    {account.is_connected ? 'Manage' : 'Reconnect'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {accounts.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts connected</h3>
              <p className="text-gray-500 text-center mb-4">
                Connect your social media accounts to start managing your content
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Connect Your First Account
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Account Health Overview */}
      {accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Account Health</CardTitle>
            <CardDescription>
              Overview of your connected accounts performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {accounts.map((account) => (
                <div key={account.id} className="text-center p-4 border rounded-lg">
                  <div className={`w-8 h-8 rounded-full ${getPlatformColor(account.platform)} mx-auto mb-2`}></div>
                  <p className="font-medium capitalize">{account.platform}</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5.2%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

