import { Button, Card, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck, LuX } from "react-icons/lu";

type ApproveOrDenyCardProps = {
  title: string;
  // description: string;
  onDeny: (e: any) => Promise<void>;
  onApprove: (e: any) => Promise<void>;
}

export const ApproveDenyCard = ({
  title, children, onDeny, onApprove
}: React.PropsWithChildren<ApproveOrDenyCardProps>) => {
  return (
    <Card.Root width="10rem" className="mw-text">
      <Card.Body>
        <HStack mb="6" gap="3">
          {/* <Avatar.Root>
            <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
            <Avatar.Fallback name="Nate Foss" />
          </Avatar.Root> */}
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {title}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
          {/* <Strong color="fg">Nate Foss </Strong>
          has requested to join your team. You can approve or decline their
          request. */}
          {children}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button type="button" onClick={onDeny} variant="subtle" colorPalette="red" flex="1">
          <LuX />
          Decline
        </Button>
        <Button type="button" onClick={onApprove} variant="subtle" colorPalette="blue" flex="1">
          <LuCheck />
          Approve
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

type DefaultRequestCardProps = {
  noItemsText: string;
  noItemsTitle: string;
}

export function DefaultRequestCard({ noItemsText, noItemsTitle }: React.PropsWithChildren<DefaultRequestCardProps>) {
  return (
    <Card.Root width="30rem" className="mw-text">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {noItemsTitle}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
          {noItemsText}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
