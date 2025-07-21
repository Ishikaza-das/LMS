import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signup from "./Signup";
import Login from "./Login";

const Tab = () => {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-20">
      <Tabs defaultValue="login" className="w-1/2">
        <TabsList className="bg-slate-300 h-10 px-2 gap-2 w-full">
          <TabsTrigger
            value="login"
            className="text-lg font-semibold cursor-pointer"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="text-lg font-semibold cursor-pointer"
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tab;
