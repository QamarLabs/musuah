import { Button, Card, HStack, Stack, Strong, Table, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import { ChangesMadeRecord, RequestType } from "../models/common";
import { getObjectDifferences } from "./util/format";

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
    <Card.Root width="10rem"  className="mw-text">
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

type ViewRequestCardProps<T> = {
    cardData: T;
    requestType: RequestType;
}

export function ViewRequestCard<T>({
    cardData,
    requestType
}: React.PropsWithChildren<ViewRequestCardProps<T>>) {
    // const title = useMemo(() => {
    //     if(requestType === RequestType.Wikibook)
    //         return cardData.displayNam;
    // }, [])
    const changesMade = useMemo(() => {
        let result: ChangesMadeRecord[] = [];
        if((cardData as any)['newTitle'] != (cardData as any)['oldTitle'])
            result.push({
                fieldName: "Title",
                oldValue: (cardData as any)['oldTitle'],
                newValue: (cardData as any)['newTitle'],
            })
        if((cardData as any)['newText'] != (cardData as any)['oldText'])
            result.push({
                fieldName: "Text",
                oldValue: (cardData as any)['oldText'],
                newValue: (cardData as any)['newText'],
            })

        if((cardData as any)['newSummary'] != (cardData as any)['oldSummary'])
            result.push({
                fieldName: "Summary",
                oldValue: (cardData as any)['oldSummary'],
                newValue: (cardData as any)['newSummary'],
            })

        if((cardData as any)['newAttributes'] != (cardData as any)['oldAttributes']) {
            const differences = getObjectDifferences((cardData as any)['oldAttributes'], (cardData as any)['newAttributes']);
            if(Object.keys(differences.changedProperties).length > 0) 
                Object.keys(differences.changedProperties).forEach(
                    cpK =>  result.push({
                            fieldName: `Changed Attribute -  ${cpK}`,
                            oldValue: (cardData as any)['oldAttributes'][cpK],
                            newValue: (cardData as any)['newAttributes'][cpK],
                        })
                )

            if(Object.keys(differences.newProperties).length > 0) 
                Object.keys(differences.newProperties).forEach(
                    cpK =>  result.push({
                            fieldName: `New Attribute -  ${cpK}`,
                            oldValue: "n/a",
                            newValue: (cardData as any)['newAttributes'][cpK],
                        })
                )
        }

        return result;
    }, [cardData]);

    return (
    <Card.Root width="10rem"  className="mw-text">
      <Card.Body>
        <HStack mb="6" gap="3">
          {/* <Avatar.Root>
            <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
            <Avatar.Fallback name="Nate Foss" />
          </Avatar.Root> */}
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {cardData as any["title"]}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
            <Table.Root className="mw-text mw-sm" px={0}>
                <Table.Header>
                    <Table.Row fontSize="75%">
                        <Table.ColumnHeader>Field Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Old Value</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="end">New Value</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {changesMade && changesMade.length 
                    ? changesMade.map((cM: ChangesMadeRecord, cMIdx: number) => (
                        <Table.Row key={cMIdx} fontSize="75%">
                            <Table.Cell>
                                {cM.fieldName}
                            </Table.Cell>
                            <Table.Cell>
                                {cM.oldValue}
                            </Table.Cell>
                            <Table.Cell>
                                {cM.newValue}
                            </Table.Cell>
                        </Table.Row>
                    ))
                    : (
                        <Text fontSize="75%">
                            No visible changes were made to the article
                        </Text>
                    )}
                </Table.Body>
            </Table.Root>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Text>
            <Strong>Request Date: </Strong>
            {new Date(cardData as any["timestamp"]).toLocaleDateString()}
        </Text>
      </Card.Footer>
    </Card.Root>
    );
}