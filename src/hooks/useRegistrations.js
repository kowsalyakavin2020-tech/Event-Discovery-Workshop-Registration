import { useContext } from 'react'
import { RegistrationContext } from '../context/RegistrationContext'

export default function useRegistrations() {
  return useContext(RegistrationContext)
}
