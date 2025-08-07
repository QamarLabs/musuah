import { Loader, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MuslimWikiSession } from "../typings";
import { MWCommonButton } from "../common/Buttons";
import { router } from "../router";

function VerifyAccount() {
    const { authStore } = useStore();
    const { userId } = useParams();

    const { verifyEmail, userSession, userSessionToken } = authStore;
    const [accountVerified, setAccountVerified] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [session, setSession] = useState<MuslimWikiSession | undefined>(undefined);

    async function verifyEmailAsync() {
        // console.log("verifyEmailAsync:", userSession?._id, userId)
        // console.log("userSessionToken:", userSessionToken);
        // console.log("userSession:", userSession);
        try {
            console.log('userSession?.userInfo?.emailVerified', userSession?.emailVerified)
            if(!userSession?.emailVerified)
                await verifyEmail(userSession?._id!, userSessionToken ?? '');

            setAccountVerified(true);
        } catch(err) {
            console.log("VERIFY EMAIL ERROR:", err);
        } finally {
            setSession({
                userInfo: userSession!,
                jwt: userSessionToken!
            })
            setMounted(true);
        }
    }

    useEffect(
        () => {
            if(userId) {
                verifyEmailAsync();
            }


            return () => {
                setMounted(false);
            }
        },
        [userId]
    );

    if(!mounted)
        return (
            <VStack>
                <Loader />
            </VStack>
        );

    return (
        <VStack>
            <Text className='mw-text' fontWeight='bold' fontSize="2rem">{accountVerified ? 'Account Verified!' : 'Verify Account'}</Text>
            {
                accountVerified && mounted ? 
                (
                    <VStack>                
                        <Text className='mw-text mw-normal'>Welcome {session?.userInfo?.firstName}</Text>
                        <Text className='mw-text mw-normal'>Your Account has been verified.</Text>
                        <MWCommonButton
                            type='button'
                            onClick={() => router.navigate('/dashboard', { replace: true })}
                            _hover={{
                                transform: 'scale(1.05)'
                            }}
                        >
                            View Dashboard
                        </MWCommonButton>
                    </VStack>        
                )
                : <Text className='mw-text mw-normal'>Can't Verify your account, please contact support</Text>
            }
        </VStack>
    );
};

export default observer(VerifyAccount);