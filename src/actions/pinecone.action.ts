"use server";
import { pc } from "@/lib/pinecone";
import { client } from "@/lib/prisma";
import slugify from "slugify";
import { currentUser } from "@clerk/nextjs/server";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export type CreateAppProps = {
  title: string;
  index: string;
  template: string;
  blob: string | undefined;
};

export const addApp = async ({
  index,
  title,
  template,
  blob,
}: CreateAppProps) => {
  const clerkUser = await currentUser();

  const user = await client.user.findFirst({
    where: {
      clerkId: clerkUser?.id,
    },
  });
    const app = await client.app.create({
      data: {
        slug: slugify(title, {
          replacement: "-",
          lower: true,
          trim: true,
        }),
        title,
        template,
        index,
        userId: user?.id,
      },
    });
    const createdIndex = await pc.createIndex({
      name: index,
      dimension: 1536, // Replace with your model dimensions
      metric: "euclidean", // Replace with your model metric
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });

  const stringToBlob = new Blob([blob!], { type: "application/pdf" });

  const loader = new WebPDFLoader(stringToBlob, {
    splitPages: false,
  });
  const docs = await loader.load();

  docs.map((doc) => console.log("DOCS: ", doc));

  const pcIndex = pc.index(index);

  await PineconeStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
    }),
    {
      pineconeIndex: pcIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    }
  );
};
