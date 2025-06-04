import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import type { Skip } from '../types/skipType';

const useSkipSelection = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const cardRefs = useRef(new Map<number, HTMLDivElement | null>());
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL)
            .then((res) => {
                setSkips(res.data);
                setIsLoading(false);
            })
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
    const handleContinue = () => {
        if (selectedSkip) {
            toast.success(`Continue with ${selectedSkip.size} Yard Skip`);
        } else {
            toast.error('Please select a skip to continue.');
        }
    };
    return {
        totalPrice,
        handleBack,
        handleContinue,
        handleSelect,
        skips,
        selectedId,
        cardRefs,
        selectedSkip,
        isLoading
    };
};

export default useSkipSelection;
