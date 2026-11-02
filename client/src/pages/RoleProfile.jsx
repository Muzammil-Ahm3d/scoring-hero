import Screen from '../components/Screen'
import RoleProfileView from '../components/RoleProfileView'
import LanguageSelector from '../components/LanguageSelector'

export default function RoleProfile() {
  return (
    <Screen
      back
      title="Profile & Account"
      right={<LanguageSelector compact />}
      padded={false}
    >
      <div style={{ padding: '12px 14px 60px' }}>
        <RoleProfileView />
      </div>
    </Screen>
  )
}
