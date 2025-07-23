import { ExternalLink, Flex, FlexItem } from "@wordpress/components";
import { NavItem } from "../models/common";
import { IconButton, Popover, Portal } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";



type TogglerProps = {
  leftNavOpen: boolean;
  rightNavOpen: boolean;
  isMobile: boolean;
  toggleLeftNav: () => void;
  toggleRightNav: () => void;
}

type Props = {
  isMobile: boolean;
  leftNavOpen: boolean;
  toggleLeftNav: () => void;
  rightNavOpen: boolean;
  otherClassNames?: string;
}

export function LeftSideNavigationToggler({ leftNavOpen, rightNavOpen, toggleLeftNav, toggleRightNav, isMobile }: TogglerProps) {
  return (
    <>
      <Popover.Root
        open={leftNavOpen}
        onOpenChange={() => {
          if (rightNavOpen && !leftNavOpen)
            toggleRightNav();

          toggleLeftNav();
        }}
      >
        <Popover.Trigger asChild>
          <IconButton className="nav-toggle left" p={4} size="sm" variant="outline" border="solid 1px var(--global-color-border, currentColor)">
            <FaBars />
          </IconButton>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content  w="100%" height="400px">
              <Popover.Arrow />
              <Popover.Body w="17.5em">
                <LeftSideNavigation
                  leftNavOpen={leftNavOpen}
                  isMobile={isMobile}
                  toggleLeftNav={toggleLeftNav}
                  rightNavOpen={rightNavOpen}
                  otherClassNames="w-100"
                />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </>
  );
}

export default function LeftSideNavigation(
  { isMobile, leftNavOpen, otherClassNames }: Props) {
  // Mock navigation data
  const leftNavItems: NavItem[] = [
    {
      id: 'navigation',
      title: 'Navigation',
      items: ['Main page', 'Contents', 'Current events', 'Random article', 'About Wikipedia']
    },
    {
      id: 'contribute',
      title: 'Contribute',
      items: ['Help', 'Learn to edit', 'Community portal', 'Recent changes', 'Upload file']
    }
  ];

  return (
    <nav
      className={`left-nav ${leftNavOpen ? 'mobile-open' : ''} ${otherClassNames ?? ""}`}
      style={{ display: isMobile && !leftNavOpen ? 'none' : 'block' }}
    >
      {leftNavItems.map((section) => (
        <div key={section.id} className="nav-section">
          <h3>{section.title}</h3>
          <Flex as="ul" direction="column">
            {section.items.map((item: any, index: number) => (
              <FlexItem key={index}>
                <ExternalLink className="mw-body mw-link" href="/tr">{item}</ExternalLink>
              </FlexItem>
            ))}
          </Flex>
        </div>
      ))}
    </nav>
  );
}