import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function SSOCallback() {
  // Handle the redirect flow by rendering the
  // prebuilt AuthenticateWithRedirectCallback component.
  // This is the final step in the custom OAuth flow.
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" size={60} />
        <p>You are being redirected to home page...</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </>
  );
}
