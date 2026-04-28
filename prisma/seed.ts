import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding TripNest database…\n');

  // ───────────────────────────────────────────────
  // 1. Users
  // ───────────────────────────────────────────────
  const raushanHash = await bcrypt.hash('raush@123', 10);
  const raushan = await prisma.user.upsert({
    where: { email: 'raush@gmail.com' },
    update: {
      name: 'Raushan Kumar',
      passwordHash: raushanHash,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCO-CzHlmE8HmIUmbgQQYLp5t0HLqMymNMhlKhTURWyuWVSrKMxeYZvI52VV7uAWM4Kb6yxmn6DaNzF6R8LldBC15VbAQxfNUTQKVAYnEhrXVLTE1WQdZgAE64g2yfOmBfh32oItaJs_k6s53SyJtDIZmsItN_GTer-LPFTZiFkKkHM30d9Y9pxhzOFRh-DAfFRVGkjsk7-JzPnVzFavw5X1cZNgXCLsbtlvaNBcPIymvvhRK0DDqu2qyg_OPFhH4O8TIH9zsxd-6yA',
    },
    create: {
      email: 'raush@gmail.com',
      name: 'Raushan Kumar',
      passwordHash: raushanHash,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCO-CzHlmE8HmIUmbgQQYLp5t0HLqMymNMhlKhTURWyuWVSrKMxeYZvI52VV7uAWM4Kb6yxmn6DaNzF6R8LldBC15VbAQxfNUTQKVAYnEhrXVLTE1WQdZgAE64g2yfOmBfh32oItaJs_k6s53SyJtDIZmsItN_GTer-LPFTZiFkKkHM30d9Y9pxhzOFRh-DAfFRVGkjsk7-JzPnVzFavw5X1cZNgXCLsbtlvaNBcPIymvvhRK0DDqu2qyg_OPFhH4O8TIH9zsxd-6yA',
    },
  });
  console.log('✅ User created:', raushan.name, `(${raushan.email})`);

  const sammi = await prisma.user.upsert({
    where: { email: 'sammi@gmail.com' },
    update: { name: 'Sammi Azaz' },
    create: {
      email: 'sammi@gmail.com',
      name: 'Sammi Azaz',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBLwFQAGPHG3pp1-ne8yzSF8XJ_gbBLbt8dgDkZkllfGkPBSaSDXhqFsMf97FdCNqCWbhtV4PqGi17iYmC0Dhe6ooyRpnrCj2u_JJvGINipKYuQgjdfeNHcf8r6maQ_Nuo7yNouyFNw7E3gpZ0rtoDuy9GHYwfnbN59QTxnbeZ6AiiP6d3TPCuERPqjaOjVy3_A0wLAXXH3zL9Px1k1tlesp9O_lSGF5W3UH91bBgAYEj5HgXLM6wZ7MtsuyYcStiIKk5wUuBK92r1s',
    },
  });
  console.log('✅ User created:', sammi.name, `(${sammi.email})`);

  // ───────────────────────────────────────────────
  // 2. Trip — "Monsoon in Kerala"
  // ───────────────────────────────────────────────
  const INVITE_CODE = 'KERALA-2026';

  // Delete existing trip + cascade data if re-seeding
  // Also clean up old AMALFI-2026 trip if it exists from previous seeds
  for (const code of [INVITE_CODE, 'AMALFI-2026']) {
    const existingTrip = await prisma.trip.findFirst({
      where: { inviteCode: code },
    });
    if (existingTrip) {
      await prisma.expenseSplit.deleteMany({ where: { expense: { tripId: existingTrip.id } } });
      await prisma.expense.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.memory.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.activity.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.pollVote.deleteMany({ where: { poll: { tripId: existingTrip.id } } });
      await prisma.poll.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.packingClaim.deleteMany({ where: { item: { tripId: existingTrip.id } } });
      await prisma.packingItem.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.mapPin.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.tripMember.deleteMany({ where: { tripId: existingTrip.id } });
      await prisma.trip.delete({ where: { id: existingTrip.id } });
      console.log(`🗑️  Cleaned up trip: ${code}`);
    }
  }

  const trip = await prisma.trip.create({
    data: {
      name: 'Monsoon in Kerala',
      description:
        'A week exploring God\'s Own Country — houseboat cruises on Alleppey backwaters, lush tea plantations in Munnar, spice markets, and monsoon magic.',
      coverImage:
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
      startDate: new Date('2026-08-10'),
      endDate: new Date('2026-08-20'),
      currency: 'INR',
      inviteCode: INVITE_CODE,
      latitude: 9.4981,
      longitude: 76.3388,
      ownerId: raushan.id,
      members: {
        create: [
          { userId: raushan.id, role: 'ADMIN' },
          { userId: sammi.id, role: 'MEMBER' },
        ],
      },
    },
  });
  console.log('✅ Trip created:', trip.name, `(${trip.inviteCode})`);

  // ───────────────────────────────────────────────
  // 3. Memory Vault — 3 photo memories
  // ───────────────────────────────────────────────
  const memories = await Promise.all([
    prisma.memory.create({
      data: {
        title: 'Houseboat on the backwaters',
        imageUrl:
          'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
        tripId: trip.id,
        userId: raushan.id,
        likes: 12,
        comments: [
          { user: sammi.name, text: 'This is paradise on water! 🛶', ts: '2026-08-11T09:30:00Z' },
        ],
      },
    }),
    prisma.memory.create({
      data: {
        title: 'Munnar tea plantations',
        imageUrl:
          'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
        tripId: trip.id,
        userId: sammi.id,
        likes: 9,
        comments: [
          { user: raushan.name, text: 'Endless green everywhere 🌿', ts: '2026-08-14T08:15:00Z' },
        ],
      },
    }),
    prisma.memory.create({
      data: {
        title: 'Monsoon sunset at Varkala cliff',
        imageUrl:
          'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&q=80',
        tripId: trip.id,
        userId: raushan.id,
        likes: 15,
        comments: [
          { user: sammi.name, text: 'Best sunset of our lives! 🌅', ts: '2026-08-18T18:00:00Z' },
        ],
      },
    }),
  ]);
  console.log(`✅ Memory Vault: ${memories.length} photos added`);

  // ───────────────────────────────────────────────
  // 4. Financials — Splitwise-style expenses
  // ───────────────────────────────────────────────
  //
  // Expense 1: "Houseboat Booking" — ₹8000 paid by Raushan
  //   Split: Raushan 4000, Sammi 4000
  //
  // Expense 2: "Spice Market Shopping" — ₹3000 paid by Sammi
  //   Split: Raushan 1500, Sammi 1500
  //
  // Net balance:
  //   Raushan paid 8000, owes 1500 to Sammi → net = +2500
  //   Sammi paid 3000, owes 4000 to Raushan → net = -1000
  //   Sammi owes Raushan = 4000 - 1500 = ₹2500
  // ───────────────────────────────────────────────

  const houseboat = await prisma.expense.create({
    data: {
      description: 'Houseboat Booking',
      amount: 8000.0,
      originalAmount: 8000.0,
      originalCurrency: 'INR',
      paidAt: new Date('2026-08-11T10:00:00Z'),
      tripId: trip.id,
      payerId: raushan.id,
      splits: {
        create: [
          { userId: raushan.id, amount: 4000.0, settled: true },
          { userId: sammi.id, amount: 4000.0, settled: false },
        ],
      },
    },
  });
  console.log('✅ Expense:', houseboat.description, `₹${houseboat.amount}`);

  const spiceMarket = await prisma.expense.create({
    data: {
      description: 'Spice Market Shopping',
      amount: 3000.0,
      originalAmount: 3000.0,
      originalCurrency: 'INR',
      paidAt: new Date('2026-08-15T14:00:00Z'),
      tripId: trip.id,
      payerId: sammi.id,
      splits: {
        create: [
          { userId: raushan.id, amount: 1500.0, settled: false },
          { userId: sammi.id, amount: 1500.0, settled: true },
        ],
      },
    },
  });
  console.log('✅ Expense:', spiceMarket.description, `₹${spiceMarket.amount}`);

  // ───────────────────────────────────────────────
  // 5. Activity feed entries
  // ───────────────────────────────────────────────
  await prisma.activity.createMany({
    data: [
      {
        type: 'TRIP_CREATED',
        payload: { tripName: trip.name },
        tripId: trip.id,
        actorId: raushan.id,
        createdAt: new Date('2026-06-01T12:00:00Z'),
      },
      {
        type: 'MEMBER_JOINED',
        payload: { memberName: sammi.name },
        tripId: trip.id,
        actorId: sammi.id,
        createdAt: new Date('2026-06-02T09:00:00Z'),
      },
      {
        type: 'MEMORY_UPLOADED',
        payload: { title: 'Houseboat on the backwaters' },
        tripId: trip.id,
        actorId: raushan.id,
        createdAt: new Date('2026-07-15T09:00:00Z'),
      },
      {
        type: 'EXPENSE_ADDED',
        payload: { description: 'Houseboat Booking', amount: 8000 },
        tripId: trip.id,
        actorId: raushan.id,
        createdAt: new Date('2026-07-16T22:00:00Z'),
      },
      {
        type: 'EXPENSE_ADDED',
        payload: { description: 'Spice Market Shopping', amount: 3000 },
        tripId: trip.id,
        actorId: sammi.id,
        createdAt: new Date('2026-07-22T10:30:00Z'),
      },
    ],
  });
  console.log('✅ Activity feed: 5 entries added');

  // ───────────────────────────────────────────────
  // Summary
  // ───────────────────────────────────────────────
  console.log('\n──────────────────────────────────');
  console.log('🎉 Seed complete!');
  console.log('──────────────────────────────────');
  console.log(`   Users:     ${raushan.name}, ${sammi.name}`);
  console.log(`   Trip:      ${trip.name}`);
  console.log(`   Memories:  ${memories.length}`);
  console.log(`   Expenses:  2 (₹11,000 total)`);
  console.log(`   Balance:   Sammi owes Raushan ₹2,500`);
  console.log('──────────────────────────────────\n');
  console.log(`   🔑 Login: raush@gmail.com / raush@123`);
  console.log(`   🔗 Invite code: ${INVITE_CODE}\n`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());