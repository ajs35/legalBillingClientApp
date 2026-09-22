import { useApp } from '../context/AppContext';
import { IconCheckCircle } from './Icons';

export function Toast() {
  const { toastMsg, toastShown } = useApp();
  return (
    <div className={'toast' + (toastShown ? ' show' : '')}>
      <IconCheckCircle />
      <span>{toastMsg}</span>
    </div>
  );
}
