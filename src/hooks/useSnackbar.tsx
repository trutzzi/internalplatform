import { useContext } from 'react';

import { SnackBarContext } from '../components/snackbarProvider';

const useSnackBars = () => useContext(SnackBarContext);
export default useSnackBars;
