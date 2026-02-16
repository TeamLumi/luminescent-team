import * as React from 'react';
import { Typography } from '@mui/material';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { getPokemonMonsNoAndFormNoFromPokemonId, getPokemonName } from '../../utils/dex/name';
import { useGlobalState } from '../common/GlobalState';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { getEdgeLabel } from '../../utils/dex/evolutionGraphUtils';
import { getPokemonImageFilename } from '../../core/pokemonFormSelector';
import { getPokemonIdFromMonsNoAndForm } from '../../utils/dex/functions';

const MILCERY_MONSNO = 868;
const ALCREMIE_MONSNO = 869;

class EvolutionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[EvolutionGraph] Render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <Typography variant="h6" sx={{ margin: 'auto', textAlign: 'center' }}>
            Evolutions
          </Typography>
          <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
            <span className="col col-12">
              <Typography variant="h6" sx={{ margin: 'auto' }}>
                Evolution data unavailable
              </Typography>
            </span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function EvolutionGraph({ evolutionTree }) {
  const [globalState] = useGlobalState();

  if (!evolutionTree || !evolutionTree.pokemonId) {
    return (
      <div className="container">
        <Typography variant="h6" sx={{ margin: 'auto', textAlign: 'center' }}>
          Evolutions
        </Typography>
        <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
          <span className="col col-12">
            <Typography variant="h6" sx={{ margin: 'auto' }}>
              Evolution data unavailable
            </Typography>
          </span>
        </div>
      </div>
    );
  }

  const [monsNo] = getPokemonMonsNoAndFormNoFromPokemonId(evolutionTree.pokemonId, globalState.mode);

  // Special case: Alcremie
  if (monsNo === MILCERY_MONSNO || monsNo === ALCREMIE_MONSNO) {
    return (
      <div className="container">
        <Typography variant="h6" sx={{ margin: 'auto', textAlign: 'center' }}>
          Evolutions
        </Typography>
        <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
          <span className="col col-12">
            <Typography variant="h6" sx={{ margin: 'auto' }}>
              <Link to="/docs/special-evolutions#alcremie">Alcremie Evolutions</Link>
            </Typography>
          </span>
        </div>
      </div>
    );
  }

  // No evolution
  if (!evolutionTree.evolvesInto || evolutionTree.evolvesInto.length === 0) {
    return (
      <div className="container">
        <Typography variant="h6" sx={{ margin: 'auto', textAlign: 'center' }}>
          Evolutions
        </Typography>
        <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
          <span className="col col-12">
            <Typography variant="h6" sx={{ margin: 'auto' }}>
              Does Not Evolve
            </Typography>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Typography variant="h6" className={styles.evolutionHeader}>
        Evolutions
      </Typography>
      <EvolutionErrorBoundary>
        <EvolutionChainCards evolutionTree={evolutionTree} mode={globalState.mode} />
      </EvolutionErrorBoundary>
    </div>
  );
}

function EvolutionChainCards({ evolutionTree, mode }) {
  // Collect all root-to-leaf paths so each card shows one full chain
  const chains = React.useMemo(() => {
    function buildNodeData(node, parentPokemonId) {
      const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(node.pokemonId, mode);
      const pokemonId = getPokemonIdFromMonsNoAndForm(monsNo, formNo, mode);
      const name = getPokemonName(pokemonId, mode) || `Pokemon ${monsNo}`;
      const imagePath = `/img/pkm/${getPokemonImageFilename(monsNo, formNo)}`;
      const linkPath = formNo === 0 ? `${monsNo}` : `${monsNo}_${formNo}`;

      let edgeInfo = null;
      if (node.evolutionDetails) {
        const { methodIds, methodParameters, levels } = node.evolutionDetails;
        if (methodIds && methodIds[0] !== -1) {
          edgeInfo = getEdgeLabel(methodIds, methodParameters, levels, parentPokemonId, mode);
        }
      }

      return { monsNo, formNo, name, imagePath, linkPath, edgeInfo, pokemonId: node.pokemonId };
    }

    const paths = [];
    const visited = new Set();

    function traverse(node, currentPath, parentPokemonId) {
      if (visited.has(node.pokemonId)) return;
      visited.add(node.pokemonId);

      const nodeData = buildNodeData(node, parentPokemonId);
      const path = [...currentPath, nodeData];

      if (!node.evolvesInto || node.evolvesInto.length === 0) {
        paths.push(path);
        return;
      }

      for (const child of node.evolvesInto) {
        const { methodIds } = child.evolutionDetails || {};
        if (!methodIds || methodIds[0] === -1) continue;
        traverse(child, path, node.pokemonId);
      }
    }

    traverse(evolutionTree, [], evolutionTree.pokemonId);
    paths.sort((a, b) => {
      const lastA = a[a.length - 1];
      const lastB = b[b.length - 1];
      return lastA.monsNo - lastB.monsNo || lastA.formNo - lastB.formNo;
    });
    return paths;
  }, [evolutionTree.pokemonId, mode]);

  return (
    <div className={[styles.evolutionCardsContainer, chains.length > 4 && styles.twoColumn].filter(Boolean).join(' ')}>
      {chains.map((chain) => (
        <div
          key={chain.map(n => `${n.monsNo}-${n.formNo}`).join('_')}
          className={styles.evolutionChainCard}
          role="group"
          aria-label={buildChainAltText(chain) || `Evolution chain: ${chain.map(n => n.name).join(' to ')}`}
        >
          {chain.map((node, nodeIndex) => (
            <React.Fragment key={`${node.monsNo}-${node.formNo}`}>
              {nodeIndex > 0 && node.edgeInfo && (
                <div className={styles.chainArrow}>
                  {node.edgeInfo.methods && node.edgeInfo.methods.length > 1 ? (
                    <>
                      <MethodDisplay method={node.edgeInfo.methods[0]} />
                      <div className={styles.chainArrowWithOr}>
                        <div className={styles.chainArrowIcon} />
                        <span className={styles.chainArrowOr}>OR</span>
                      </div>
                      {node.edgeInfo.methods.slice(1).map((method, idx) => (
                        <MethodDisplay key={`${idx}-${method.label}`} method={method} />
                      ))}
                    </>
                  ) : (
                    <>
                      {node.edgeInfo.icons && node.edgeInfo.icons.length > 0 && (
                        <div className={styles.chainArrowIcons}>
                          {node.edgeInfo.icons.map((iconSrc, idx) => (
                            <ImageWithFallback
                              key={`${idx}-${iconSrc}`}
                              src={iconSrc}
                              fallbackSrc="/img/pkm/pm0000_00_00_00_L.webp"
                              alt=""
                              className={styles.chainArrowIconImg}
                            />
                          ))}
                        </div>
                      )}
                      <div className={styles.chainArrowIcon} />
                      {node.edgeInfo.label && (
                        <span className={styles.chainArrowLabel}>{node.edgeInfo.label}</span>
                      )}
                    </>
                  )}
                </div>
              )}
              <ChainNode node={node} />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

function formatMethodForAlt(text) {
  if (!text) return 'unknown method';
  // "Level 16" → "at Level 16"
  if (/^Level\b/i.test(text)) return `at ${text}`;
  // "Use Ice Stone" → "using a Ice Stone" etc.
  if (/^Use\b/i.test(text)) return text.replace(/^Use\b/i, 'using a');
  return `via ${text}`;
}

function extractGender(text) {
  if (!text) return { gender: null, rest: text };
  const match = text.match(/\b(Male|Female)\b/i);
  if (!match) return { gender: null, rest: text };
  const rest = text
    .replace(match[0], '')
    .replace(/[&,]+\s*$/, '')
    .replace(/\s*[&,]+\s*/, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return { gender: match[1], rest };
}

function buildChainAltText(chain) {
  const parts = [];
  for (let i = 1; i < chain.length; i++) {
    const prev = chain[i - 1];
    const curr = chain[i];
    if (!curr.edgeInfo) continue;
    const rawLabel = curr.edgeInfo.methods && curr.edgeInfo.methods.length > 1
      ? curr.edgeInfo.methods.map(m => m.label).join('|||')
      : curr.edgeInfo.label;
    const { gender, rest } = extractGender(rawLabel);
    const prevName = gender ? `${gender} ${prev.name}` : prev.name;
    const method = rest.includes('|||')
      ? rest.split('|||').map(m => formatMethodForAlt(m)).join(' or ')
      : formatMethodForAlt(rest);
    parts.push(`${prevName} evolves into ${curr.name} ${method}`);
  }
  return parts.join(', ');
}

function MethodDisplay({ method }) {
  return (
    <div className={styles.chainMethodGroup}>
      {method.icons && method.icons.length > 0 && (
        <div className={styles.chainArrowIcons}>
          {method.icons.map((iconSrc, idx) => (
            <ImageWithFallback
              key={`${idx}-${iconSrc}`}
              src={iconSrc}
              fallbackSrc="/img/pkm/pm0000_00_00_00_L.webp"
              alt=""
              className={styles.chainArrowIconImg}
            />
          ))}
        </div>
      )}
      {method.label && (
        <span className={styles.chainArrowLabel}>{method.label}</span>
      )}
    </div>
  );
}

function ChainNode({ node }) {
  const linkTo = useBaseUrl(`/pokedex/${node.linkPath}`);

  return (
    <Link to={linkTo} className={styles.chainNode}>
      <ImageWithFallback
        src={node.imagePath}
        fallbackSrc="/img/pkm/pm0000_00_00_00_L.webp"
        alt=""
        title={node.name}
        className={styles.chainNodeSprite}
      />
      <span className={styles.chainNodeName}>{node.name}</span>
    </Link>
  );
}
