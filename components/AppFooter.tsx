import DiscordIconSvg from '../public/discord_circle_black.svg'
import GithubIconSvg from '../public/github_circle_black.svg'
import TwitterIconSvg from '../public/twitter_circle_black.svg'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ImageOptimized from './ImageOptimized'
import Link from 'next/link'
import _debounce from 'lodash/debounce'

const styles = {
	footer: {
		backgroundColor: '#fff',
		color: '#111',
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		px: 2,
		pb: 2,
		'&.stuck': {
			position: 'fixed',
			bottom: 0,
			width: '100%',
		},
	},
	social: {
		my: 4,
	},
	socialIcon: {
		display: 'inline-block',
		mx: 1,
		cursor: 'pointer',
		'&:hover': {
			opacity: 0.5,
		},
	},
	copy: {
		textAlign: 'center',
	},
}

/* eslint-disable react-hooks/exhaustive-deps */

const AppFooter = (): JSX.Element => {
	const [stuck, setStuck] = useState(false)
	const [windowHeight, setWindowHeight] = useState(0)
	const router = useRouter()

	// If window height is greater than combined header, main, and footer total height, then apply sticky, otherwise remove
	const handleCheckSticky = () => {
		const header: HTMLElement | null = document.getElementById('app-header')
		const main: HTMLElement | null = document.getElementById('app-main')
		const footer: HTMLElement | null = document.getElementById('app-footer')
		if (header && main && footer) {
			const shouldStick: boolean = windowHeight > header.offsetHeight + main.offsetHeight + footer.offsetHeight
			setStuck(shouldStick)
		}
	}

	// Debounce setting state based off window height for better performance
	const updateWindowHeight = _debounce(() => setWindowHeight(window.innerHeight), 500)

	// When local state changes, determine if footer should stick
	useEffect(() => {
		handleCheckSticky()
	}, [windowHeight])

	// Listen to window resizing
	useEffect(() => {
		updateWindowHeight()
		window.addEventListener('resize', updateWindowHeight)
		return () => {
			window.removeEventListener('resize', updateWindowHeight)
		}
	}, [])

	// Listen to route changes, as main content height will be different
	useEffect(() => {
		updateWindowHeight()
	}, [router.asPath])

	return (
		<>
			<Box id="app-footer" sx={styles.footer} component="footer" className={stuck ? 'stuck' : ''}>
				<Box sx={styles.social}>
					<Link href="https://discord.gg/Hp99UC5cGX" passHref>
						<Box sx={styles.socialIcon}>
							<ImageOptimized src={DiscordIconSvg} width={40} height={40} />
						</Box>
					</Link>
					<Link href="https://twitter.com/polyecho_" passHref>
						<Box sx={styles.socialIcon}>
							<ImageOptimized src={TwitterIconSvg} width={40} height={40} />
						</Box>
					</Link>
					<Link href="https://github.com/polyecho" passHref>
						<Box sx={styles.socialIcon}>
							<ImageOptimized src={GithubIconSvg} width={40} height={40} />
						</Box>
					</Link>
				</Box>
				<Typography sx={styles.copy} variant="body2">
					&copy; 2022 POLYECHO | All Rights Reserved
				</Typography>
			</Box>
		</>
	)
}

export default AppFooter
