'use client';

import { editApp } from '@/actions/app.action';
import { EditFormProps, editFormSchema } from '@/schemas/edit-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Spinner from '../loader/loader';

type Props = {
  name: string;
  template: string;
  appId: string;
};

const EditAppForm = ({ name, template, appId }: Props) => {
  //   const [editName, setEditName] = useState<string>(name);
  //   const [editTemplate, setEditTemplate] = useState<string>(template);
  const router = useRouter();

  const form = useForm<EditFormProps>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: name,
      template: template,
    },
  });

  const onSubmit = async (data: EditFormProps) => {
    try {
      const app = await editApp(appId, data.name, data.template);
      toast({
        title: 'Success',
        description: `Chat updated successfully`,
        variant: 'success',
      });

      router.back();
    } catch (error) {
      throw error;
    }
  };

  const isSubmitting = form.formState.isSubmitting;
  return (
    <div className="w-[600px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-xl">
            Change the behaviour of your chatbot by changing the template
          </h1>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="App Title"
                    className="border border-gray-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="template"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Template</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="App Title"
                    className="border border-gray-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-5 bg-primary-orange_main hover:bg-primary-orange_hover text-white"
          >
            {isSubmitting ? <Spinner /> : 'Continue'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditAppForm;
