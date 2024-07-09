import { getAppById } from '@/actions/app.action';
import EditAppForm from '@/components/forms/edit-app-form';
import React from 'react';

type Props = {
  params: {
    appId: string;
  };
};

const Settings = async ({ params: { appId } }: Props) => {
  const app = await getAppById(appId);
  return (
    <div className="flex justify-center max-sm:mx-5">
      <EditAppForm name={app?.title!} template={app?.template!} appId={appId} />
    </div>
  );
};

export default Settings;
