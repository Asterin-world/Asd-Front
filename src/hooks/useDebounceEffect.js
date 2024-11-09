import { useEffect, useRef } from 'react';

/**
 * Custom hook for debounced effects.
 * @param {Function} effect - The effect function to be executed.
 * @param {Array} dependencies - Dependency array for the effect.
 * @param {number} delay - Delay in milliseconds for the debounce.
 */
const useDebouncedEffect = (effect, dependencies, delay) => {
  // Store the latest effect function in a ref to avoid re-creating the function
  const effectRef = useRef(effect);

  // Store a stable reference for dependencies using a serialized version
  const previousDependenciesRef = useRef();

  // Update effectRef.current whenever the effect function changes
  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    // Serialize the dependencies array into a JSON string to create a stable reference
    const serializedDependencies = JSON.stringify(dependencies);

    // Compare the serialized dependencies to detect changes
    if (previousDependenciesRef.current !== serializedDependencies) {
      previousDependenciesRef.current = serializedDependencies;

      // Call the debounced effect function with the latest dependencies
      const handler = setTimeout(() => {
        if (typeof effectRef.current === 'function') {
          effectRef.current();
        }
      }, delay);

      // Cleanup the timeout on component unmount or dependency change
      return () => clearTimeout(handler);
    }
  }, [delay, dependencies]); // Only include `delay` and `dependencies` in the dependency array
};

export { useDebouncedEffect };
