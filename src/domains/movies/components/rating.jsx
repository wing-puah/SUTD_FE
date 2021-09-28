import React from 'react';

const starColor = {
  primary: 'text-gray-400',
  selected: 'text-blue-500',
};

export const Star = ({ variant = 'primary' }) => (
  <svg
    className={`block h-8 w-8 ${starColor[variant]}`}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

export const Rating = ({ maxValue, value, onChange, name, ...restProps }) => {
  const _onChange = (newRating) => {
    onChange({ target: { value: newRating, name } });
  };

  return (
    <div className="flex">
      {Array.from({ length: maxValue }, (_, i) => {
        if (onChange) {
          return (
            <button type="button" key={i} onClick={() => _onChange(i + 1)} {...restProps}>
              <Star variant={i < value ? 'selected' : 'primary'} />
            </button>
          );
        }

        return <Star variant={i < value ? 'selected' : 'primary'} key={i} />;
      })}
    </div>
  );
};
