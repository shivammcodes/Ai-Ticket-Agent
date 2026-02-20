import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label";

const SignUp = () => {
  return (
    <div className="car flex h-screen w-full justify-center items-center">
        <Card className="w-full max-w-sm bg-[#171717]/80 border-border/40">
      <CardHeader>
        <CardTitle className="text-muted">Sign up</CardTitle>
        <CardDescription className="text-[#949494]">
          Sign up using email and password
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-muted">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="placeholder:text-[#949494] text-muted border-border/40"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-muted">Password</Label>
              </div>
              <Input id="password" type="password" required className="text-muted border-border/40 placeholder:text-[#949494]" placeholder="****" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-muted text-foreground hover:bg-[#949494]">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default SignUp