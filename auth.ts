import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import {Provider} from "@auth/core/providers";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import {hashPassword} from "@/lib/utils";
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

const providers: Provider[] = [
    Google(
        {
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }
    ),
    Credentials({
        name: 'Credentials',
        credentials: {
            email: {},
            password: {},
        },
        async  authorize(credentials: { email: string, password: string }): Promise<any> {
            const prisma: PrismaClient = new PrismaClient();

            if (!credentials) {
                throw new Error('Missing credentials');
            }

            const { email, password } = credentials;

            if (!email || !password) return null;

            const userRecord = await prisma.user.findFirst({ where: { email: email }});

            if (!userRecord) {
                throw new Error('Unable to find user with provided email');
            }

            const isValidPassword: boolean = await compare(password, userRecord.password);

            if (!isValidPassword) {
                throw new Error('Tài khoản hoặc Mật khẩu không chính xác');
            }

            const { password: userPassword, ...userWithoutPassword } = userRecord;

            return userWithoutPassword;
        }

    })
]

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers,
    callbacks:{
        signIn: async (params) => {
            console.log(params)
            const passwordDefault = await hashPassword(process.env.PASSWORD_DEFAULT)
            if (params.account.provider == 'google'){
                const userFoundByEmail = await prisma.user.findFirst({where: {email: params.user.email}});
                if (!userFoundByEmail){
                    await prisma.user.create({
                        data: {
                            name: params.user.name,
                            email: params.user.email,
                            password: passwordDefault,
                            role: 'MEMBER',
                        }
                    })
                }

            }
            return true;
        }
    },
    pages: {
        signIn: "/login",
    },
})

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return {id: providerData.id, name: providerData.name}
        } else {
            return {id: provider.id, name: provider.name}
        }
    })
    .filter((provider) => provider.id !== "credentials")