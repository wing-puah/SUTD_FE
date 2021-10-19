import { CatItem } from './cat-item';

export const CatListItems = ({ isLoading, data, onClick, onToggleLike, favorites }) => {
  if (isLoading && !data) {
    return <div className="p-3">Loading ...</div>;
  }

  if (!data || (data && data.length === 0)) {
    return <>There is no cats</>;
  }

  const favList = favorites.length > 0 ? favorites.map((el) => el.id) : [];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((singleData) => {
        const _liked = favList.indexOf(singleData.id) > -1;
        return (
          <CatItem
            data={singleData}
            key={singleData.id}
            onClick={onClick}
            onToggleLike={onToggleLike}
            liked={_liked}
          />
        );
      })}
    </div>
  );
};
