import { Skeleton } from '@/components/ui/skeleton';

export const items = [1, 2, 3];

const Loading = () => {
  return (
    <div className="px-10 max-sm:px-5">
      <div className="flex flex-row gap-3 items-start">
        <Skeleton className="w-[150px] h-[150px] rounded-full bg-gray-400 max-sm:w-[100px] max-sm:h-[100px]" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-[40px] w-[150px] bg-gray-400" />

          <Skeleton className="w-[230px] h-[70px] bg-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-5 mt-14 max-sm:grid-cols-1">
        {items.map((item) => (
          <Skeleton
            key={item}
            className="w-auto h-[100px] rounded-md bg-gray-400"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
