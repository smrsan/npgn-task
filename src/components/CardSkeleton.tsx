const CardSkeleton = () => {
  return (
    <div className="shadow rounded-md overflow-hidden max-w-2xl select-none">
      <div className="w-full bg-gray-300 aspect-square" />
      <div className="p-2">
        <div className="flex flex-row">
          <div className="text-lg grow">
            <span className="bg-gray-300 text-gray-300">Tiger Nixon</span>
          </div>
          <div className="text-lg">
            <span className="bg-gray-300 text-gray-300">61</span>
          </div>
        </div>
        <div>
          <span className="bg-gray-300 text-gray-300">$320,800</span>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
