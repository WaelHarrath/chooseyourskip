import { Ban, Truck, Weight } from 'lucide-react'; // optional icons
import { images } from '../constants/images';
import type { Props } from '../types/propsType';

const SkipCard = ({ skip, isSelected, onSelect, cardRef }: Props) => {
    const totalPrice = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(
        0
    );

    return (
        <div
            ref={cardRef}
            onClick={onSelect}
            className={`flex w-full flex-col sm:flex-row rounded-2xl overflow-hidden shadow-md border cursor-pointer transition
                ${
                    isSelected
                        ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50 shadow-lg scale-105 z-10'
                        : 'border-gray-200 hover:shadow-lg hover:scale-[1.02]'
                }
            `}
            style={{ minHeight: '180px' }} // consistent height
        >
            {/* Image container */}
            <div className='w-full sm:w-2/5 relative flex-shrink-0'>
                <img
                    src={images[skip.size]}
                    alt={`${skip.size} yard skip`}
                    className={`w-full h-full object-cover transition duration-300 ${
                        isSelected ? 'brightness-70' : 'brightness-100'
                    }`}
                />
                {isSelected && (
                    <div className='absolute top-2 left-2 sm:left-2 right-auto pointer-events-none'>
                        <span className='text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full shadow-md'>
                            ✓ Selected
                        </span>
                    </div>
                )}
            </div>

    
            <div className='w-full sm:w-3/5 p-6 flex flex-col justify-between'>
                <div>
                    <h2 className='text-xl font-bold mb-2'>
                        {skip.size} Yard Skip
                    </h2>
                    <p className='text-sm text-gray-500 mb-4'>
                        Hire for {skip.hire_period_days} days
                    </p>

                  <div className="badges-container px-4 sm:px-0 mt-3 mb-3 pt-2 flex flex-wrap gap-3 justify-center sm:justify-start items-center w-full">
                        {skip.allowed_on_road ? (
                            <span className='flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700'>
                                <Truck size={14} /> On Road
                            </span>
                        ) : (
                            <span className='flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600'>
                                <Ban size={14} /> No Road Placement
                            </span>
                        )}

                        {skip.allows_heavy_waste ? (
                            <span className='flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700'>
                                <Weight size={14} /> Heavy Waste OK
                            </span>
                        ) : (
                            <span className='flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600'>
                                <Ban size={14} /> Light Waste Only
                            </span>
                        )}
                    </div>
                    {skip.forbidden && (
                        <p className='text-sm text-red-600 font-medium mt-1'>
                            ⚠️ Not currently available
                        </p>
                    )}
                </div>

                <div className='mt-auto pt-4 border-t flex justify-between items-center'>
                    <span className='text-sm text-gray-400 whitespace-nowrap'>
                        Postcode: {skip.postcode}
                    </span>
                    <span className='text-xl font-bold text-blue-600'>
                        £{totalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SkipCard;
