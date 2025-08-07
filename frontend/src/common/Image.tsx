import { MouseEventHandler, useState } from "react";
import { Image, ImageProps } from '@chakra-ui/react';
import { FALLBACK_IMAGE_URL } from "./constants/user";

type MWCommonImageProps = {
    src: string;
    alt: string;
    classNames?: string;
    onClick?: MouseEventHandler<HTMLImageElement> | undefined;
} & ImageProps

export function MWOptimizedImage({
    src,
    alt,
    onClick,
}: MWCommonImageProps){
    const [imageUrl, setImageUrl] = useState<string>(src)

    return (
        <Image
            rounded="full"
            src={imageUrl}
            alt={alt}
            height="3rem"
            width="3rem"
            onClick={onClick}
            onError={() => {
                if(imageUrl != FALLBACK_IMAGE_URL)
                 setImageUrl(FALLBACK_IMAGE_URL);
            }}
            loading="lazy"
        />
    );
}