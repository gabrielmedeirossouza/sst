import React from 'react'
import './styles.scss'

const CLIENT_POPUP_URL = import.meta.env.VITE_CLIENT_POPUP_URL as string

function ClientPopupComponent() {
  return (
    <div className="component-client-popup">
      <iframe className="client-popup" src={CLIENT_POPUP_URL}></iframe>
    </div>
  )
}

export const ClientPopup = React.memo(ClientPopupComponent)