import {PrismaClient, UserRole} from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Create Teams
    const team1 = await prisma.team.create({
        data: {
            name: 'Development Team',
            description: 'Handles all development tasks',
            color: '#3498db',
        },
    });

    const team2 = await prisma.team.create({
        data: {
            name: 'Marketing Team',
            description: 'Manages marketing campaigns',
            color: '#e74c3c',
        },
    });

    // Create Users
    const usersData = [
        {name: 'Admin', email: 'admin@gmail.com', role: 'ADMIN' as UserRole, teamId: team1.id},
        {name: 'Alice Johnson', email: 'alice@example.com', role: 'TEAM_LEAD'  as UserRole, teamId: team1.id},
        {name: 'Bob Smith', email: 'bob@example.com', role: 'MEMBER'  as UserRole, teamId: team2.id},
        {name: 'David Miller', email: 'david@example.com', role: 'TEAM_LEAD' as UserRole, teamId: team2.id},
        {name: 'Emma Wilson', email: 'emma@example.com', role: 'MEMBER' as UserRole, teamId: team1.id},
        {name: 'Frank Adams', email: 'frank@example.com', role: 'MEMBER' as UserRole, teamId: team2.id},
        {name: 'Grace Thomas', email: 'grace@example.com', role: 'TEAM_LEAD' as UserRole, teamId: team1.id},
        {name: 'Henry Scott', email: 'henry@example.com', role: 'MEMBER' as UserRole, teamId: team2.id},
        {name: 'Ivy Johnson', email: 'ivy@example.com', role: 'MEMBER' as UserRole, teamId: team1.id},
        {name: 'Jack White', email: 'jack@example.com', role: 'TEAM_LEAD' as UserRole, teamId: team2.id},
        {name: 'Karen Black', email: 'karen@example.com', role: 'MEMBER' as UserRole, teamId: team1.id},
    ];

    for (const user of usersData) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.PASSWORD_DEFAULT, salt);
        await prisma.user.create({
            data: {...user, password: hashedPassword},
        });
    }

    // Create Columns
    const todoColumn = await prisma.column.create({
        data: {
            title: 'To Do',
            color: '#f1c40f',
        },
    });

    const inProgressColumn = await prisma.column.create({
        data: {
            title: 'In Progress',
            color: '#e67e22',
        },
    });

    const doneColumn = await prisma.column.create({
        data: {
            title: 'Done',
            color: '#2ecc71',
        },
    });

    // Create Tasks
    await prisma.task.create({
        data: {
            title: 'Setup Database',
            description: 'Configure Prisma and MySQL',
            priority: 'HIGH',
            columnId: todoColumn.id,
            teamId: team1.id,
            assignees: {connect: [{id: 1}]},
        },
    });

    await prisma.task.create({
        data: {
            title: 'Create Landing Page',
            description: 'Design and develop marketing page',
            priority: 'NORMAL',
            columnId: inProgressColumn.id,
            teamId: team2.id,
            assignees: {connect: [{id: 2}]},
        },
    });

    console.log('Database has been seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
