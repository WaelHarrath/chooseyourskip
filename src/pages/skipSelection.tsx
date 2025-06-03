import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SkipCard from '../components/skipCard';

type Skip = {
    id: number;
    size: number;
    hire_period_days: number;
    price_before_vat: number;
    vat: number;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
    postcode: string;
    forbidden: boolean;
};

const SkipSelection = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const cardRefs = useRef(new Map<number, HTMLDivElement | null>());
    useEffect(() => {
        axios
            .get(
                'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
            )
            .then((res) => setSkips(res.data))
            .catch(console.error);
    }, []);
    useEffect(() => {
        if (selectedId !== null) {
            const el = cardRefs.current.get(selectedId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [selectedId]);
    const handleSelect = (id: number) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    const selectedSkip = skips.find((skip) => skip.id === selectedId) || null;
    const totalPrice = selectedSkip
        ? (
              selectedSkip.price_before_vat *
              (1 + selectedSkip.vat / 100)
          ).toFixed(0)
        : null;

    const handleBack = () => setSelectedId(null);
    const handleContinue = () =>
        alert(`Continue with ${selectedSkip?.size} Yard Skip`);

    return (
        <div className='p-4 max-w-5xl mx-auto pb-32'>
            {' '}
            {/* padding bottom for sticky popup */}
            <h1 className='text-2xl font-bold mb-6'>Choose Your Skip Size</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {skips.map((skip) => {
                    // Create a callback ref function to update map on mount/unmount
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
                            cardRef={setRef} // pass callback ref here
                        />
                    );
                })}
            </div>
            {/* Sticky bottom popup */}
            {selectedSkip && (
                <div className='fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t border-gray-300 p-4 z-50'>
                    <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
                        {/* Disclaimer text */}
                        <p className='text-xs text-gray-600 flex-1 max-w-md'>
                            Imagery and information shown throughout this
                            website may not reflect the exact shape or size
                            specification, colours may vary, options and/or
                            accessories may be featured at additional cost.
                        </p>

                        {/* Skip details and price */}
                        <div className='flex items-center gap-6'>
                            <div className='font-semibold text-lg'>
                                {selectedSkip.size} Yard Skip
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

                        {/* Action buttons */}
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
                                className='py-2 px-5 rounded-lg bg-blue-600 text-black font-semibold 
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
