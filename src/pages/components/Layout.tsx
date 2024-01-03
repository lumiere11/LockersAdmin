import styles from '@/styles/components/layout.module.scss';
import Head from 'next/head';
import React from 'react';

interface Props {
	title: string;
	pageDescription: string;
	pageKeywords: string;
	children: React.ReactNode;
	Private?: boolean;
}
export const Layout = (
	{ title, children, pageDescription, pageKeywords, Private }: Props,
) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageDescription}></meta>
				<meta name="og:title" content={title}></meta>
				<meta name="og:descriptiom" content={pageDescription}></meta>
				<meta name="keywords" content={pageKeywords}></meta>
			</Head>

			<main className={styles['layout']}>{children}</main>
		</>
	);
};
