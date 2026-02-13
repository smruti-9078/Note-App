import { ArrowRight, Zap } from "lucide-react";
import React from "react";
import { data, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { getData } from "@/context/userContext";

const Hero = () => {
  const { user } = getData();
  const navigate = useNavigate();
  return (
    <div className="relative w-full md:h-screen bg-slate-400 overflow-hidden">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="font-bold text-2xl">Welcome {user.name}</h1>
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="mb-4 text-green border border-green-200"
              >
                <Zap className="w-3 h-3 me-1" />
                New: AI-Powered Features
              </Badge>
              <h1 className="text-green-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your thoughts, organized and accessible.
                <span className="text-gray-800">everywhere</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Capture your ideas, organize thoughts, and collaborate
                seamlessly.The mordern note-taking app that grows with you and
                keeps your ideas secure in the cloud.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                onClick={() => navigate("/create-todo")}
                size="lg"
                className="h-12 px-8 relative bg-green-600 "
              >
                start Taking Notes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                sizhe="lg"
                className="h-12 px-8 bg-white text-green-800"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <p className="text-sm text-green-800 text-center p-3">
            Free forever. No credit card required . 2 minutes setup
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
