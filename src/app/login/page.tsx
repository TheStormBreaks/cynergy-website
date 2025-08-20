"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    // Simple hardcoded login logic
    if (email === "faculty" && password === "faculty") {
      login("faculty");
      toast({ title: "Login Successful", description: "Welcome, faculty member." });
      router.push("/admin/create-event");
    } else if (email === "student" && password === "student") {
      login("student");
      toast({ title: "Login Successful", description: "Welcome, student." });
      router.push("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use 'student' or 'faculty' for both email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
            <br />
            (Hint: student/student or faculty/faculty)
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">User ID</Label>
            <Input
              id="email"
              type="text"
              placeholder="student or faculty"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={handleLogin}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
