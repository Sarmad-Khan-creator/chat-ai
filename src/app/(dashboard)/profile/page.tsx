import { currentUser } from '@clerk/nextjs/server';
import React from 'react';
import ChangeProfileImage from './_components/change-profile-image';
import { getUserByClerkId } from '@/actions/user.action';
import AppDetails from './_components/app-details';
import { getAllApps } from '@/actions/app.action';
import EditUserDetails from './_components/edit-user-details';

type Props = {};

const Profile = async ({}: Props) => {
  const clerkUser = await currentUser();
  const user = await getUserByClerkId();
  const apps = await getAllApps();
  return (
    <main className="px-10">
      <div className="flex flex-row gap-3 items-center">
        <ChangeProfileImage imgUrl={user?.imageUrl!} clerkId={clerkUser?.id!} />
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">
            {user?.fullname ? user?.fullname : 'N/A'}
          </h2>
          <p className="w-[300px]">{user?.bio ? user?.bio : 'N/A'}</p>
        </div>
        <EditUserDetails username={user?.fullname!} userBio={user?.bio!} />
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-5 mt-14">
        {apps.map((app) => (
          <AppDetails key={app.id} app={app} />
        ))}
      </div>
    </main>
  );
};

export default Profile;
