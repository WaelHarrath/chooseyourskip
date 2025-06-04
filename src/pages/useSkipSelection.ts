import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import type { Skip } from '../types/skipType';

const useSkipSelection = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const cardRefs = useRef(new Map<number, HTMLDivElement | null>());
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL)
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

    return {
        totalPrice,
        handleBack,
        handleContinue,
        handleSelect,
        skips,
        selectedId,
        cardRefs,
        selectedSkip
    };
};

export default useSkipSelection;
