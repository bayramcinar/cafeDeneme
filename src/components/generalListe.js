import React, { useEffect } from 'react';
import Liste from './liste';

function GeneralList({ categoryID }) {
  useEffect(() => {
  }, [categoryID]);

  return (
    <Liste categoryID={categoryID} />
  );
}

export default GeneralList;
