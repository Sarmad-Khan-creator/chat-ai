import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const loadingChat = [1, 2, 3, 4, 5, 6];
const Loading = () => {
  return (
    <div className="w-full flex flex-col justify-between h-screen max-h-screen">
      <div className="w-full max-h-[70vh] overflow-y-auto px-16 flex flex-col gap-4">
        {loadingChat.map((load) => {
          return (
            <Skeleton
              key={load}
              className={`w-[700px] h-[250px] rounded-md bg-gray-400 ${
                load % 2 === 0 && 'self-end'
              }
                ${load % 2 !== 0 && 'self-start'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
