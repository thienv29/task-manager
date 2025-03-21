'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import React, {useState} from "react";
import {LoginModel} from "@/lib/types";

export default function LoginForm() {

    const [formData, setFormData] = useState<LoginModel>({email: 'admin@gmail.com', password: '123123123'})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSignIn = async () => {
        await signIn("credentials", {...formData, redirectTo:'/dashboard'})
    }
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"

                    value={formData.email} onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password"
                          className="text-sm font-medium text-primary hover:text-primary/90">
                        Forgot your password?
                    </Link>
                </div>
                <Input id="password" name="password" type="password" autoComplete="current-password"
                       value={formData.password} onChange={handleChange}
                       required/>
            </div>

            <Button onClick={handleSignIn} className="w-full">
                Sign in
            </Button>
        </div>
    )
}