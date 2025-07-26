import * as React from "react"

const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
} as const

export function useResponsive() {
  const [viewport, setViewport] = React.useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  })

  React.useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      setViewport({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.laptop,
        isLaptop: width >= BREAKPOINTS.laptop && width < BREAKPOINTS.desktop,
        isDesktop: width >= BREAKPOINTS.desktop,
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return viewport
}

export function useIsMobile() {
  const { isMobile } = useResponsive()
  return isMobile
}
