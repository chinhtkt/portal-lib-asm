import {
  useState,
  useCallback,
} from 'react';
import { useMounted } from './useMounted';

export function useSafeState(
  initialState = undefined
) {
  const mountedRef = useMounted();
  const [state, setState] = useState(initialState);
  const setSafeState = useCallback(
    function setSafeState(state) {
      if (mountedRef.current) {
        setState(state);
      }
    },
    [setState, mountedRef]
  );

  return [state, setSafeState];
}
