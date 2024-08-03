import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PokemonAbilities } from './PokemonAbilities';
import { GlobalState } from '../common/GlobalState';

describe('Pokemon Abilities', () => {
  test('all three are the same', () => {
    const name = 'Blaze';

    render(
      <GlobalState>
        <div data-testid="abilities">
          <PokemonAbilities abilityName1={name} abilityName2={name} abilityNameHidden={name} />
        </div>
      </GlobalState>
    );

    expect(screen.queryByTestId('abilities')).toHaveTextContent(/^Blaze$/);
  });

  test('ability1 same as ability2, but hidden ability is different', () => {
    const name1 = 'Blaze';
    const name2 = 'Levitate';

    render(
      <GlobalState>
        <div data-testid="abilities">
          <PokemonAbilities abilityName1={name1} abilityName2={name1} abilityNameHidden={name2} />
        </div>
      </GlobalState>
    );

    expect(screen.queryByTestId('abilities')).toHaveTextContent(/^Blaze,Levitate \(H\)$/);
  });

  test('ability1 same as hidden ability', () => {
    const name1 = 'Blaze';
    const name2 = 'Shield Dust';

    render(
      <GlobalState>
        <div data-testid="abilities">
          <PokemonAbilities abilityName1={name1} abilityName2={name2} abilityNameHidden={name1} />
        </div>
      </GlobalState>
    );

    expect(screen.queryByTestId('abilities')).toHaveTextContent(/^Blaze,Shield Dust$/);
  });

  test('ability2 same as hidden ability', () => {
    const name1 = 'Levitate';
    const name2 = 'Shield Dust';

    render(
      <GlobalState>
        <div data-testid="abilities">
          <PokemonAbilities abilityName1={name2} abilityName2={name1} abilityNameHidden={name2} />
        </div>
      </GlobalState>
    );

    expect(screen.queryByTestId('abilities')).toHaveTextContent(/^Shield Dust,Levitate$/);
  });

  test('all abilities are different', () => {
    const name1 = 'Blaze';
    const name2 = 'Levitate';
    const name3 = 'Shield Dust';

    render(
      <GlobalState>
        <div data-testid="abilities">
          <PokemonAbilities abilityName1={name1} abilityName2={name2} abilityNameHidden={name3} />
        </div>
      </GlobalState>
    );

    expect(screen.queryByTestId('abilities')).toHaveTextContent(/^Blaze,Levitate,Shield Dust \(H\)$/);
  });
});
