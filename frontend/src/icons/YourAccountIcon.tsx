import { Icon } from "@chakra-ui/react";

export default function() {
    return (
        <Icon p="0.5rem" h="5em" w="5em">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="url(#pattern0_145_4)"/>
                <defs>
                <pattern id="pattern0_145_4" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_145_4" transform="scale(0.01)"/>
                </pattern>
                <image 
                    id="image0_145_4" 
                    width="96" 
                    height="96" 
                    preserveAspectRatio="none" 
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGHklEQVR4nO2dXWhcRRTHxzZnNv2gxbZR2+6es0lj/Uq1Kn48WYQmzZ5zY6sQUdGqiD6IIPhJwdoXQREpiMavtgoFn/VZ1Aervgm2og9+IVqriIpYSaltXDl3k5o22TWb3bsz99458Idld+/uOfPb2bkzc2bGmLlYtHoVSHEABK8MwnmoOKBlaFoxqBQ3WMaXgOmwFaoGUcsCoR/iMq0UN8ydxGjPUsv4umWacB2Azaq0bBn3aVk3ZNG9dV3JCh1y7rDkRoe0zBvVjIMeOFnNk0DoczPcv2wGj/hvygMHbT61d5YGPLQZ1pWYJoBp4/Ta8bJzp3IvHJvicVa4tSXnAsbvazii1atcOxNEscxQcUWt/WjmQqYPCpXSYEGwb0pdXL7GMr02+zV4zAo9rN8z9X5b6V0PQrfor6ITgQLjzyCl7XZL+YLpfieqSmnQMh1oyk/t0XcN07VNXPTbrLdoUzcHQu/NBIhP1Ht/F5ev68ivr4KRcWGb+5Zbod/n6qeyaA4I04FG3w+CT515TUFwc90LRi+2VuifpIGYVseRWjAr9GFyQLSGbO5bnroaEpVGTCZryGQtKUTlodPakNpn7Jn9GjxmGR+Fkd5LT2tDKnRbPNjWqTaE6a6OtiFReaiZ2jF/IEHVpBSAiF8KQMQvBSDilwIQ8UsBiPgIRIc9PHAmiKrKwizegqvDXAi5F9PEYqbz4g6lZXwyQCGnMKzgztN6+UrHff4S5lKnakawYMGCpdVGzUIjeHYQdl5a9tMNGO+xTEed321ITsV0VBnUaGxbs9IyHnfuVN7FeDxOcuiS3qudOxNUVSmLMJYl/igMLopfCkDELwUg4pcCEPFLAYj4pQBE/FIAIn4pABG/lHYgfwHjWyC4W5c7xEseBHeD4Nv6mgf+5QQI46dW6Eazibrrj1wXF1mmm9K2qjhdQJjG4xHRXWbBnKcUdpkFIHjf5KIh9zFkBQgIHemKilfNd6pHB+1A8CfXcWQDCNN4KzCmDIbpct/bllQAAaZbW4VxCgrj7a7jSTcQbryEbj7W7CKaAESmORiVN7UbSIHpetdxpRIIMP2omxq0G0jtzouOuI4vdUCs4CsmIau/pj4AaaDSg4kBiegh9/GlDAhw6eakgOguEq7jSx0Qq8MjCVk8rOI+vnQB6WK6PykgBcEHXMeXOiAg9GxSQIDxOdfxpQ6IZfosMSCCXziPL3VARHfx6V3fbhg2ogudx5VaIEL72w5E8E0P4kopEKYJXfLVLhhxHrPHayn9ByLauON3Swb7zmmZxrY1K0HoG9fxpB6IremjOFW/BRiW8WMP4sgMkCowfQUjpUuaZaF7PYLQ1679zxwQGwv/BqEX57KMWN+jJxHoNe79ziwQmtIJEHy/lv5TukGneFX62DI+MvnaCQ/8zA2QahYVgIhfCkDELwUg4pcCEPFL6QbCNB73vJk+AaZ3VfHj2nPjzv3LOhBgOqx9EGC8wzJd1DDHd9Qs1E4kSPlOPRtFN1J27X9GgOAxzT7RLcmbSrKeBZDuQW8F3/B51wp/gXBcaK8ukuJa02brjvoQhJ73MSPeSyAg9I4WmknYrKw937e0Ur+AMP4Jgvcmkq1Yz3aZBTrU4ktt8QaIpnZChFcYR1YrA/zFdTl4AUQPVuzEX9T/WWG4tA4Yv8w1EJ2nMMP9PcYT6966rqRJ3vkEwvSrHrBiPDOQ4oAV/CNfQJhOxn0LT81WMOrE2VjeANHMQeO52bpHOGUMCDB9awbPXWJ8t+H+ZZ06Z9E1kLYt4kzaIKK7sw9EypeZlBgwbcw8ECu0w6TErNCO7ANhOgmCT9sKVXQEtnbeH442Ekhpu26R0UhW8DEr+HgD7QShZxpJj9DWQc1J7Vdfsw8kqBqASIqANH18d1A1KcXHd8eJyB44E0TV+KQEnX/o1CHBQVRX2gn97/YuTkp275TNsYDphVNA4nakw7d4QXRGV0Dbj+mdIMZ9zh2T3GrPzG7paM/StG0aaTMgnTHVgcy6M2YBCnVOjAe1zBsP4GhNEdob2hRKEERctnu0rJudyhzr9JyAzbBqZYljMxrwpm2ouEI/xPURpZBaFQfmuor4X0bVpuVaHcZyAAAAAElFTkSuQmCC"/>
                </defs>
            </svg>
        </Icon>
    );
}