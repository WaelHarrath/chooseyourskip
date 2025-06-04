import SkipCard from '../components/skipCard';
import SkipCardLoader from '../components/skipCardLoader';
import { images } from '../constants/images';

import useSkipSelection from './useSkipSelection';

const SkipSelection = () => {
    const {
        totalPrice,
        handleBack,
        handleContinue,
        handleSelect,
        skips,
        selectedId,
        cardRefs,
        selectedSkip,
        isLoading
    } = useSkipSelection();

    return (
        <div className='p-4 max-w-5xl mx-auto pb-32'>
            <h1 className='text-2xl font-bold mb-6'>Choose Your Skip Size</h1>
            <p className='text-gray-600 mb-6'>
                Select the skip size that best suits your needs
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {isLoading
                    ? Array(6)
                          .fill(0)
                          .map((_, i) => <SkipCardLoader key={i} />)
                    : skips.map((skip) => {
                          const setRef = (el: HTMLDivElement | null) => {
                              if (el) {
                                  cardRefs.current.set(skip.id, el);
                              } else {
                                  cardRefs.current.delete(skip.id);
                              }
                          };

                          return (
                              <SkipCard
                                  key={skip.id}
                                  skip={skip}
                                  isSelected={selectedId === skip.id}
                                  onSelect={() => handleSelect(skip.id)}
                                  cardRef={setRef}
                                  loading={isLoading}
                              />
                          );
                      })}
            </div>

            {selectedSkip && (
                <div className='fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t border-gray-300 p-4 z-50'>
                    <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <p className='text-xs text-gray-600 flex-1 max-w-md'>
                            Imagery and information shown throughout this
                            website may not reflect the exact shape or size
                            specification, colours may vary, options and/or
                            accessories may be featured at additional cost.
                        </p>

                        <div className='flex items-center gap-6'>
                            <div className='flex items-center gap-2'>
                                <img
                                    src={images[selectedSkip.size]}
                                    alt={`${selectedSkip.size} yard skip`}
                                    className='w-14 h-10 object-cover object-center rounded-md'
                                />
                                <div className='font-semibold text-base sm:text-lg'>
                                    <b>{selectedSkip.size}</b> Yard Skip
                                </div>
                            </div>

                            <div className='relative'>
                                <div className='text-blue-700 font-extrabold text-xl'>
                                    £{totalPrice}
                                </div>
                                <div className='text-blue-600 text-xs text-right'>
                                    {selectedSkip.hire_period_days} day hire
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3'>
                            <button
                                onClick={handleBack}
                                className='py-2 px-5 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 
               hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 
               transition duration-200 text-sm font-medium'
                            >
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                className='py-2 px-5 rounded-lg bg-blue-600 text-white font-semibold 
               hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200 text-sm'
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkipSelection;
