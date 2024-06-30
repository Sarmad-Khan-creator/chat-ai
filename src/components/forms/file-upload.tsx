'use client';
import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const FileUpload = () => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const url = URL.createObjectURL(event.currentTarget.files[0]);
    setFileUrl(url);

    localStorage.setItem('file', url);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = localStorage.getItem('file');
    setFileUrl(url as string);
  };
  return (
    <div className="flex flex-col gap-5 items-center">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Button
          type="button"
          className=""
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          Upload file
        </Button>
        <Label htmlFor="file">
          <Input
            ref={fileRef}
            id="file"
            name="file"
            type="file"
            onChange={onUpload}
            accept=".docx, application/pdf"
            className="hidden"
          />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FileUpload;
