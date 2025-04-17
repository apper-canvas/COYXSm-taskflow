import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SettingSection from './SettingSection'
import ToggleSwitch from './ToggleSwitch'
import Card from '../common/Card'
import { 
  Bell, 
  ShieldCheck, 
  Key, 
  Lock, 
  Github, 
  Sliders, 
  Trash2, 
  LogOut,
  UserCog,
  Chrome,
  Facebook,
  Twitter
} from 'lucide-react'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [formData, setFormData] = useState({
    // Email notifications
    emailOnTaskAssigned: true,
    emailOnComments: true,
    emailOnDeadlines: true,
    emailOnStatusUpdates: false,
    emailDigest: true,
    
    // MFA
    mfaEnabled: false,
    
    // Security
    sessionTimeout: "30",
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Password
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    
    // General
    language: "english",
    timezone: "UTC-05:00",
    theme: "light"
  })

  const handleToggle = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save the settings to your backend
    alert("Settings saved successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
        <p className="text-surface-600">Manage your account preferences and settings</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email Notifications */}
        <SettingSection 
          icon={<Bell size={20} />}
          title="Email Notifications"
          description="Control which emails you receive"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Task Assignments</h4>
                <p className="text-sm text-surface-500">Receive emails when you're assigned to a task</p>
              </div>
              <ToggleSwitch 
                enabled={formData.emailOnTaskAssigned} 
                onChange={() => handleToggle('emailOnTaskAssigned')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Comments</h4>
                <p className="text-sm text-surface-500">Receive emails when someone comments on your tasks</p>
              </div>
              <ToggleSwitch 
                enabled={formData.emailOnComments} 
                onChange={() => handleToggle('emailOnComments')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Deadline Reminders</h4>
                <p className="text-sm text-surface-500">Get reminders about upcoming task deadlines</p>
              </div>
              <ToggleSwitch 
                enabled={formData.emailOnDeadlines} 
                onChange={() => handleToggle('emailOnDeadlines')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Status Updates</h4>
                <p className="text-sm text-surface-500">Receive emails when task statuses change</p>
              </div>
              <ToggleSwitch 
                enabled={formData.emailOnStatusUpdates} 
                onChange={() => handleToggle('emailOnStatusUpdates')} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Weekly Digest</h4>
                <p className="text-sm text-surface-500">Get a weekly summary of your tasks and projects</p>
              </div>
              <ToggleSwitch 
                enabled={formData.emailDigest} 
                onChange={() => handleToggle('emailDigest')} 
              />
            </div>
          </div>
        </SettingSection>

        {/* Multi-Factor Authentication */}
        <SettingSection 
          icon={<ShieldCheck size={20} />}
          title="Multi-Factor Authentication"
          description="Add an extra layer of security to your account"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Enable MFA</h4>
                <p className="text-sm text-surface-500">Require a verification code when signing in</p>
              </div>
              <ToggleSwitch 
                enabled={formData.mfaEnabled} 
                onChange={() => handleToggle('mfaEnabled')} 
              />
            </div>

            {formData.mfaEnabled && (
              <div className="mt-4 p-4 bg-surface-100 rounded-lg">
                <h4 className="font-medium text-surface-800 mb-2">Setup Instructions</h4>
                <ol className="list-decimal list-inside text-sm text-surface-700 space-y-2">
                  <li>Download an authenticator app like Google Authenticator or Authy</li>
                  <li>Scan the QR code below with the app</li>
                  <li>Enter the verification code provided by the app</li>
                </ol>
                <div className="mt-4 flex flex-col items-center">
                  <div className="w-40 h-40 bg-surface-200 flex items-center justify-center rounded-lg">
                    <p className="text-xs text-surface-500">QR Code Placeholder</p>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-surface-700 mb-1">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      id="verificationCode"
                      className="input-field w-40 text-center"
                      placeholder="000000"
                    />
                  </div>
                  <button type="button" className="btn btn-primary mt-4">
                    Verify & Enable
                  </button>
                </div>
              </div>
            )}
          </div>
        </SettingSection>

        {/* Data Security */}
        <SettingSection 
          icon={<Lock size={20} />}
          title="Data Security"
          description="Manage your security preferences"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Session Timeout</h4>
                <p className="text-sm text-surface-500">Automatically log out after a period of inactivity</p>
              </div>
              <select
                name="sessionTimeout"
                value={formData.sessionTimeout}
                onChange={handleInputChange}
                className="input-field w-40"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-surface-800">Login Alerts</h4>
                <p className="text-sm text-surface-500">Get email alerts for new login attempts</p>
              </div>
              <ToggleSwitch 
                enabled={formData.loginAlerts} 
                onChange={() => handleToggle('loginAlerts')} 
              />
            </div>

            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="flex items-center font-medium text-red-700">
                <Trash2 size={16} className="mr-2" />
                Danger Zone
              </h4>
              <p className="mt-1 text-sm text-red-600">
                Permanently delete your account and all associated data
              </p>
              <button
                type="button"
                className="mt-3 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </SettingSection>

        {/* Change Password */}
        <SettingSection 
          icon={<Key size={20} />}
          title="Change Password"
          description="Update your password for better security"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-surface-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-surface-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-surface-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <button type="button" className="btn btn-primary mt-2">
              Update Password
            </button>
          </div>
        </SettingSection>

        {/* Connected Social Accounts */}
        <SettingSection 
          icon={<Github size={20} />}
          title="Connected Social Accounts"
          description="Manage connected accounts for faster login"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Chrome className="text-red-500 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-surface-800">Google</h4>
                  <p className="text-sm text-surface-500">Sign in with your Google account</p>
                </div>
              </div>
              <button type="button" className="btn btn-outline text-sm">
                Connect
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-surface-100">
              <div className="flex items-center">
                <Facebook className="text-blue-600 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-surface-800">Facebook</h4>
                  <p className="text-sm text-surface-500">Sign in with your Facebook account</p>
                </div>
              </div>
              <button type="button" className="btn btn-outline text-sm">
                Connect
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-surface-100">
              <div className="flex items-center">
                <Twitter className="text-blue-400 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-surface-800">Twitter</h4>
                  <p className="text-sm text-surface-500">Sign in with your Twitter account</p>
                </div>
              </div>
              <button type="button" className="btn btn-outline text-sm">
                Connect
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t border-surface-100">
              <div className="flex items-center">
                <Github className="text-surface-700 mr-3" size={20} />
                <div>
                  <h4 className="font-medium text-surface-800">GitHub</h4>
                  <p className="text-sm text-surface-500">Sign in with your GitHub account</p>
                </div>
              </div>
              <button type="button" className="btn btn-outline text-sm">
                Connect
              </button>
            </div>
          </div>
        </SettingSection>

        {/* General Settings */}
        <SettingSection 
          icon={<Sliders size={20} />}
          title="General Settings"
          description="Manage application preferences"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-surface-700 mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-surface-700 mb-1">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="UTC-12:00">(UTC-12:00) International Date Line West</option>
                <option value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</option>
                <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
                <option value="UTC+00:00">(UTC+00:00) London, Edinburgh</option>
                <option value="UTC+01:00">(UTC+01:00) Paris, Berlin, Rome</option>
                <option value="UTC+08:00">(UTC+08:00) Beijing, Singapore</option>
                <option value="UTC+09:00">(UTC+09:00) Tokyo, Seoul</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-surface-700 mb-1">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
        </SettingSection>

        {/* Save All Settings Button */}
        <div className="mt-8 flex justify-end">
          <button type="submit" className="btn btn-primary px-6">
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  )
}