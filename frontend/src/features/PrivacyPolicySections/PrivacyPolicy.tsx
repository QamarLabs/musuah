import React from "react";
import { Loader, Text } from "@chakra-ui/react";
import { PrivacyPolicyBox } from "./PrivacyPolicyBox";
import { PrivacyPolicyIntroduction } from "./PrivacyPolicyIntroduction";
import { lazyLoad } from "../../common/util/format";

export const PrivacyPolicyDefinitions = lazyLoad(
    () => import('./PrivacyPolicyDefinitions'),
    'PrivacyPolicyDefinitions'
);
export const PrivacyPolicyCollectionPart1 = lazyLoad(
    () => import('./PrivacyPolicyCollectionPart1'),
    'PrivacyPolicyCollectionPart1'
);
export const PrivacyPolicyCollectionPart2 = lazyLoad(
    () => import('./PrivacyPolicyCollectionPart2'),
    'PrivacyPolicyCollectionPart2'
);
export const PrivacyPolicySharing = lazyLoad(
    () => import('./PrivacyPolicySharing'),
    'PrivacyPolicySharing'
);
export const PrivacyPolicyProtection = lazyLoad(
    () => import('./PrivacyPolicyProtection'),
    'PrivacyPolicyProtection'
);
export const PrivacyPolicyImportantInfo = lazyLoad(
    () => import('./PrivacyPolicyImportantInfo'),
    'PrivacyPolicyImportantInfo'
);


export default function PrivacyPolicy() {
    return (
        <>
            <Text className='mw-text' fontSize="1.2rem" mb={2}>Privacy Policy And Terms</Text>
            <PrivacyPolicyBox />
            <PrivacyPolicyIntroduction />
            <React.Suspense fallback={<Loader />}>
                <PrivacyPolicyDefinitions />
            </React.Suspense>
            <React.Suspense fallback={<Loader />}>
                <PrivacyPolicyCollectionPart1 />
                <PrivacyPolicyCollectionPart2 />
            </React.Suspense>
            <React.Suspense fallback={<Loader />}>
                <PrivacyPolicySharing />
            </React.Suspense>
            <React.Suspense fallback={<Loader />}>
                <PrivacyPolicyProtection />
            </React.Suspense>
            <React.Suspense fallback={<Loader />}>
                <PrivacyPolicyImportantInfo />
            </React.Suspense>
        </>
    );
}