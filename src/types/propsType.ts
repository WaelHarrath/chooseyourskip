import type { Skip } from './skipType';

export type Props = {
    skip: Skip;
    isSelected: boolean;
    onSelect: () => void;
    cardRef: React.Ref<HTMLDivElement>;
    loading?: boolean;
};
