'use client'
import React from 'react'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Container } from '@/components/ui/container';
import { useTheme } from "next-themes";
const Login = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();
    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/30 tracking-wide'>
            <Container className="flex flex-col items-center justify-center w-full">
                <Card className="w-full md:w-5/12 max-w-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-primary/10 bg-card/90 backdrop-blur-lg mt-12">

                    <div className="mb-2 text-center">
                        <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-1 tracking-tight">
                            Login
                        </h1>
                        <p className="text-base text-muted-foreground font-medium">
                            Welcome back! Please login in to continue your journey.
                        </p>
                    </div>

                    <form className="space-y-6" >
                        <div className="space-y-3">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-base font-semibold mb-1"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-12 py-4 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-base font-semibold mb-1"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-12 py-4 text-base rounded-xl bg-card bg-opacity-80 border border-primary focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder:text-muted-foreground"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        {/* {error && (
                            <p className="text-red-500 text-base text-center font-medium">
                                {error}
                            </p>
                        )} */}
                        <ShimmerButton className="w-full py-1 text-base rounded-xl font-bold bg-gradient-to-r from-primary to-primary/80  hover:from-primary/80 hover:to-primary ">
                            <span
                                className="bg-transparent dark:text-white py-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </span>
                        </ShimmerButton>
                    </form>
                    <div className="my-2 border-t border-primary/10" />
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-1 text-sm">
                            <span className="text-muted-foreground">
                                Don&apos;t have an account?
                            </span>
                            <Link
                                href="/signup"
                                className="text-primary font-semibold  hover:text-primary/80 hover:underline transition-colors"
                            >
                                Sign up
                            </Link>
                            <span className="text-muted-foreground">·</span>
                            <Link
                                href="/forgot-password"
                                className="text-primary hover:underline hover:text-primary/80 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </Card>
            </Container>
        </div >
    )
}

export default Login
