import { Request, Response } from 'express';
import { success } from '../../lib/consolemsg';

export const getAppController = async (req: Request, res: Response) => {
  const message = 'App works!';
  success(message);
  return res.status(200).json({ message });
}
