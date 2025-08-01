import { HoverCard, Link, Portal } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
    label: string;
    onClick: () => void;
}

export default function HoverPopover({ onClick, label, children }: React.PropsWithChildren<Props>) {
    const [open, setOpen] = useState(false)

    return (
    <HoverCard.Root size="sm" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <HoverCard.Trigger asChild>
        <Link onClick={e => {
            e.preventDefault();
            onClick();
        }}>{label}</Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content maxWidth="400px">
            <HoverCard.Arrow />
            {children}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
    );
}