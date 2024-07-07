export const combineDocs = (docs: Record<string, any>[]) => {
  return docs.map((doc: Record<string, any>) => doc.pageContent).join('\n\n');
};
