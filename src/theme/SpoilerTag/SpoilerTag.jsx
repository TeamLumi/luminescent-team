import React from 'react';
import styles from './SpoilerTag.module.css';

export default function SpoilerTag(props) {
  return <span className={styles.spoiler}>{props.children}</span>;
}
