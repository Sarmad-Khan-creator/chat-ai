'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { PlusCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addAppProps, addAppSchema } from '@/schemas/add-app-schema';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Spinner from '../loader/loader';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { headers } from 'next/headers';

type Props = {};

const AddApp = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<addAppProps>({
    resolver: zodResolver(addAppSchema),
    defaultValues: {
      title: '',
      template: '',
      index: '',
    },
  });

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files![0];

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const onSubmit = async ({ index, title, template }: addAppProps) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('index', index);
      formData.append('template', template);
      if (file) {
        formData.append('file', file);
      }

      const app = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pinecone`, {
        method: 'POST',
        body: formData,
        headers: {
          ...headers(),
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await app.json();
      if (response.error) {
        toast({
          title: 'Error ✖️',
          description: response.error,
          variant: 'destructive',
        });
      }

      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Error ✖️',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-[150px] h-[150px] rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 max-sm:w-[250px] max-sm:h-[250px]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <PlusCircle size={50} className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add app</DialogTitle>
          <DialogDescription>
            Add your app to start chatting with your custom knowledge chat bot
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-2 w-full">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>App Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your first app"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="index"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Index name</FormLabel>
                    <FormControl>
                      <Input placeholder="Index name" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="template"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Template</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="train your chat bot with your custom template"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="file"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add your Document file</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={onUpload}
                      accept="application/pdf"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <Button
                type="submit"
                className="bg-primary-orange_main hover:bg-primary-orange_hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : 'Continue'}
              </Button>
              <DialogClose
                onClick={() => {
                  setIsOpen(false);
                }}
                disabled={isSubmitting}
              >
                Close
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddApp;
