# Choose Your Skip Size – React Frontend Challenge

This project is a frontend implementation of the "Choose Your Skip Size" page, as part of a technical challenge. It fetches available skip data from a provided API, displays them in an interactive UI, and allows users to select a skip for hire.

## Features

-   ✅ Redesigned and customized card layout for clarity and visual hierarchy.
-   ✅ Fully responsive and accessible skip selection UI.
-   ✅ Visual feedback for selected skips.
-   ✅ Conditional UI elements based on skip attributes (e.g., on-road, heavy waste).
-   ✅ Informative icons and labels for quick understanding.
-   ✅ Summary footer with selected skip and total price.
-   ✅ Smooth scroll into view on selection.
-   ✅ Skeleton loader placeholders shown while loading skip data to improve UX and indicate loading state.

## UI Customization

The original layout was enhanced with:

-   Tailwind CSS for consistent styling.
-   A redesigned **SkipCard** layout: improved visual structure, better spacing, and clearer UX hierarchy.
-   Added support for `✓ Selected` indicator badge.
-   Applied hover and selection effects (ring, scale, and shadow transitions).

## Images

The provided API did **not** include skip images. To maintain a complete visual experience, I included static image assets mapped to skip sizes inside the project under the `constants/images.ts` module.

## Testing & Development Notes

-   **`.env` file is intentionally committed** for testing and review purposes. In a real production environment, environment variables (such as API base URLs or keys) should be excluded using `.gitignore`.

## 📁 Project Structure

```bash
src/
├── components/
│   ├── SkipCard.tsx         # Individual skip card component
│   └── SkipSelection.tsx    # Main skip selection view
├── constants/
│   └── images.ts            # Static image mapping by skip size
├── hooks/
│   └── useSkipSelection.ts  # Custom hook for skip logic
├── types/
│   └── propsType.ts         # Type definitions for components
└── App.tsx                  # Entry point with routing or integration
```
