import './styles.scss'

const CLIENT_POPUP_URL = import.meta.env.VITE_CLIENT_POPUP_URL as string

export function ClientPopup() {
  return (
    <div className="component-client-popup">
      <iframe className="client-popup" src={CLIENT_POPUP_URL}></iframe>
    </div>
  )
}