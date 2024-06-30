import FileUpload from '@/components/forms/file-upload';
import { Button } from '@/components/ui/button';
import { SignedIn, UserButton } from '@clerk/nextjs';
import Navbar from './_components/navbar';

export default function Home() {
  return (
    <main className="h-screen">
      <Navbar />
    </main>
  );
}
