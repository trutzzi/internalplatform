import { useContext } from 'react'

import { SnackBarContext } from '../components/SnackbarProvider'

const useSnackBars = () => useContext(SnackBarContext)
export default useSnackBars