import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const adminUser = await db.user.create({
      data: {
        email: 'admin@augmex.io',
        name: 'Admin User',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });

    console.log('Admin user created successfully:', {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await db.$disconnect();
  }
}

createAdminUser();