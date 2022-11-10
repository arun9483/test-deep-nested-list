import React from 'react';

import { IList } from './types';

interface ListProps {
  list: IList;
  title: string;
}

const List: React.FC<ListProps> = ({ list, title }) => {
  return (
    <div className="list-container">
      <h3 id={title} aria-label={title}>
        <span>{title.slice(0, 4)}</span>
        <span>{title.slice(4)}</span>
      </h3>
      <ul aria-labelledby={title}>
        {Object.entries(list).map((entry, index) => {
          return (
            <li key={entry[0]} aria-label={entry[0]}>
              {typeof entry[1] === 'boolean' ? (
                <span>{entry[0]}</span>
              ) : (
                <List title={entry[0]} list={entry[1]} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
