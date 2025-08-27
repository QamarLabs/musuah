import { Button, Card, HStack, Span, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LuCheck, LuX } from "react-icons/lu";
import ConfirmationDialog from "../common/ConfirmationReasonDialog";

type ApproveOrDenyCardProps = {
  id: string;
  title: string;
  // description: string;
  pageid?: number | string;
  bookId?: number | string;
  onDeny: (entityId: number | string, id: string, reason: string) => Promise<void>;
  onApprove: (entityId: number | string, id: string, reason: string) => Promise<void>;
  onNavigate: (entityId: any) => (e: any) => void;
  dateSubmitted?: Date;
  submittedBy?: string;
  isSubmitting: boolean;
}

export const ApproveDenyCard = ({
  id, title, pageid, bookId, children, onDeny, onApprove, onNavigate, dateSubmitted, submittedBy, isSubmitting
}: React.PropsWithChildren<ApproveOrDenyCardProps>) => {
  async function handleDeny(values: { reasonToConfirm: string }) {
    const entityId = bookId ? bookId : pageid;
    if(entityId)
      await onDeny(entityId, id, values.reasonToConfirm);
  }
  async function handleApprove(values: { reasonToConfirm: string }){
    const entityId = bookId ? bookId : pageid;
    if(entityId)
      await onApprove(entityId, id, values.reasonToConfirm);
  }

  return (
    <Card.Root width="20rem" className="mw-text">
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
          <Text textStyle="2xs">
            <Span fontWeight="bold">Submitted By:</Span>{submittedBy}
          </Text>
          <Text textStyle="2xs">
            <Span fontWeight="bold">Date Submitted:</Span>{dateSubmitted ? new Date(dateSubmitted).toLocaleDateString() : ''}
          </Text>
          <Button type="button" onClick={onNavigate(bookId ? bookId : pageid)} variant="solid" bg="blue.400" color="gray.100" _hover={{ textDecor: 'underline' }} flex="1">
            {bookId ? 'View Book' : 'View Page'}
          </Button>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <ConfirmationDialog
          triggerChildren={
            <Button type="button" variant="subtle" colorPalette="red" flex="1">
              <LuX />
              Decline
            </Button>
          }
          confirmationTitle={`Decline this title: ${title}`}
          onConfirm={handleDeny}
          onConfirmLoading={isSubmitting}
          confirmButtonOverrideColor="red"
          confirmButtonOverrideText="Yes I Decline"
        />

        <ConfirmationDialog
          triggerChildren={
            <Button type="button" variant="subtle" colorPalette="green" flex="1">
              <LuCheck />
              Approve
            </Button>
          }
          confirmationTitle={`Approve this title: ${title}`}
          onConfirm={handleApprove}
          onConfirmLoading={isSubmitting}
          confirmButtonOverrideColor="green"
          confirmButtonOverrideText="Yes I Approve"
        />
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
