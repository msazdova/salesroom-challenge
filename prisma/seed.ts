import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@salesroom.com',
  },
  {
    name: 'Bob',
    email: 'bob@salesroom.com',
  },
  {
    name: 'Meggie',
    email: 'meggie@salesroom.com',
  },
  {
    name: 'Chuck',
    email: 'chuck@salesroom.com',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })