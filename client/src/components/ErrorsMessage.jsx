import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  CloseButton,
} from "@chakra-ui/react";

const ErrorsMessages = ({ errors, clearErrors }) => {
  return (
    <div>
      {errors.length > 0 && (
        <Alert status="error" flexDirection="column" alignItems="flex-start">
          <Flex>
            <AlertIcon />
            <AlertTitle>Form Errors!</AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={clearErrors}
            />
          </Flex>
          <AlertDescription marginTop={3}>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ErrorsMessages;
