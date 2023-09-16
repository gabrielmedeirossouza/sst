import './styles.scss'

interface Props {
  children: React.ReactNode;
}

export function Page({ children }: Props) {
  return (
    <main className="component-page">
      {children}
    </main>
  )
}