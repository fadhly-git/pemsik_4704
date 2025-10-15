import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="flex min-h-svh w-full bg-gray-100 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-2">
          Login
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" className="block mb-1 font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block mb-1 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="flex items-center">
              <input type="checkbox" className="mr-1" />
              <span className="text-sm font-semibold">Ingat saya</span>
            </Label>
            <a href="#" className="text-sm text-cyan-600 hover:underline">
              Lupa kata sandi?
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};
