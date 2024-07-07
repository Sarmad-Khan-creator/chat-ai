'use client';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { deleteApp } from '@/actions/app.action';
import Spinner from '@/components/loader/loader';
import { toast } from '@/components/ui/use-toast';

type Props = {
  appId: string;
  index: string;
};

const DeleteApp = ({ appId, index }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const deleteAppById = async () => {
    setLoading(true);
    try {
      const deletedApp = await deleteApp(appId, index);
      toast({
        title: 'Success ✅',
        description: `App ${deletedApp.title} deleted successfully`,
        variant: 'success',
      });
      setLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete this app?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your app
            and its corresponding chats.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-orange_main hover:bg-primary-orange_hover text-white"
            onClick={deleteAppById}
          >
            {loading ? <Spinner /> : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteApp;
