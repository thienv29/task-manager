import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import {Provider} from "@auth/core/providers";

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
    )
]

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers,
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