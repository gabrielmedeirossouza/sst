import './styles.scss'

interface IProps {
  children: React.ReactNode;
}

export function Page({ children }: IProps) {
  return (
    <main className="component-page">
      {children}
    </main>
  )
}