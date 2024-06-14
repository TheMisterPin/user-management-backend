
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const users = [];
  for (let i = 1; i <= 20; i++) {
    const hashedPassword = await bcrypt.hash('password', 10);
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  for (const user of users) {
    const friendIds = new Set<number>();

    while (friendIds.size < 3) {
      const randomFriend = users[Math.floor(Math.random() * users.length)];
      if (randomFriend.id !== user.id) {
        friendIds.add(randomFriend.id);
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        friends: {
          connect: Array.from(friendIds).map((id) => ({ id })),
        },
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
