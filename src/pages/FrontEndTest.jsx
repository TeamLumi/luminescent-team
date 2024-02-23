import React from 'react';
import Layout from '@theme/Layout';
import { GlobalState } from '../components/common/GlobalState';
import ItemTablePage from '../components/FrontEndTest/ItemTable';

export default function FrontEndTest() {
  return (
    <Layout>
      <GlobalState>
        <ItemTablePage />
      </GlobalState>
    </Layout>
  );
};
