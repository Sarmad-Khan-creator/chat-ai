import { client } from '@/lib/prisma';
import slugify from 'slugify';
import { currentUser } from '@clerk/nextjs/server';
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { NextRequest, NextResponse } from 'next/server';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { revalidatePath, revalidateTag } from 'next/cache';
import { Pinecone } from '@pinecone-database/pinecone';
import { createApp } from '@/actions/app.action';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const title: string | null = data.get('title') as unknown as string;
  const index: string | null = data.get('index') as unknown as string;
  const template: string | null = data.get('template') as unknown as string;
  const file: File | null = data.get('file') as unknown as File;

  if (!title || !index || !template || !file) {
    return NextResponse.json({ success: false });
  }

  const pinecondeIndex = await pc.createIndex({
    name: index,
    dimension: 1536, // Replace with your model dimensions
    metric: 'euclidean', // Replace with your model metric
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1',
      },
    },
  });

  if (!pinecondeIndex) {
    return NextResponse.json({
      error:
        'Invalid Index name formate. Do not use spaces and special characters',
    });
  }

  const app = await createApp({
    title,
    template,
    index,
  });

  const loader = new WebPDFLoader(file, {
    splitPages: false,
  });
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ['\n\n', '\n', ' ', ''],
    chunkOverlap: 100,
  });

  const output = await splitter.createDocuments([docs[0].pageContent]);

  const pcIndex = pc.index(index);

  await PineconeStore.fromDocuments(
    output,
    new OpenAIEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    }),
    {
      pineconeIndex: pcIndex,
      maxConcurrency: 5,
    }
  );

  return NextResponse.json({ success: true });
}
