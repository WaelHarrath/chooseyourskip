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
                <footer className='fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl border-t border-gray-200 rounded-xl z-50 w-[calc(100%-2rem)] max-w-7xl px-6 py-5'>
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                        <p className='text-xs text-gray-600 sm:max-w-md'>
                            Imagery and information shown throughout this
                            website may not reflect the exact shape or size
                            specification, colours may vary, options and/or
                            accessories may be featured at additional cost.
                        </p>

                        <div className='flex flex-col sm:flex-row items-center gap-6 flex-1 justify-center'>
                            <div className='flex items-center gap-4 min-w-0'>
                                <img
                                    src={images[selectedSkip.size]}
                                    alt={`${selectedSkip.size} yard skip`}
                                    className='w-24 h-16 object-cover rounded-md border border-gray-200'
                                />
                                <div className='min-w-0'>
                                    <div className='text-base sm:text-lg font-semibold text-gray-900 truncate'>
                                        {selectedSkip.size} Yard Skip
                                    </div>
                                    <small className='text-gray-500'>
                                        Hire Period:{' '}
                                        {selectedSkip.hire_period_days} days
                                    </small>
                                </div>
                            </div>

                            <div className='text-right min-w-[100px]'>
                                <div className='text-2xl sm:text-3xl font-bold text-blue-600'>
                                    £{totalPrice}
                                </div>
                                <small className='text-gray-500'>
                                    VAT included
                                </small>
                            </div>
                        </div>

                        <div className='flex gap-3 shrink-0'>
                            <button
                                onClick={handleBack}
                                className='px-5 py-2 border border-gray-300 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 hover:shadow-md transition text-sm font-medium'
                            >
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                className='px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-lg transition text-sm'
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default SkipSelection;
