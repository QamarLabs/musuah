import { Flex, FlexItem } from "@wordpress/components";
import { NavItem } from "../models/common";
import { IconButton, Popover, Portal } from "@chakra-ui/react";
import { FaToolbox } from "react-icons/fa6";
import { NavigationBarLink } from "./NavigationBar";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";


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
  toggleRightNav: () => void;
  rightNavOpen: boolean;
  otherClassNames?: string;
}



export function RightSideNavigationToggler({ leftNavOpen, rightNavOpen, toggleLeftNav, toggleRightNav, isMobile }: TogglerProps) {
  return (
    <>
      <Popover.Root
        open={rightNavOpen}
        onOpenChange={() => {
          if (leftNavOpen && !rightNavOpen)
            toggleLeftNav();

          toggleRightNav();
        }}
      >
        <Popover.Trigger asChild>
          <IconButton className="nav-toggle right" p={4} size="sm" variant="outline" border="solid 1px var(--global-color-border, currentColor)">
                <FaToolbox />
            </IconButton>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content  w="100%" height="400px">
              <Popover.Arrow />
              <Popover.Body w="17.5em">
                <RightSideNavigation
                  leftNavOpen={leftNavOpen}
                  isMobile={isMobile}
                  toggleRightNav={toggleRightNav}
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

export default function RightSideNavigation(
  { isMobile, rightNavOpen, otherClassNames }: Props) {
    const navigate = useNavigate();
    const {
      t,
      // i18n 
    } = useTranslation("common");
    
    const rightNavItems: NavItem[] = [
        {
            id: 'tools',
            title: t("rightSideNav.tools"),
            // V2 Items
            // items: ['What links here', 'Related changes', 'Special pages', 'Printable version']
            items: [
              // {text: 'Main Page', link: '/'}
            ]
        },
        {
            id: 'languages',
            title: t("rightSideNav.languages"),
            items: [
              {text: t("links.en"), link: '/en'},
              {text: t("links.es"), link: '/es'},
              {text: t("links.fr"), link: '/fr'},
              {text: t("links.de"), link: '/de'},
              {text: t("links.ar"), link: '/ar'},
            ]
        }
    ];


    return (
        <nav
            className={`right-nav ${rightNavOpen ? 'mobile-open' : ''} ${otherClassNames ?? ""}`}
            style={{ display: isMobile && !rightNavOpen ? 'none' : 'block' }}
        >
            {rightNavItems.map((section) => (
                <div key={section.id} className="nav-section">
                    <h3>{section.title}</h3>
                    <Flex as="ul" direction="column">
                        {section.items.map((item, index) => (
                            <FlexItem key={index}>
                              <NavigationBarLink 
                                className="mw-body mw-link" 
                                onClick={() => navigate(item.link, { replace: true })}
                              >
                                {item.text}
                              </NavigationBarLink>
                            </FlexItem>
                        ))}
                    </Flex>
                </div>
            ))}
        </nav>
    );
}