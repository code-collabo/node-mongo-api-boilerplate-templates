import { success } from '../../lib/consolemsg';

export const getAppController = async (req, res) => {
  const message = 'App works!';
  success(message);
  return res.status(200).json({ message });
}
