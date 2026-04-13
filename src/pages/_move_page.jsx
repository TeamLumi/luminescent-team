import React from "react";
import Layout from "@theme/Layout";

import MovePageContent from '../components/MoveDex/MovePageContent';
import { GlobalState } from "../components/common/GlobalState";
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

export default function MovePage({ move2, move3, moveV, moveListV, moveList3, moveList2 }) {
  // required for webpack SSR
  if (typeof move2 === 'undefined' || typeof moveList2 === 'undefined') {
    return null;
  }

  return (
    <Layout>
      <LumiReactThemeProvider>
        <GlobalState>
          <MovePageContent
            move2={move2}
            move3={move3}
            moveV={moveV}
            movesListV={moveListV}
            movesList2={moveList2}
            movesList3={moveList3}
          />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};