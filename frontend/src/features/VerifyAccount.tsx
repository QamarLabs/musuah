import { Loader, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const VerifyAccount =  observer(() => {
    const { authStore } = useStore();
    const { userId } = useParams();

    const { userSession, verifyEmail } = authStore;
    const [accountVerified, setAccountVerified] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(
        () => {
            if(userId && userSession?.userInfo._id === userId) {
                verifyEmail(userSession?.userInfo._id, userSession?.jwt)
                .then(() => {
                    setAccountVerified(true);
                })
            }
            setMounted(true);


            return () => {
                setMounted(false);
            }
        },
        [userSession]
    );

    if(!mounted)
        return (
            <VStack>
                <Loader />
            </VStack>
        );

    return (
        <VStack>
            <Text fontSize="2rem">Verify Account</Text>
            {
                accountVerified && mounted ? 
                (
                    <VStack>                
                        <Text className='mw-text mw-normal'>Welcome {userSession?.userInfo?.firstName}.</Text>
                        <Text className='mw-text mw-normal'>Your Account has been verified.</Text>
                    </VStack>        
                )
                : <Text className='mw-text mw-normal'>Can't Verify your account, please contact support</Text>
            }
        </VStack>
    );
});

export default VerifyAccount;