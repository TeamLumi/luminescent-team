import React from 'react';
import Layout from '@theme/Layout';

import MoveListPageContent from '../components/MoveDex/MoveListPageContent';
import { GlobalState } from '../components/common/GlobalState';
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

const MoveDexListPage = ({ movesListV, movesList3, movesList2 }) => {
  return(
    <Layout
      title="Move Dex"
      description="A Rom Hack for Pokémon Brilliant Diamond."
    >
      <LumiReactThemeProvider>
        <GlobalState>
          <MoveListPageContent movesListV={movesListV} movesList3={movesList3} movesList2={movesList2} />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};

export default MoveDexListPage;
