import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.userId = decoded.id;

      next();
    } catch (error) {
      console.log(error);
      return res.json({ message: 'Ошибка авторизации' });
    }
  } else {
    return res.json({ message: 'Ошибка авторизации' });
  }
};
