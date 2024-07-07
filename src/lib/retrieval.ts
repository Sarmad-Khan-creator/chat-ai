import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings, OpenAI } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { PromptTemplate } from '@langchain/core/prompts';
import {
  RunnableSequence,
  RunnablePassthrough,
} from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { combineDocs } from './combine-docs';
import { formatConvHistory } from './formate-conv-history';

export const retrieval = async (
  index: string,
  template: string,
  convHistory: string[],
  question: string
) => {
  if (question === '') {
    return;
  }
  const pinecone = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
  });

  const embedding = new OpenAIEmbeddings({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const llm = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const pineconeIndex = pinecone.index(index);

  const vectorStore = new PineconeStore(embedding, { pineconeIndex });

  const retriever = vectorStore.asRetriever();

  const standaloneQuestionTemplate = `Given some conversation history (if any) and a question,
    convert the quesiton to a standalone question. 
    conversation history: {conv_history}
    question: {question}
    standalone question:`;
  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate
  );

  const answerTemplate = `${template}
  context: {context}
  conversation history: {conv_history}
  question: {question}
  answer:
  `;
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  const standaloneQuestionChain = RunnableSequence.from([
    standaloneQuestionPrompt,
    llm,
    new StringOutputParser(),
  ]);

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    combineDocs,
  ]);

  const answerChain = RunnableSequence.from([
    answerPrompt,
    llm,
    new StringOutputParser(),
  ]);

  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_question: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_question }) => original_question.question,
      conv_history: ({ original_question }) => original_question.conv_history,
    },
    answerChain,
  ]);

  const response = await chain.invoke({
    question: question,
    conv_history: formatConvHistory(convHistory),
  });

  return response;
};
