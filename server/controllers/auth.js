import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await UserModel.findOne({ username });

    if (isUsed) res.status(404).json({ message: 'user занят' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    const user = await newUser.save();

    res.json({ user, token, message: 'Регистрация прошла успешна' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Произошла ошибка при регистрации' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) res.status(401).json({ message: 'Ошибка при авторизации' });

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) res.status(401).json({ message: 'Ошибка при авторизации' });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    res.json({ token, user, message: 'Авторизавция прошла успешно' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Произошла ошибка при авторизации' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) res.status(401).json({ message: 'Ошибка при получении информации' });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Произошла ошибка при получении информации' });
  }
};
