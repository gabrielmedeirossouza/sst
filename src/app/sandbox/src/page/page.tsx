import React from 'react'
import { ClientPopup, Video } from '../components'
import './styles.scss'

export function Page() {
  const [isClientOpen, setIsClientOpen] = React.useState(false)

  return (
    <div className="page-container">
      <div className="client-area">
        <button onClick={() => setIsClientOpen(!isClientOpen)}>{isClientOpen ? "Fechar" : "Abrir"}</button>
        {isClientOpen && <ClientPopup />}
      </div>

      <Video />
    </div>
  )
}