import bcrypt from 'bcrypt';
import prisma from '../src/db/prismaClient.js';

async function seedAdmin() {
  try {
    const email = 'admin@shuufare.com';
    const password = 'admin123'; // Change this in production!
    const fullName = 'Admin User';
    const phone = '+251911000000';

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      console.log('Admin user already exists with email:', email);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        role: 'admin',
        isActive: true
      }
    });

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('⚠️  Please change the password in production!');
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
