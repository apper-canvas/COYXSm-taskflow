export default function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        enabled ? 'bg-primary' : 'bg-surface-300'
      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1`}
      onClick={onChange}
      role="switch"
      aria-checked={enabled}
    >
      <span className="sr-only">Toggle setting</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}