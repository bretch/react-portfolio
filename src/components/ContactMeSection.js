import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const { errors, touched, getFieldProps, handleSubmit, resetForm } = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: 'hireMe',
      comment: ''
    },
    onSubmit: (values) => submit('', values),
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email('Invalid email address').required("Required"),
      comment: Yup.string().min(25, 'Must be at least 25 characters long').required("Required"),
    }),
  });

  // Show an alert when the form is submitted successfully
  useEffect(() => {
    if (response) {
      const { type, message } = response
      onOpen(type, message)

      if (type === 'success') {
        resetForm()
      }
    }
  }, [response])

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w={{md: '1024px'}} p={{ base: 0, md: 32}} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={{base: 0, md: 6}} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={touched.firstName && errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  {...getFieldProps('firstName')}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.email && errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  {...getFieldProps('email')}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...getFieldProps('type')}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={touched.comment && errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...getFieldProps('comment')}
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>
              <Button isLoading={isLoading} loadingText='Submitting' type="submit" colorScheme="purple" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
