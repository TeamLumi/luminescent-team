import React from 'react';
import Layout from '@theme/Layout';

import MoveListPageContent from '../components/MoveDex/MoveListPageContent';
import { GlobalState } from '../components/common/GlobalState';

const MoveDexListPage = ({ movesList }) => {
  return(
    <Layout
      title="Move Dex"
      description="A Rom Hack for Pokémon Brilliant Diamond."
    >
      <GlobalState>
        <MoveListPageContent movesList={movesList}/>
      </GlobalState>
    </Layout>
  );
};

export default MoveDexListPage;
