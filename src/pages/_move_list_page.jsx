import React from 'react';
import Layout from '@theme/Layout';

import MoveListPageContent from '../components/MoveDex/MoveListPageContent';

const MoveDexListPage = ({ movesList }) => {
  return(
    <Layout
      title="Move Dex"
      description="A Rom Hack for Pokémon Brilliant Diamond."
    >
      <MoveListPageContent movesList={movesList}/>
    </Layout>
  );
};

export default MoveDexListPage;
