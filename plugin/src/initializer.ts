import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

export const initializer = () => {
  dayjs.locale(ja);
};
