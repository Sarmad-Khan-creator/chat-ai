import { Skeleton } from '@/components/ui/skeleton';

const components = [1, 2, 3, 4, 5];
const Loading = () => {
  return (
    <div className="px-10 flex flex-row flex-wrap gap-x-4 gap-y-6 max-sm:flex-col max-sm:items-center">
      {components.map((component) => (
        <Skeleton
          key={component}
          className="w-[150px] h-[150px] bg-gray-400 rounded-md max-sm:w-[250px] max-sm:h-[250px]"
        />
      ))}
    </div>
  );
};

export default Loading;
