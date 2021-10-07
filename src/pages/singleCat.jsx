import React from 'react';
import { useParams } from 'react-router-dom';

import { CatDetail } from 'domains/cats';

export const SingleCat = () => {
  const params = useParams();

  return <CatDetail catId={params.catId} />;
};
