import { Alert } from "@chakra-ui/react"


type CommonAlertProps = {
    title: string;
    description: string;
    hideIcon?: boolean;
}
export function ErrorAlert({title, description, hideIcon}: CommonAlertProps) {
    return (
        <Alert.Root status="error">
            {!hideIcon && (
                <Alert.Indicator />
            )}
            <Alert.Content className='mw-text'>
                <Alert.Title>{title}</Alert.Title>
                <Alert.Description>
                    {description}
                </Alert.Description>
            </Alert.Content>
        </Alert.Root>
    );
}

export function SuccessAlert({ title, description }: CommonAlertProps) {
    return (
      <Alert.Root status="success" variant="solid">
        <Alert.Indicator />
        <Alert.Content className='mw-text'>
            <Alert.Title>{title}</Alert.Title>
            <Alert.Description>
                {description}
            </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
}


export function WarningAlert({ title, description }: CommonAlertProps) {
    return (
      <Alert.Root status="warning" variant="subtle">
        <Alert.Indicator />
        <Alert.Content className='mw-text'>
            <Alert.Title>{title}</Alert.Title>
            <Alert.Description>
                {description}
            </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
}

export function InfoAlert({ title, description }: CommonAlertProps) {
    return (
      <Alert.Root status="info" variant="subtle">
        <Alert.Indicator />
        <Alert.Content className='mw-text'>
            <Alert.Title>{title}</Alert.Title>
            <Alert.Description>
                {description}
            </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
}
