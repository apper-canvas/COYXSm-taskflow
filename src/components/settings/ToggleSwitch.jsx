export default function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        enabled ? 'bg-primary' : 'bg-surface-300'
      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 hover:opacity-90 cursor-pointer`}
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
    >
      <span className="sr-only">Toggle setting</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      {/* Adding visual indicators for ON/OFF state */}
      <span className={`absolute text-xs font-bold ${enabled ? 'left-1 text-white' : 'right-1.5 text-white'}`}>
        {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}