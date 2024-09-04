import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifySession = async () => {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { isAuth: true, userId: Number(session.userId) };
};

export const getUser = async () => {
    const session = await verifySession();
    if (!session) return null;

    console.log(session);

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    } catch (error) {
        console.log('Failed to fetch user');
        return null;
    }
};