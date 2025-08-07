import { Card, HStack, Stack, Strong, Table, Text, VStack } from "@chakra-ui/react";
import { DeleteWikiBookRequest } from "../../models/wikibook";
import { DeleteWikiPageRequestRecord, WikiPageRequestRecord } from "../../models/wikipage";
import { ErrorAlert, SuccessAlert } from "../../common/Alerts";
import { useMemo } from "react";
import { ChangesMadeRecord } from "../../models/common";
import { getObjectDifferences } from "../../common/util/format";

type ViewRequestCardProps = {
  cardData: WikiPageRequestRecord;
  approved?: boolean;
  denied?: boolean;
}

export function WikiPageRequestCard({
  cardData,
  approved,
  denied
}: React.PropsWithChildren<ViewRequestCardProps>) {
  // const title = useMemo(() => {
  //     if(requestType === RequestType.Wikibook)
  //         return cardData.displayNam;
  // }, [])
  // debugger;


  const changesMade = useMemo(() => {
    let result: ChangesMadeRecord[] = [];

    if (cardData.newTitle != cardData.oldTitle)
      result.push({
        fieldName: "Title",
        oldValue: cardData.oldTitle,
        newValue: cardData.newTitle,
      })
    if (cardData.newText != cardData.oldText)
      result.push({
        fieldName: "Text",
        oldValue: cardData.oldText,
        newValue: cardData.newText,
      })

    if (cardData.newSummary != cardData.oldSummary)
      result.push({
        fieldName: "Summary",
        oldValue: cardData.oldSummary,
        newValue: cardData.newSummary,
      })

    if (cardData.newAttributes && cardData.newAttributes != cardData.oldAttributes) {
      const differences = getObjectDifferences(cardData.oldAttributes ?? {}, cardData.newAttributes ?? {});
      if (Object.keys(differences.changedProperties).length > 0)
        Object.keys(differences.changedProperties).forEach(
          cpK => result.push({
            fieldName: `Changed Attribute -  ${cpK}`,
            oldValue: cardData.oldAttributes[cpK],
            newValue: cardData.newAttributes[cpK],
          })
        )

      if (Object.keys(differences.newProperties).length > 0)
        Object.keys(differences.newProperties).forEach(
          cpK => result.push({
            fieldName: `New Attribute -  ${cpK}`,
            oldValue: "n/a",
            newValue: cardData.newAttributes[cpK],
          })
        )
    }
      return result;
  }, [cardData]);

  return (
    <Card.Root width="30rem" className="mw-text">
      <Card.Body>
        {approved && (
          <SuccessAlert
            title="Approved"
            description={`Approved on ${new Date(cardData as any['timestamp'])}`}
          />
        )}
        {denied && (
          <ErrorAlert
            hideIcon={true}
            title="Denied"
            description={`Denied on ${new Date(cardData as any['timestamp'])}`}
          />
        )}
        <HStack mb="6" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {cardData.oldTitle}
            </Text>
          </Stack>
        </HStack>
        <Card.Description w={'full'}>
          <Table.Root className="mw-text mw-sm" px={0}>
            <Table.Header>
              <Table.Row fontSize="75%">
                <Table.ColumnHeader width="30%">Field Name</Table.ColumnHeader>
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
                        {cM.oldValue?.length ?? 0 > 75 ? cM.oldValue.substring(0, 75) + "..." : cM.oldValue}      
                    </Table.Cell>
                    <Table.Cell>
                        {cM.newValue?.length ?? 0 > 75 ? cM.newValue.substring(0, 75) + "..." : cM.newValue}      
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
          {cardData.timestamp ? new Date(cardData.timestamp).toLocaleDateString() : ''}
        </Text>
      </Card.Footer>
    </Card.Root>
  );
}

type ViewDeleteWikibookRequestCardProps = {
  cardData: DeleteWikiBookRequest;
  approved?: boolean;
  denied?: boolean;
}


export function DeleteWikiBookRequestCard({
  cardData,
  approved,
  denied
}: React.PropsWithChildren<ViewDeleteWikibookRequestCardProps>) {

  return (
    <Card.Root width="30rem" className="mw-text">
      <Card.Body>
        {approved && (
          <SuccessAlert
            title="Approved"
            description={`Approved on ${new Date(cardData as any['timestamp'])}`}
          />
        )}
        {denied && (
          <ErrorAlert
            hideIcon={true}
            title="Denied"
            description={`Denied on ${new Date(cardData as any['timestamp'])}`}
          />
        )}
        <HStack mb="6" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
                {cardData.title}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
            <VStack align="start">
                <p className="mw-text fw-bold">Reason to Delete:</p>
                <pre className='mw-text'>
                {cardData.reasonToDelete}
                </pre>
            </VStack>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Text>
          <Strong>Request Date: </Strong>
            {cardData.timestamp ? new Date(cardData.timestamp).toLocaleDateString() : ''}
        </Text>
      </Card.Footer>
    </Card.Root>
  );
}


type DeleteWikiPageRequestCardProps = {
  cardData: DeleteWikiPageRequestRecord;
  approved?: boolean;
  denied?: boolean;
}


export function DeleteWikiPageRequestCard({
  cardData,
  approved,
  denied
}: React.PropsWithChildren<DeleteWikiPageRequestCardProps>) {

  return (
    <Card.Root width="30rem" className="mw-text">
      <Card.Body>
        {approved && (
          <SuccessAlert
            title="Approved"
            description={`Approved on ${new Date(cardData as any['timestamp'])}`}
          />
        )}
        {denied && (
          <ErrorAlert
            hideIcon={true}
            title="Denied"
            description={`Denied on ${new Date(cardData as any['timestamp'])}`}
          />
        )}
        <HStack mb="6" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
                {cardData.title}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>
            <VStack align="start">
                <p className="mw-text fw-bold">Reason to Delete:</p>
                <pre className='mw-text'>
                {cardData.reasonToDelete}
                </pre>
            </VStack>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        <Text>
          <Strong>Request Date: </Strong>
          {cardData.timestamp ? new Date(cardData.timestamp).toLocaleDateString() : ''}
        </Text>
      </Card.Footer>
    </Card.Root>
  );
}