import { createSelector } from 'reselect';
import { IStore } from '../store.interface';

export const selectAttributesLoaded = createSelector(
  (state: IStore) => state.properties.attributesLoaded,
  (state: IStore) => state.properties.recommendedAttributesLoaded,
  (attributesLoaded, recommendedAttributesLoaded) => attributesLoaded && recommendedAttributesLoaded
);
