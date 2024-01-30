import React from 'react'
import styles from '@/styles/components/loading-overlay.module.scss'
const LoadingOverlay = () => {
  return (
    <div className={`${styles['loading']} ${styles['style-2']}`}><div className={`${styles['loading-wheel']}`}></div></div>
  )
}

export default LoadingOverlay