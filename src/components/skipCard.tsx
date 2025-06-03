import { Ban, Truck, Weight } from 'lucide-react'; // optional icons
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

type Props = {
    skip: Skip;
    isSelected: boolean;
    onSelect: () => void;
    cardRef: React.Ref<HTMLDivElement>;
};
const images: Record<number, string> = {
    4: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg',
    6: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg',
    8: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg',
    10: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg',
    12: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg',
    14: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/14-yarder-skip.jpg',
    16: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/16-yarder-skip.jpg',
    20: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg',
    40: 'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg'
};
const SkipCard = ({ skip, isSelected, onSelect, cardRef }: Props) => {
    const totalPrice = (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(
        0
    );

    return (
        <div
            ref={cardRef}
            onClick={onSelect}
            className={`flex flex-col rounded-2xl overflow-hidden shadow-md border ${
                isSelected
                    ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50 shadow-lg scale-105 z-10'
                    : 'border-gray-200 hover:shadow-lg hover:scale-[1.02]'
            } transition hover:shadow-lg cursor-pointer`}
        >
            <div className='relative w-full h-44'>
                <img
                    src={images[skip.size]}
                    alt={`${skip.size} yard skip`}
                    className={`w-full h-full object-cover transition duration-300 ${
                        isSelected ? 'brightness-50' : 'brightness-100'
                    }`}
                />
                {isSelected && (
                    <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                        <span className='text-blue-600 text-2xl font-bold bg-blue-100 bg-opacity-70 rounded-lg px-4 py-2'>
                            Selected
                        </span>
                    </div>
                )}
            </div>

            <div className='p-4 flex-1 flex flex-col justify-between'>
                <div>
                    <h2 className='text-xl font-bold mb-1'>
                        {skip.size} Yard Skip
                    </h2>
                    <p className='text-sm text-gray-500 mb-3'>
                        Hire for {skip.hire_period_days} days
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
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

                <div className='mt-auto pt-3 border-t flex justify-between items-center'>
                    <span className='text-sm text-gray-400'>
                        Postcode: {skip.postcode}
                    </span>
                    <span className='text-lg font-bold text-blue-600'>
                        £{totalPrice}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SkipCard;
