import { Icon } from "@chakra-ui/react"

export default function () {
    return (
        <Icon h="5em" w="5em">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="url(#pattern0_144_3)"/>
            <defs>
                <pattern id="pattern0_144_3" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_144_3" transform="scale(0.01)"/>
                </pattern>
                <image 
                    id="image0_144_3" 
                    width="100" 
                    height="100" 
                    preserveAspectRatio="none" 
                    href="data:image/png;base64,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"
                />
            </defs>
            </svg>
        </Icon>
    );
}