import FileUpload from "@/components/forms/file-upload";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Navbar from "./_components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
      <section className="w-full h-auto flex flex-col items-center">
        <div className="flex flex-col items-center max-sm:px-5">
          <h1 className="text-5xl font-semibold text-primary-orange_main max-sm:text-2xl">
            Welcome to CHAT-AI
          </h1>
          <p className="text-muted-foreground text-lg max-sm:text-sm text-center">
            A Website where you can chat with your own customized knowledge
            based chat-bot
          </p>
        </div>
        <div className="w-[800px] h-[500px] relative max-sm:hidden">
          <Image src="/assets/home-image.png" alt="home image" fill />
        </div>
        <div className="w-[300px] h-[600px] relative hidden max-sm:block">
          <Image src="/assets/mobile-home-image.png" alt="home image" fill />
        </div>
      </section>
    </main>
  );
}
