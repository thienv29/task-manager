'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import React, {useState} from "react";
import {LoginModel} from "@/lib/types";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function LoginForm() {

    const [formData, setFormData] = useState<LoginModel>({email: 'admin@gmail.com', password: '123123123'})

    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSignIn = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Vui lòng nhập email và mật khẩu!");
            return;
        }

        const result = await signIn("credentials", { ...formData, redirect: false });
        if (result?.error) {
            toast.error("Tài khoản hoặc mật khẩu không đúng!");
            return;
        }
        router.push("/dashboard");
    };

    // Xử lý sự kiện nhấn phím Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSignIn();
        }
    };

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
                    onKeyDown={handleKeyDown}
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
                       value={formData.password} onChange={handleChange} onKeyDown={handleKeyDown}
                       required/>
            </div>

            <Button onClick={handleSignIn} className="w-full">
                Sign in
            </Button>
        </div>
    )
}