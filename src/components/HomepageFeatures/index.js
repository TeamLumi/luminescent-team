import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Team Lumi',
    Svg: require('@site/static/img/TeamLumi.svg').default,
    description: (
      <>
        Just made possible by so many talented people.
      </>
    ),
  },
  {
    title: 'Luminescent',
    Svg: require('@site/static/img/LuminescentTitle.svg').default,
    description: (
      <>
        Pokemon Luminescent Platinum is an enhancement mod for Pokemon Brilliant Diamond (and eventually Shining Pearl)
        based heavily on Renegade Platinum by Drayano.
      </>
    ),
  },
  {
    title: 'Eternatus Approved',
    Svg: require('@site/static/img/EternatusThumbsUp.svg').default,
    description: (
      <>
        
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
