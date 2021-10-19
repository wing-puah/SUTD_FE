import React from 'react';

import { useAuth } from 'domains/auth';

import { useCatDetail } from '../hooks/use-cats';
import { useFavorites } from '../hooks/use-favorites';
import { CatItem } from './cat-item';

export const CatDetail = ({ catId }) => {
  const { toggleFavorites, allFavoriteId } = useFavorites();
  const { status } = useAuth();
  const { data: catDetail, isLoading: isLoadingDetail } = useCatDetail(catId);

  const _onToggleLike = React.useMemo(() => {
    if (status === 'authenticated') {
      return toggleFavorites;
    }
    return null;
  }, [status]);

  if (!catDetail && isLoadingDetail) {
    return <div className="p-3">Loading ...</div>;
  }

  if (!catDetail) {
    return <div className="p-3">Issue with retrieving data</div>;
  }

  const _liked = allFavoriteId.indexOf(catDetail.id) > -1;

  return (
    <div className="p-5">
      <CatItem
        data={catDetail}
        key={catDetail.id}
        onClick={null}
        onToggleLike={_onToggleLike}
        liked={_liked}
      />
    </div>
  );
};
