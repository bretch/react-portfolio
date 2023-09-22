import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const headerRef = useRef(null)

  useEffect(() => {
    let prevPos = window.scrollY

    // handle scroll position change
    const handleScroll = e => {
      const isScrollingDown = window.scrollY > prevPos
      headerRef.current.style.transform = `translateY(${isScrollingDown ? '-200px' : '0'})`
      prevPos = window.scrollY
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Remove scroll event listener
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex="10"
      ref={headerRef}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={{base: 4, md: 16}}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={{ base: '12px', md: '16px'}}>
              {
                socials.map(({ url, icon }) => <a key={url} href={url} target="_blank"> <FontAwesomeIcon icon={icon} size="2x" /></a>
                )
              }
            </HStack>
          </nav>
          <nav>
            <HStack spacing={{ base: 4, md: 8}}>
              {/* Add links to Projects and Contact me section */}
              <a href="/#projects" onClick={handleClick('projects')}>Projects</a>
              <a href="/#contact-me" onClick={handleClick('contactme')}>Contact Me</a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box >
  );
};
export default Header;
