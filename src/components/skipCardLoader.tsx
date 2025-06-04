const SkipCardLoader = () => {
    return (
        <div
            className='flex flex-col rounded-2xl overflow-hidden shadow-md border border-gray-200
      animate-pulse min-w-[280px] w-full h-full transition'
        >
            <div className='relative w-full h-44 bg-gray-300' />

            <div className='p-4 flex-1 flex flex-col justify-between'>
                <div>
                    <div className='h-5 bg-gray-300 rounded w-1/2 mb-2' />
                    <div className='h-4 bg-gray-200 rounded w-1/3 mb-3' />

                    <div className='flex gap-2 mb-4'>
                        <div className='h-6 w-24 bg-gray-200 rounded-full' />
                        <div className='h-6 w-28 bg-gray-200 rounded-full' />
                    </div>

                    <div className='h-4 w-2/3 bg-gray-200 rounded' />
                </div>

                <div className='mt-auto pt-3 border-t flex justify-between items-center'>
                    <div className='h-4 w-20 bg-gray-200 rounded' />
                    <div className='h-6 w-10 bg-gray-300 rounded' />
                </div>
            </div>
        </div>
    );
};

export default SkipCardLoader;
