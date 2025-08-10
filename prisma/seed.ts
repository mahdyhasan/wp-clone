import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default admin user
  const adminEmail = 'admin@augmex.io';
  const adminPassword = 'admin123';

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
        username: 'admin',
      },
    });

    console.log('Admin user created successfully');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } else {
    console.log('Admin user already exists');
  }

  // Create some default categories
  const categories = [
    { name: 'Uncategorized', slug: 'uncategorized', description: 'Default category' },
    { name: 'Technology', slug: 'technology', description: 'Tech-related posts' },
    { name: 'Business', slug: 'business', description: 'Business and finance' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle and personal' },
  ];

  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Category '${category.name}' created`);
    } else {
      console.log(`Category '${category.name}' already exists`);
    }
  }

  // Create some default tags
  const tags = [
    { name: 'General', slug: 'general' },
    { name: 'News', slug: 'news' },
    { name: 'Tutorial', slug: 'tutorial' },
    { name: 'Review', slug: 'review' },
  ];

  for (const tag of tags) {
    const existingTag = await prisma.tag.findUnique({
      where: { slug: tag.slug },
    });

    if (!existingTag) {
      await prisma.tag.create({
        data: tag,
      });
      console.log(`Tag '${tag.name}' created`);
    } else {
      console.log(`Tag '${tag.name}' already exists`);
    }
  }

  console.log('Database seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });