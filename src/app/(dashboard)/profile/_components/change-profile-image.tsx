'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Spinner from '@/components/loader/loader';
import { toast } from '@/components/ui/use-toast';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

type Props = {
  clerkId: string;
  imgUrl: string;
};

const ChangeProfileImage = ({ clerkId, imgUrl }: Props) => {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [imageUrl, setImageUrl] = useState(imgUrl);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);

        const url = URL.createObjectURL(uploadedFile);
        setImageUrl(url);
      }
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);

      if (file === null) {
        toast({
          title: 'Error ✖️✖️',
          description: 'Please select an image to upload',
          variant: 'destructive',
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', file!);
      await fetch('http://localhost:3000/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast({
          title: 'Error',
          description: error.errors[0].longMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <div className="relative w-[150px] h-[150px] rounded-full cursor-pointer max-sm:w-[100px] max-sm:h-[100px]">
            <Image
              src={imgUrl}
              alt="profile photo"
              fill
              className="rounded-full"
              onClick={() => setIsOpen((prev) => (prev = true))}
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Your profile Image</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center gap-5"
          >
            <div className="relative w-[150px] h-[200px]">
              <Image src={imageUrl} alt="profile" fill />
            </div>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
            />
            <DialogFooter className="flex flex-row gap-5">
              <Button
                type="submit"
                className="bg-primary-orange_main text-white hover:bg-primary-orange_hover"
              >
                {loading ? <Spinner /> : 'Continue'}
              </Button>
              <DialogClose onClick={() => setIsOpen((prev) => (prev = false))}>
                Close
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeProfileImage;
