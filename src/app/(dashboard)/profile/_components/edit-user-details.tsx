'use client';
import { updateUserDetails } from '@/actions/user.action';
import Spinner from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { editUserDetailsSchema } from '@/schemas/edit-user-details';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  username: string;
  userBio: string;
};

const EditUserDetails = ({ username, userBio }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof editUserDetailsSchema>>({
    resolver: zodResolver(editUserDetailsSchema),
    defaultValues: {
      firstName: username.split(' ')[0],
      lastName: username.split(' ')[1],
      userBio: userBio,
    },
  });

  const onSubmit = async (values: z.infer<typeof editUserDetailsSchema>) => {
    try {
      await updateUserDetails(
        values.firstName,
        values.lastName,
        values.userBio
      );

      toast({
        title: 'Success ✅',
        description: 'User details updated successfully',
        variant: 'success',
      });
      
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Edit2Icon
            className="cursor-pointer max-sm:size-10"
            width={40}
            height={40}
            onClick={() => setIsOpen(true)}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Your Details</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-row gap-2">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Last name"
                          className="border border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Last name"
                          className="border border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="userBio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe yourself</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Your Short bio"
                        className="border border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-primary-orange_main hover:bg-primary-orange_hover text-white"
                >
                  {isSubmitting ? <Spinner /> : 'Continue'}
                </Button>
                <DialogClose onClick={() => setIsOpen(false)} className='max-sm:mb-5 bg-gray-300 px-5 py-2 rounded-md'>
                  Cancel
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserDetails;
