import {
  Input,
  InputGroup,
  FileUpload,
  FileUploadFileAcceptDetails,
  Float,
  useFileUploadContext,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

import { useField, FieldHookConfig } from "formik";
import { LuFileUp, LuX } from "react-icons/lu";

type MWFileUploadProps = {
  name: string;
  label?: string;
  accept?: string;
  disabled?: boolean;
  maxFiles?: number;
  previewImage?: boolean;
} & FieldHookConfig<File | File[] | null>;


const FileUploadList = () => {
  const fileUpload = useFileUploadContext()
  const files = fileUpload.acceptedFiles
  if (files.length === 0) return null
  return (
    <FileUpload.ItemGroup p={0}>
      <HStack p={0}>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="5rem"
            p="1"
            mr={2}
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger p={0} h="2rem" width="2rem" color="white" bg='gray.900' rounded="full">
                <LuX style={{ height: '1rem', width: '1rem' }} />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </HStack>
    </FileUpload.ItemGroup>
  )
}

export function MWFileUpload({
  label,
  name,
  accept,
  // disabled,
  previewImage,
  maxFiles,
}: MWFileUploadProps) {
  const [field, meta, helpers] = useField(name);
  console.log('field:', field.name);
  // const fileUpload = useFileUpload({
  //   maxFiles: 1,
  //   maxFileSize: 3000,
  // })


  return (
    <>
      <FileUpload.Root
        maxW="xl"
        id={label}
        alignItems="stretch"
        maxFiles={maxFiles ? maxFiles : 1}
        onFileAccept={(details: FileUploadFileAcceptDetails) => {
          const file = details.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              helpers.setValue(reader.result as any);
            };
            reader.readAsDataURL(file);
          }
        }}
        accept={accept ?? ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]}
      >
        <FileUpload.HiddenInput />

        {previewImage && <FileUploadList />}

        <FileUpload.Label className='mw-text'>{label}</FileUpload.Label>
        <InputGroup
          startElement={<LuFileUp />}
          endElement={
            <FileUpload.ClearTrigger asChild>
              <CloseButton
                me="-1"
                size="xs"
                variant="plain"
                focusVisibleRing="inside"
                focusRingWidth="2px"
                pointerEvents="auto"
              />
            </FileUpload.ClearTrigger>
          }
        >
          <Input asChild>
            <FileUpload.Trigger borderColor={meta.error ? 'red.400' : ''}>
              <FileUpload.FileText className='mw-text' lineClamp={1} fontSize="0.75rem" />
            </FileUpload.Trigger>
          </Input>
        </InputGroup>
      </FileUpload.Root>
    </>
  );
  // return (
  //   <FileUpload.Root accept={["image/png"]}>
  //     <FileUpload.HiddenInput />
  //     <FileUpload.Trigger asChild>
  //       <Button variant="outline" size="sm">
  //          Upload file
  //       </Button>
  //     </FileUpload.Trigger>
  //     <FileUpload.List />
  //   </FileUpload.Root>
  // );
}
// return (
//   <FileUploadRootProvider value={fileUpload}>
//     <FileUpload.Root
//       maxW="xl"
//       alignItems="stretch"
//       maxFiles={maxFiles ? maxFiles : 1}
//       onFileAccept={(details: FileUploadFileAcceptDetails) => {
//         const file = details.files?.[0];
//         if (file) {
//           const reader = new FileReader();
//           reader.onloadend = () => {
//             helpers.setValue(reader.result as any);
//           };
//           reader.readAsDataURL(file);
//         }
//       }}
//       accept={accept ?? ["image/jpeg", "image/png", "image/webp", "image/svg+xml"]}
//     >
//       {previewImage && <FileUpload.ItemPreviewImage />}
//       <FileUpload.HiddenInput />
//       <FileUpload.Dropzone value={field.value}>
//         <Icon size="md" color="fg.muted">
//           <LuUpload />
//         </Icon>
//         <FileUpload.DropzoneContent>
//           <Box>Drag and drop files here</Box>
//           <Box color="fg.muted">.png, .jpg up to 5MB</Box>
//         </FileUpload.DropzoneContent>
//       </FileUpload.Dropzone>
//       <FileUpload.List />
//     </FileUpload.Root>
//   </FileUploadRootProvider>
// );