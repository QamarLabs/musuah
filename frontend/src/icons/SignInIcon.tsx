import { Icon } from "@chakra-ui/react"

export default function () {
    return (
        <Icon h="5em" w="5em">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="url(#pattern0_142_2)"/>
                <defs>
                <pattern id="pattern0_142_2" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0_142_2" transform="scale(0.0104167)"/>
                </pattern>
                <image 
                    id="image0_142_2" 
                    width="100" 
                    height="100" 
                    preserveAspectRatio="none" 
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAIrElEQVR4nO2cWUxc1x3G/2Y1oEitVFWtklbKQ5u6S5ZGql2pqh0eYmPMEjdVY/BKvDte4gWiLupDnyr1MZK7JrEd4mJs11mMHduNXYONgTszd2YYwNgYY2Aax1AWGwYwd77qnDsDM9w7C8wdCHPPJ30SgjN3Rt/vnP//nAOCSEhISEhISEhISEhISEhISEhISEhISEhIiKnU/hQdkiupVB6kUhkLDtl8tmLBQWYLFhyQuJMONCBpf73PdUh6k/kGkvbVIpn7OpL3Ml9D8t4aJO9hrkbKbuarSNn9H6S8wXxF9a7LSNn1GVJ3Mv9b9Y5LSN1xUfX2C0hj3vYp0radV731nM9VSN9yVvXmT3z+GOmvf8S98PUPsbCE+QwWbvqXz6excCPzKWRsPImMDcyVyFjPfAIZ6yuQsa4Cmev+qXrtcWSu/QCZxczlyCgqH8xcc+zUE2vKv2Nc+GX2Xiq1g4cfCMAffigAb0YAsCcCgF0qgNRQALZHALAlAoCS0AAyGIANgQBOaAHw8IMBZBa/j6yi95FZdLQ345fvPRk7gDJHJZWx8KcCsGoA8PA1AG7oALimA+CqDoDLOgAu6QD4VAdAlQ4AFv5UAGeCAUzM/hAA1kUAUKQCyCo6hsw1RysMAGAfDAJwKAKA/REA7I0A4I1QAAJnvx+Ab/YHAggoP5MAPtEB8KEOgNM6ACo1AILLjx9AuQ6AI/1GrAAEAkgpk7G08j62WUdR0uDB4nI3kku1AFIP1mNZhds3bhhLjnUidb8WQNq+Giw73olt1hGU1A/jp0fuIm3PFAA7IwDYpg8g3Q9gcwQAmyIAWB8BwET5KfeFrwLIWnMUxgAonQTw88r72NesYKdzHFvkMWyQRvDckXua+r+0wq0Z9/y77ZoGvPR4p2bcC/9om5cNeBIAC99wAGr9L2kYwXb7Y5RYR7Gu3oNf1Q4h51K/BkCocVMbcEmDRzvuYt8cNuBTMTdggwEEN+Di2mFslEZQVDeMV68NoeDqQ7xU1atpwMW1QzrjejT1v/i6zrizD2bWgLd+eRpwfAAckvHjY914rXYYq2seYdWVQeR8NoBn/nZX04BfPHJPM+57f2nTAHjx3XbNuEV/bp33DZiFHwcANiSXyfjBO/eQfb4X2ed6efjJBy1TANQh5UA9fvj3dmSf60F2VQ8PP5XvggIBVCN1bw1+9Ne2iXGLDt9CGtuKJkADNgaAL3ztCdhi3hPw2ugasKEAEu8EfCbuDThOAOboBLwjuAGnzYMGbCwAw0/A1Ton4MDyM/8bsCEACt2AMGZsAcAtAJjaJABAADCzSQCAAGBmkwAAAcDMJgEAAoCZTQIABAAzmwQACABmNgkAEADMbBIAIAAkhLu9yO8YQ167B3ltQ8i7/Qirbj3kZl/z77V7+JiCLkUAKDTIBfceI+/OMFa1DmJlUy9yHPexQv4vllu6sFzqVG3pwgqbm/9spauHj2WvYa8VANwzDL5znM/q3JZ+HuwvJAc+kLaixfIMBmxZeCwnwWsn7nHbAjy0ZqDN8jROS8VYK93ACvvnyG3pEwAKZ+D8jlHk3hzgwa+31MBhfRaKfQHgIMAexrJqr41wV/o2fiO9IwAUTsfdXl46cpv/h1zLHVRbsyeDD3QUECbsIBkyfV0AcEc2C5/V8NckCz6Xv6YNfqYQZPKgkX4mALjDhN/u4U12n3QSHnsq4KRJGwNCQSNtEADcIWp+Sx82SxcxYk8JDt9oCC5aLAC4J8327GzbmGPtQI/9q0CjTvhGgrDT8LR6wlwHVDgLdZ/tdqqsq9Xw/Y4vBJsA4Fb3+my7+aokY8yRFAxgGiDYWaBayuYlbLWlEW83/A5D1vTwIByUa3oAee0ePvtrrMv0w48SwmHp1/w57NDGT8yuHqy2usJDsNNtcwPo9vI7nBzLXYw6kwEXqZ4miC7bN/nVBHsWvwNid0Z3RzgEthLCliUnfcu0AApY+Wnpwx+lP02GPwMIVywvY2XjA76TCoTLVgK7vgjbG5z0tmkB5HeM8uB4+ZkKYBoQ6i1LkOP8gs/6CbhdCi9HW6QL4Zu0g1pMCyDPV/875Kf0AUQJgh3aXrE082bOIDCwvLSx3iItC79TctAj8wK4M8xr94AjC2iimCCwW1DWdNlKYKuKPfew9BbfHUXYrirmBdA2xO/wh5zpKgC/ZwjCI6eiwbIYly3L0W35RtTnBgHAOQVAjKthuoc3MnsJ6nM8oQUwWyBMXYLa1SbcZn86NID4Qxggs29DL1lXAs2kerZB2Ek2+UGsH29JRycBzDaERvqDaQEUsjJ0+xFWWLvxsHFh9BCMAuEgL2z0FXMDaPfwvXuV5RV4AwHMzmqQIoafyADyO8bUv3ywdsJ1YxEH4PesQGik500LID8w/Lrvw9tCqkNBMBqEnc5GFX4iAsgPFb4OhLisBgc9wAlKix5ANwZME34LxXc1OGgU9VH8DiBQBd04lWjhN7Hwb5LqKCHEvBqc5IGdlkwrfL4CuvDdAjd6Emrm3ySt47kanHQfNpr5P/LOvYcnC7pRMR/LUX7gzK9fpB9+vFaDi7xwUjlASWRmAZSkyCR7WwkTjhLEmEQuNNHxpImGp7EaxtBI52Oa9Qkdfmt0EMat5AycvXDSy2iiE4qLbiou6mdQFBd54KJBNNIduOhjuGit6Wd8UPi2EOFHgDBupSYRpBHh3yJMOEoQIvwYxcIbt5E9KPwwEJRmfjF2FvV0EHX0WxF+rOHLZPfe1glfB4TSTAoa6CexvKeQXvh+R4CgSHTS/3oho8OPAgTqaVMs7yvkkyLTRW9biPDDQEAd7fY/QygGKa2kcAB+RwGCNWrRcA1SUPhhIChNNASJfg+JXhLhGygecAQISgs9xnVxPRAXjbvoC10AASAUmRrm+nMmrCDTC+M3aSwcBEWi9+b6cya0UEvPKi004r2jE75DXC/M3kpwTZYjtjtSZLrwZQ3//67zHXm3hnAXAAAAAElFTkSuQmCC"
                />
                </defs>
            </svg>
        </Icon>
    );
}
