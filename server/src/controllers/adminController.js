import bcrypt from 'bcrypt';
import prisma from '../db/prismaClient.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!admin.isActive) {
      return res.status(403).json({ error: 'Admin account is deactivated' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;

    res.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: admin.fullName,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    next(error);
  }
};

export const adminLogout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.session.adminId },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fayda_id: true,
        name: true,
        email: true,
        phone: true,
        alternative_phone: true,
        age: true,
        gender: true,
        nationality: true,
        birthdate: true,
        current_address: true,
        has_license: true,
        license_photo: true,
        currently_employed: true,
        previous_experience: true,
        goals: true,
        future_opportunities: true,
        accessibility_considerations: true,
        location: true,
        photo_url: true,
        created_at: true,
        updated_at: true
      },
      orderBy: { created_at: 'desc' }
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await prisma.user.count();
    const usersThisMonth = await prisma.user.count({
      where: {
        created_at: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30))
        }
      }
    });

    res.json({
      totalUsers,
      usersThisMonth
    });
  } catch (error) {
    next(error);
  }
};
